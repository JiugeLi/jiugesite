const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Check if any group exists
  const count = await prisma.group.count();
  
  if (count === 0) {
    console.log('No groups found. Seeding default data...');
    
    await prisma.group.create({
      data: {
        name: 'Default',
        icon: '📁',
        sort_order: 0,
        websites: {
          create: [
            {
              name: 'Google',
              url: 'https://www.google.com',
              description: 'Search the world\'s information.',
              sort_order: 0
            },
            {
              name: 'GitHub',
              url: 'https://github.com',
              description: 'Where the world builds software.',
              sort_order: 1
            }
          ]
        }
      }
    });
    
    console.log('Seeding completed.');
  } else {
    console.log('Data already exists. Skipping seed.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
