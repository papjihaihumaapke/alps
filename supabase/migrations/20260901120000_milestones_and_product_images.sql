-- Multiple images per product (scrolling gallery). image_url is kept as the
-- legacy single-image field; image_urls is the ordered gallery.
alter table public.products
  add column if not exists image_urls text[] not null default '{}';

-- Recognitions (milestones) shown on /my-journey, newest first.
create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  -- Display date. Ordering is by this descending so the newest update is on top.
  occurred_on date not null default current_date,
  link_url text,
  image_urls text[] not null default '{}',
  hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index milestones_occurred_on_idx on public.milestones (occurred_on desc, created_at desc);

alter table public.milestones enable row level security;

create policy "Public view visible milestones" on public.milestones
  for select to anon, authenticated
  using (hidden = false or public.has_role(auth.uid(), 'admin'));

create policy "Admins manage milestones" on public.milestones
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
