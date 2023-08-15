begin;

-- remove the supabase_realtime publication
drop
  publication if exists supabase_realtime;

-- re-create the supabase_realtime publication with no tables
create publication supabase_realtime;

commit;

-- add a table called 'messages' to the publication
-- (update this to match your tables)
alter
  publication supabase_realtime add table messages;

-- Fix permissions
grant select on table messages to anon;

