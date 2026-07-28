import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ngnypaupwcnghymzylcj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nbnlwYXVwd2NuZ2h5bXp5bGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNDk3NDYsImV4cCI6MjEwMDcyNTc0Nn0.NcEqJxBa8aF-O-aSW3Q22eA9XdAaUAqs07ADdwZVaZs'
);

const run = async () => {
  const { data, error } = await supabase.from('menu_items').select('*').limit(1);
  console.log('error:', error);
  console.log('data sample:', data);
};

run().catch((err) => {
  console.error('unexpected error', err);
  process.exit(1);
});
