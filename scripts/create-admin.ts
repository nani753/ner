import bcrypt from 'bcryptjs';
import { User } from '@/lib/models';
import connectDB from '@/lib/db';

async function createAdminUser() {
  try {
    await connectDB();

    // Admin credentials
    const email = 'admin@nerluma.com';
    const password = 'admin123'; // This will be the password you use to login
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if admin exists
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      // Update password if admin exists
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log('Admin password updated successfully');
    } else {
      // Create new admin user
      await User.create({
        email,
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
      });
      console.log('Admin user created successfully');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdminUser();