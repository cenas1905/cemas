const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Read and parse .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local file not found at:', envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[match[1]] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const testEmail = 'test_dev_user@example.com';
const testPassword = 'Password123!';
const testName = 'Test User';

async function run() {
  console.log(`Checking if user ${testEmail} exists...`);
  
  // Find if user already exists
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) {
    console.error('Error listing users:', listError);
    process.exit(1);
  }
  
  let user = users.find(u => u.email === testEmail);
  
  if (user) {
    console.log(`User already exists (ID: ${user.id}). Updating password and confirming email...`);
    const { data: updateData, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      {
        password: testPassword,
        email_confirm: true,
        user_metadata: { full_name: testName }
      }
    );
    if (updateError) {
      console.error('Error updating user:', updateError);
      process.exit(1);
    }
    console.log('User password updated and email auto-confirmed.');
  } else {
    console.log(`Creating user ${testEmail}...`);
    const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true,
      user_metadata: { full_name: testName }
    });
    if (createError) {
      console.error('Error creating user:', createError);
      process.exit(1);
    }
    user = createData.user;
    console.log(`User successfully created (ID: ${user.id}).`);
  }
  
  // Verify or insert profile
  console.log('Checking profiles table...');
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  if (profile) {
    console.log('Profile already exists. Setting plan to free for test start...');
    const { error: updateProfileErr } = await supabaseAdmin
      .from('profiles')
      .update({ plan: 'free', full_name: testName })
      .eq('id', user.id);
    if (updateProfileErr) console.error('Error resetting profile plan:', updateProfileErr);
  } else {
    console.log('Inserting profile...');
    const { error: insertProfileErr } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: user.id,
        email: testEmail,
        full_name: testName,
        plan: 'free'
      });
    if (insertProfileErr) {
      console.error('Error inserting profile:', insertProfileErr);
      process.exit(1);
    }
    console.log('Profile successfully inserted.');
  }
  
  console.log('All set! User test_dev_user@example.com is ready to log in directly.');
}

run();
