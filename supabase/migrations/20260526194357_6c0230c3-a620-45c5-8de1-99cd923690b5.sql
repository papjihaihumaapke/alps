
-- Replace overly-permissive WITH CHECK (true) with field validation
drop policy "Anyone create order" on public.orders;
create policy "Anyone create order" on public.orders for insert to anon, authenticated
  with check (email is not null and length(email) > 3 and total >= 0 and currency in ('CAD','HKD'));

drop policy "Anyone insert order items" on public.order_items;
create policy "Anyone insert order items" on public.order_items for insert to anon, authenticated
  with check (qty > 0 and unit_price >= 0 and name is not null);

drop policy "Anyone can register preorder" on public.preorders;
create policy "Anyone can register preorder" on public.preorders for insert to anon, authenticated
  with check (email is not null and email ~* '^[^@]+@[^@]+\.[^@]+$');

drop policy "Anyone can subscribe" on public.newsletter_subscribers;
create policy "Anyone can subscribe" on public.newsletter_subscribers for insert to anon, authenticated
  with check (email is not null and email ~* '^[^@]+@[^@]+\.[^@]+$');

-- Lock down SECURITY DEFINER helpers
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
