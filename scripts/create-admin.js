const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function createAdminUser() {
  try {
    const uri = 'mongodb+srv://nerlumaevents_db_user:w3N39mvUD9SeOJgP@nerlumahub.ivmxjb5.mongodb.net/nerluma?retryWrites=true&w=majority';
    const client = await MongoClient.connect(uri);
    const db = client.db('nerluma');

    // Admin credentials
    const email = 'admin@nerluma.com';
    const password = 'admin123'; // This will be the password you use to login
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if admin exists
    const existingAdmin = await db.collection('users').findOne({ email });

    if (existingAdmin) {
      // Update password if admin exists
      await db.collection('users').updateOne(
        { email },
        { $set: { password: hashedPassword } }
      );
      console.log('Admin password updated successfully');
    } else {
      // Create new admin user
      await db.collection('users').insertOne({
        email,
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
      });
      console.log('Admin user created successfully');
    }

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdminUser();