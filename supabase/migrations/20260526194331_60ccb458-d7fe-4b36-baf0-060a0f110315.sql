
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users view own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "Admins view all roles" on public.user_roles for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage roles" on public.user_roles for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  mobile text,
  newsletter_opt_in boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create policy "Users view own profile" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update to authenticated using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "Admins view all profiles" on public.profiles for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile + grant admin to brand email on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, mobile, newsletter_opt_in)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'mobile', ''),
    coalesce((new.raw_user_meta_data->>'newsletter_opt_in')::boolean, true)
  );
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  if lower(new.email) = 'alps.annieling@yahoo.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
    on conflict do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Products
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  description text,
  price_cad numeric(10,2) not null default 0,
  price_hkd numeric(10,2) not null default 0,
  colors text[] not null default '{}',
  sizes text[] not null default '{}',
  features text[] not null default '{}',
  tags text[] not null default '{}',
  stock integer not null default 0,
  hidden boolean not null default false,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.products to anon, authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;
create policy "Public view visible products" on public.products for select to anon, authenticated using (hidden = false or public.has_role(auth.uid(), 'admin'));
create policy "Admins manage products" on public.products for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Orders
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null default ('ALPS-' || to_char(now(),'YYYYMMDD') || '-' || substr(replace(gen_random_uuid()::text,'-',''),1,6)),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  full_name text not null,
  mobile text,
  address text,
  country text,
  currency text not null check (currency in ('CAD','HKD')),
  subtotal numeric(10,2) not null default 0,
  shipping numeric(10,2) not null default 0,
  tax numeric(10,2) not null default 0,
  discount numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  promo_code text,
  status text not null default 'pending' check (status in ('pending','processing','shipped','delivered','cancelled')),
  created_at timestamptz not null default now()
);
grant select, insert, update on public.orders to authenticated;
grant insert on public.orders to anon;
grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "Users view own orders" on public.orders for select to authenticated using (auth.uid() = user_id);
create policy "Anyone create order" on public.orders for insert to anon, authenticated with check (true);
create policy "Admins view all orders" on public.orders for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update orders" on public.orders for update to authenticated using (public.has_role(auth.uid(), 'admin'));

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  product_slug text,
  name text not null,
  color text,
  size text,
  qty integer not null default 1,
  unit_price numeric(10,2) not null default 0,
  currency text not null
);
grant select, insert on public.order_items to authenticated;
grant insert on public.order_items to anon;
grant all on public.order_items to service_role;
alter table public.order_items enable row level security;
create policy "Users view own order items" on public.order_items for select to authenticated using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "Anyone insert order items" on public.order_items for insert to anon, authenticated with check (true);
create policy "Admins view all order items" on public.order_items for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Promo codes
create table public.promo_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  discount_type text not null check (discount_type in ('percent','fixed')),
  amount numeric(10,2) not null,
  currency text check (currency in ('CAD','HKD')),
  expires_at timestamptz,
  usage_limit integer,
  used_count integer not null default 0,
  active boolean not null default true,
  applicable_products text[],
  created_at timestamptz not null default now()
);
grant select on public.promo_codes to anon, authenticated;
grant all on public.promo_codes to service_role;
alter table public.promo_codes enable row level security;
create policy "Anyone can read active promos for validation" on public.promo_codes for select to anon, authenticated using (active = true);
create policy "Admins manage promos" on public.promo_codes for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Pre-order registrations
create table public.preorders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text,
  mobile text,
  notified boolean not null default false,
  created_at timestamptz not null default now()
);
grant insert on public.preorders to anon, authenticated;
grant all on public.preorders to service_role;
alter table public.preorders enable row level security;
create policy "Anyone can register preorder" on public.preorders for insert to anon, authenticated with check (true);
create policy "Admins view preorders" on public.preorders for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Newsletter
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);
grant insert on public.newsletter_subscribers to anon, authenticated;
grant all on public.newsletter_subscribers to service_role;
alter table public.newsletter_subscribers enable row level security;
create policy "Anyone can subscribe" on public.newsletter_subscribers for insert to anon, authenticated with check (true);
create policy "Admins view subscribers" on public.newsletter_subscribers for select to authenticated using (public.has_role(auth.uid(), 'admin'));
