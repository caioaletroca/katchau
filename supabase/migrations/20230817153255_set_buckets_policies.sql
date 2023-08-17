create policy "Public Access Posts Select" on storage.objects for select using ( bucket_id = 'posts' );
create policy "Public Access Posts Insert" on storage.objects for insert with check ( bucket_id = 'posts' );
create policy "Public Access Posts Delete" on storage.objects for delete using ( bucket_id = 'posts' );

create policy "Public Access Profiles Select" on storage.objects for select using ( bucket_id = 'profiles' );
create policy "Public Access Profiles Insert" on storage.objects for insert with check ( bucket_id = 'profiles' );
create policy "Public Access Profiles Delete" on storage.objects for delete using ( bucket_id = 'profiles' );

create policy "Read Access for Application" on storage.buckets for select to "anon" using ( true );
