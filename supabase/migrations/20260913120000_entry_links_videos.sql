-- Recognitions / Design Path entries: several links and videos per entry.
alter table public.milestones
  -- [{ "label": "read the article", "url": "https://…" }, …]
  add column if not exists links jsonb not null default '[]'::jsonb,
  -- YouTube / Vimeo links or uploaded video file URLs, in display order.
  add column if not exists video_urls text[] not null default '{}';

-- Carry existing single links into the new list.
update public.milestones
set links = jsonb_build_array(jsonb_build_object('label', '', 'url', link_url))
where link_url is not null and links = '[]'::jsonb;
