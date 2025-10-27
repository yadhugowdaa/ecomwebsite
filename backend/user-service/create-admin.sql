-- Script to create admin user
-- Password will be hashed, so you need to login via the API first time

-- Update existing user to admin (if you already have an account)
UPDATE users SET role = 'admin' WHERE email = 'yadhumrgowda7@gmail.com';

-- OR create a new admin user (password needs to be hashed via API)
-- Use the signup API first, then run this command to make them admin
-- UPDATE users SET role = 'admin' WHERE email = 'your-admin-email@example.com';

