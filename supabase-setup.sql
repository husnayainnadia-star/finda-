-- =============================================
-- FINDA – Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- =============================================

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  email text not null,
  avatar_url text,
  created_at timestamptz default now()
);

-- RLS: users can only view/edit their own profile
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. LOST REPORTS TABLE
create table if not exists public.lost_reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  item_name text not null,
  description text not null,
  category text not null default 'lainnya',
  last_seen_location text not null,
  lost_date date,
  image_url text,
  status text not null default 'active' check (status in ('active', 'found', 'closed')),
  created_at timestamptz default now()
);

create index on public.lost_reports (user_id);
create index on public.lost_reports (status);
create index on public.lost_reports (category);
create index on public.lost_reports (created_at desc);

alter table public.lost_reports enable row level security;
create policy "Active lost reports are publicly viewable." on public.lost_reports for select using (status = 'active' or auth.uid() = user_id);
create policy "Users can create lost reports." on public.lost_reports for insert with check (auth.uid() = user_id);
create policy "Users can update their own lost reports." on public.lost_reports for update using (auth.uid() = user_id);
create policy "Users can delete their own lost reports." on public.lost_reports for delete using (auth.uid() = user_id);

-- 3. FOUND REPORTS TABLE
create table if not exists public.found_reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  item_name text not null,
  description text not null,
  category text not null default 'lainnya',
  found_location text not null,
  found_date date,
  contact_information text not null,
  image_url text,
  status text not null default 'active' check (status in ('active', 'found', 'closed')),
  created_at timestamptz default now()
);

create index on public.found_reports (user_id);
create index on public.found_reports (status);
create index on public.found_reports (category);
create index on public.found_reports (created_at desc);

alter table public.found_reports enable row level security;
create policy "Active found reports are publicly viewable." on public.found_reports for select using (status = 'active' or auth.uid() = user_id);
create policy "Users can create found reports." on public.found_reports for insert with check (auth.uid() = user_id);
create policy "Users can update their own found reports." on public.found_reports for update using (auth.uid() = user_id);
create policy "Users can delete their own found reports." on public.found_reports for delete using (auth.uid() = user_id);

-- 4. NOTIFICATIONS TABLE
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  notification_type text not null check (notification_type in ('match', 'contact', 'status_change', 'system')),
  related_report_id uuid,
  is_read boolean default false,
  created_at timestamptz default now()
);

create index on public.notifications (user_id);
create index on public.notifications (is_read);

alter table public.notifications enable row level security;
create policy "Users can view own notifications." on public.notifications for select using (auth.uid() = user_id);
create policy "System can insert notifications." on public.notifications for insert with check (true);
create policy "Users can update own notifications." on public.notifications for update using (auth.uid() = user_id);

-- 5. MATCHES TABLE
create table if not exists public.matches (
  id uuid default gen_random_uuid() primary key,
  lost_report_id uuid references public.lost_reports(id) on delete cascade,
  found_report_id uuid references public.found_reports(id) on delete cascade,
  match_score integer not null default 0,
  match_status text not null default 'pending' check (match_status in ('pending', 'confirmed', 'rejected')),
  created_at timestamptz default now()
);

create index on public.matches (lost_report_id);
create index on public.matches (found_report_id);

alter table public.matches enable row level security;
create policy "Matches are publicly viewable." on public.matches for select using (true);

-- 6. STORAGE BUCKET for item images
insert into storage.buckets (id, name, public) values ('item-images', 'item-images', true)
  on conflict (id) do nothing;

create policy "Anyone can view item images." on storage.objects for select using (bucket_id = 'item-images');
create policy "Authenticated users can upload item images." on storage.objects for insert with check (bucket_id = 'item-images' and auth.role() = 'authenticated');
create policy "Users can update their own item images." on storage.objects for update using (bucket_id = 'item-images' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users can delete their own item images." on storage.objects for delete using (bucket_id = 'item-images' and auth.uid()::text = (storage.foldername(name))[1]);
