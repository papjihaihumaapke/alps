import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

export const listAdmins = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { data: roles, error } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, role, created_at")
      .eq("role", "admin");
    if (error) throw new Error(error.message);
    const ids = (roles ?? []).map((r) => r.user_id);
    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    const byId = new Map(users.users.map((u) => [u.id, u.email ?? ""]));
    return (roles ?? []).map((r) => ({
      user_id: r.user_id,
      email: byId.get(r.user_id) ?? "(unknown)",
      created_at: r.created_at,
    }));
  });

export const grantAdminByEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ email: z.string().email() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const email = data.email.toLowerCase().trim();
    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    const user = users.users.find((u) => (u.email ?? "").toLowerCase() === email);
    if (!user) throw new Error("No user found with that email. They must sign up first.");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: user.id, role: "admin" });
    if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    return { ok: true, user_id: user.id };
  });

export const revokeAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    if (data.user_id === context.userId) throw new Error("Cannot revoke your own admin role");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("user_id", data.user_id)
      .eq("role", "admin");
    if (error) throw new Error(error.message);
    return { ok: true };
  });
