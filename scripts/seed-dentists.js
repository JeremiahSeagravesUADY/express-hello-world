/**
 * Standalone Seed Script for 20 Dentists
 * Run this after the server is up or independently
 */

const { sequelize } = require('../config/sequelize');
const Dentist = require('../models/Dentist');
const bcrypt = require('bcrypt');

const seedDentists = async () => {
  try {
    console.log('🌱 Starting seed process...');

    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Sync models (ensure table exists)
    await sequelize.sync();
    console.log('✅ Tables synced');

    // Check if dentists already exist
    const existingCount = await Dentist.count();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing dentists.`);
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const answer = await new Promise((resolve) => {
        readline.question('Do you want to continue and add 20 more dentists? (y/n): ', resolve);
      });
      readline.close();

      if (answer.toLowerCase() !== 'y') {
        console.log('❌ Seed cancelled.');
        process.exit(0);
      }
    }

    // Create 20 dentists
    const dentists = [
      {
        name: 'Dr. Sarah Johnson',
        specialization: 'Orthodontics',
        phoneNumber: '555-0101',
        email: 'sarah.johnson@dentist.com',
        username: 'sjohnson',
        password: 'password123'
      },
      {
        name: 'Dr. Michael Chen',
        specialization: 'Pediatric Dentistry',
        phoneNumber: '555-0102',
        email: 'michael.chen@dentist.com',
        username: 'mchen',
        password: 'password123'
      },
      {
        name: 'Dr. Emily Rodriguez',
        specialization: 'Endodontics',
        phoneNumber: '555-0103',
        email: 'emily.rodriguez@dentist.com',
        username: 'erodriguez',
        password: 'password123'
      },
      {
        name: 'Dr. James Williams',
        specialization: 'Periodontics',
        phoneNumber: '555-0104',
        email: 'james.williams@dentist.com',
        username: 'jwilliams',
        password: 'password123'
      },
      {
        name: 'Dr. Maria Garcia',
        specialization: 'Prosthodontics',
        phoneNumber: '555-0105',
        email: 'maria.garcia@dentist.com',
        username: 'mgarcia',
        password: 'password123'
      },
      {
        name: 'Dr. Robert Taylor',
        specialization: 'Oral Surgery',
        phoneNumber: '555-0106',
        email: 'robert.taylor@dentist.com',
        username: 'rtaylor',
        password: 'password123'
      },
      {
        name: 'Dr. Lisa Anderson',
        specialization: 'Cosmetic Dentistry',
        phoneNumber: '555-0107',
        email: 'lisa.anderson@dentist.com',
        username: 'landerson',
        password: 'password123'
      },
      {
        name: 'Dr. David Martinez',
        specialization: 'General Dentistry',
        phoneNumber: '555-0108',
        email: 'david.martinez@dentist.com',
        username: 'dmartinez',
        password: 'password123'
      },
      {
        name: 'Dr. Jennifer Lee',
        specialization: 'Orthodontics',
        phoneNumber: '555-0109',
        email: 'jennifer.lee@dentist.com',
        username: 'jlee',
        password: 'password123'
      },
      {
        name: 'Dr. Christopher Brown',
        specialization: 'Pediatric Dentistry',
        phoneNumber: '555-0110',
        email: 'chris.brown@dentist.com',
        username: 'cbrown',
        password: 'password123'
      },
      {
        name: 'Dr. Amanda White',
        specialization: 'Endodontics',
        phoneNumber: '555-0111',
        email: 'amanda.white@dentist.com',
        username: 'awhite',
        password: 'password123'
      },
      {
        name: 'Dr. Daniel Harris',
        specialization: 'Periodontics',
        phoneNumber: '555-0112',
        email: 'daniel.harris@dentist.com',
        username: 'dharris',
        password: 'password123'
      },
      {
        name: 'Dr. Jessica Thompson',
        specialization: 'Prosthodontics',
        phoneNumber: '555-0113',
        email: 'jessica.thompson@dentist.com',
        username: 'jthompson',
        password: 'password123'
      },
      {
        name: 'Dr. Matthew Davis',
        specialization: 'Oral Surgery',
        phoneNumber: '555-0114',
        email: 'matthew.davis@dentist.com',
        username: 'mdavis',
        password: 'password123'
      },
      {
        name: 'Dr. Ashley Miller',
        specialization: 'Cosmetic Dentistry',
        phoneNumber: '555-0115',
        email: 'ashley.miller@dentist.com',
        username: 'amiller',
        password: 'password123'
      },
      {
        name: 'Dr. Ryan Wilson',
        specialization: 'General Dentistry',
        phoneNumber: '555-0116',
        email: 'ryan.wilson@dentist.com',
        username: 'rwilson',
        password: 'password123'
      },
      {
        name: 'Dr. Nicole Moore',
        specialization: 'Orthodontics',
        phoneNumber: '555-0117',
        email: 'nicole.moore@dentist.com',
        username: 'nmoore',
        password: 'password123'
      },
      {
        name: 'Dr. Kevin Jackson',
        specialization: 'Pediatric Dentistry',
        phoneNumber: '555-0118',
        email: 'kevin.jackson@dentist.com',
        username: 'kjackson',
        password: 'password123'
      },
      {
        name: 'Dr. Stephanie Martin',
        specialization: 'Endodontics',
        phoneNumber: '555-0119',
        email: 'stephanie.martin@dentist.com',
        username: 'smartin',
        password: 'password123'
      },
      {
        name: 'Dr. Brandon Clark',
        specialization: 'Periodontics',
        phoneNumber: '555-0120',
        email: 'brandon.clark@dentist.com',
        username: 'bclark',
        password: 'password123'
      }
    ];

    console.log('🌱 Creating 20 dentists...');

    let successCount = 0;
    let errorCount = 0;

    for (const dentistData of dentists) {
      try {
        await Dentist.create(dentistData);
        successCount++;
        console.log(`  ✅ Created: ${dentistData.name}`);
      } catch (error) {
        errorCount++;
        if (error.name === 'SequelizeUniqueConstraintError') {
          console.log(`  ⚠️  Skipped (already exists): ${dentistData.name}`);
        } else {
          console.log(`  ❌ Error creating ${dentistData.name}: ${error.message}`);
        }
      }
    }

    console.log('\n📊 Seed Summary:');
    console.log(`  ✅ Successfully created: ${successCount} dentists`);
    console.log(`  ⚠️  Skipped/Errors: ${errorCount} dentists`);
    console.log(`  📈 Total dentists in database: ${await Dentist.count()}`);

    console.log('\n✨ Seed completed!');
    console.log('\n💡 Test credentials:');
    console.log('   Email: sarah.johnson@dentist.com');
    console.log('   Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

// Run the seed
seedDentists();

