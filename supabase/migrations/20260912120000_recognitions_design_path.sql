-- Recognitions (/press) and Design Path (/my-journey) share the milestones
-- table, split by `section`. Both are ordered newest first on the site.
alter table public.milestones
  add column if not exists section text not null default 'recognitions'
    check (section in ('recognitions', 'design-path')),
  -- Season + demographic categorisation: all-season, spring, summer,
  -- fall-winter, women, unisex, kids.
  add column if not exists tags text[] not null default '{}';

drop index if exists public.milestones_occurred_on_idx;
create index milestones_section_order_idx
  on public.milestones (section, occurred_on desc, created_at desc);

grant select on public.milestones to anon, authenticated;
grant insert, update, delete on public.milestones to authenticated;
grant all on public.milestones to service_role;

-- Admin-uploaded images (entries, products). Publicly readable so they render
-- on the storefront; only admins can write.
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

create policy "Public read site images" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'site-images');

create policy "Admins upload site images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins update site images" on storage.objects
  for update to authenticated
  using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins delete site images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

-- Seed recognitions with the awards previously hardcoded on /press
-- (title = awarding body, body = award).
insert into public.milestones (title, body, occurred_on, link_url, section, created_at)
values
  ('New York Product Design Awards', 'silver — fashion & lifestyle smart fashion · collection ONE and ALL', '2022-01-01', null, 'recognitions', now() - interval '0 seconds'),
  ('New York Product Design Awards', 'silver — fashion & lifestyle womenswear · collection ONE and ALL', '2022-01-01', null, 'recognitions', now() - interval '1 seconds'),
  ('Hong Kong Most Outstanding Business Awards', 'best fashion innovation award 2022', '2022-01-01', null, 'recognitions', now() - interval '2 seconds'),
  ('New York Product Design Awards', 'gold — fashion & lifestyle smart fashion · collection warrior', '2021-01-01', null, 'recognitions', now() - interval '3 seconds'),
  ('New York Product Design Awards', 'silver — fashion & lifestyle womenswear · collection warrior', '2021-01-01', null, 'recognitions', now() - interval '4 seconds'),
  ('International Design Awards', 'silver — apparel category · collection warrior', '2021-01-01', 'https://www.idesignawards.com/winners-old/zoom.php?eid=9-34162-21', 'recognitions', now() - interval '5 seconds'),
  ('International Design Awards', 'bronze — fashion design · recycle & sustainable · collection warrior', '2021-01-01', null, 'recognitions', now() - interval '6 seconds'),
  ('International Design Awards', 'honourable mention — prêt-à-porter · collection warrior', '2021-01-01', null, 'recognitions', now() - interval '7 seconds'),
  ('International Design Awards', 'honourable mention — apparel category · collection warrior', '2021-01-01', null, 'recognitions', now() - interval '8 seconds'),
  ('Hong Kong Most Outstanding Services Awards', 'best fashion design brand 2021', '2021-01-01', null, 'recognitions', now() - interval '9 seconds'),
  ('International Design Awards', 'silver — apparel · sportswear · silver ion instant warming vest', '2018-01-01', null, 'recognitions', now() - interval '10 seconds');
