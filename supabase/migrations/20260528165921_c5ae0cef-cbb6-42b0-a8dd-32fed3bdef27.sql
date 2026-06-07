CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.profiles (id, full_name, mobile, newsletter_opt_in)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'mobile', ''),
    coalesce((new.raw_user_meta_data->>'newsletter_opt_in')::boolean, true)
  );
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  if lower(new.email) = 'alps.annieling@yahoo.com' or lower(new.email) = 'mohammadhilalmalik@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
    on conflict do nothing;
  end if;
  return new;
end;
$function$;