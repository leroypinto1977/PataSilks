import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@patasilks.com" },
    update: {},
    create: {
      email: "admin@patasilks.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Create categories
  const sarees = await prisma.category.upsert({
    where: { name: "Sarees" },
    update: {},
    create: {
      name: "Sarees",
      description: "Traditional silk sarees",
    },
  });

  const lehengas = await prisma.category.upsert({
    where: { name: "Lehengas" },
    update: {},
    create: {
      name: "Lehengas",
      description: "Elegant lehengas for special occasions",
    },
  });

  const dupattas = await prisma.category.upsert({
    where: { name: "Dupattas" },
    update: {},
    create: {
      name: "Dupattas",
      description: "Beautiful dupattas and scarves",
    },
  });

  // Create sample products
  await prisma.product.createMany({
    data: [
      {
        name: "Royal Kanjivaram Saree",
        description:
          "Exquisite handwoven Kanjivaram saree with intricate gold borders and traditional motifs.",
        price: 15999.0,
        images: JSON.stringify([
          "https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg",
          "https://images.pexels.com/photos/8839899/pexels-photo-8839899.jpeg",
        ]),
        categoryId: sarees.id,
        active: true,
      },
      {
        name: "Banarasi Silk Saree",
        description:
          "Pure Banarasi silk saree with zari work, perfect for weddings and festivities.",
        price: 12500.0,
        images: JSON.stringify([
          "https://images.pexels.com/photos/8839900/pexels-photo-8839900.jpeg",
        ]),
        categoryId: sarees.id,
        active: true,
      },
      {
        name: "Designer Bridal Lehenga",
        description:
          "Stunning bridal lehenga with heavy embroidery and mirror work.",
        price: 35000.0,
        images: JSON.stringify([
          "https://images.pexels.com/photos/8839901/pexels-photo-8839901.jpeg",
        ]),
        categoryId: lehengas.id,
        active: true,
      },
      {
        name: "Silk Dupatta with Embroidery",
        description: "Handcrafted silk dupatta with delicate embroidery work.",
        price: 2500.0,
        images: JSON.stringify([
          "https://images.pexels.com/photos/8839902/pexels-photo-8839902.jpeg",
        ]),
        categoryId: dupattas.id,
        active: true,
      },
      {
        name: "Patola Silk Saree",
        description:
          "Traditional Patola saree with geometric patterns and vibrant colors.",
        price: 18000.0,
        images: JSON.stringify([
          "https://images.pexels.com/photos/8839903/pexels-photo-8839903.jpeg",
        ]),
        categoryId: sarees.id,
        active: true,
      },
      {
        name: "Festive Lehenga Set",
        description:
          "Beautiful lehenga set perfect for festivals and celebrations.",
        price: 8500.0,
        images: JSON.stringify([
          "https://images.pexels.com/photos/8839904/pexels-photo-8839904.jpeg",
        ]),
        categoryId: lehengas.id,
        active: true,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
