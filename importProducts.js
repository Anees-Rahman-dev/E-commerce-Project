

import fs from "node:fs";
import path from "node:path";
import axios from "axios";
import FormData from "form-data";
import { fileURLToPath } from "node:url";


const products = [
  { name: "Dark Velvet", category: "Dark", price: 360, description: "Smooth 70% dark chocolate with a velvety texture and bold cocoa richness.", image: "darkvelvet.jpeg", stock: 29, rating: 4.8 },
  { name: "Malabar Dark", category: "Dark", price: 299, description: "Intense Malabar-style dark chocolate crafted with deep roasted cocoa flavors.", image: "malabardark.jpeg", stock: 30, rating: 4.6 },
  { name: "Malabar Noir", category: "Dark", price: 279, description: "Elegant noir dark chocolate inspired by the rich cocoa heritage of Malabar.", image: "malabarnoir.jpeg", stock: 8, rating: 4.4 },
  { name: "Monsoon Dark", category: "Dark", price: 430, description: "Bold dark chocolate infused with the rich and moody essence of Kerala monsoons.", image: "monsoondark.jpeg", stock: 20, rating: 4.9 },
  { name: "Coffee Coast Dark", category: "Dark", price: 369, description: "Dark chocolate blended with aromatic coastal coffee beans for a bold finish.", image: "coffeecoastdark.jpeg", stock: 15, rating: 4.5 },
  { name: "Royalty", category: "Royal Collection", price: 319, description: "Luxurious chocolate crafted with a royal touch and silky premium cocoa.", image: "royalty.jpeg", stock: 33, rating: 4.7 },
  { name: "Cocoa Maharaja", category: "Royal Collection", price: 329, description: "Grand dark chocolate inspired by royal Indian flavors and rich cocoa indulgence.", image: "cocoamaharaja.jpeg", stock: 0, rating: 4.6 },
  { name: "Zamorin Gold", category: "Royal Collection", price: 289, description: "Golden premium chocolate inspired by the legendary Zamorin heritage of Kerala.", image: "zamoringold.jpeg", stock: 40, rating: 4.3 },
  { name: "Malabar Dynasty", category: "Royal Collection", price: 699, description: "A majestic assortment of luxury chocolates celebrating the Malabar legacy.", image: "malabardynasty.jpeg", stock: 12, rating: 5 },
  { name: "Velvet Crown", category: "Royal Collection", price: 1199, description: "Premium crown-worthy chocolates wrapped in smooth velvet-like cocoa richness.", image: "velvetcrown.jpeg", stock: 8, rating: 4.9 },
  { name: "Whey Nadu Crunch", category: "High Protein", price: 389, description: "Protein-packed crunchy chocolate bar with a bold Kerala-inspired twist.", image: "wheynadu.jpeg", stock: 22, rating: 4.7 },
  { name: "Malabar Muscle Bar", category: "High Protein", price: 309, description: "High-protein chocolate bar crafted for strength with rich Malabar cocoa.", image: "malabarmusclebar.jpeg", stock: 28, rating: 4.5 },
  { name: "Protein Forge 30g", category: "High Protein", price: 359, description: "Powerful 30g protein chocolate bar forged for energy, fitness, and flavor.", image: "proteinforge.jpeg", stock: 18, rating: 4.6 },
  { name: "PowerBite Elite", category: "High Protein", price: 469, description: "Elite high-protein chocolate bites designed for performance and rich taste.", image: "powerbiteelite.jpeg", stock: 16, rating: 4.8 },
  { name: "FitFuel Chocolate", category: "High Protein", price: 279, description: "Smooth fitness-focused chocolate packed with energy and satisfying cocoa flavor.", image: "fitfuel.jpeg", stock: 45, rating: 4.4 },
  { name: "Golden Walnut Fusion", category: "Nut Fusion", price: 399, description: "Rich chocolate fused with golden roasted walnuts for a crunchy premium delight.", image: "goldenwalnutfusion.jpeg", stock: 0, rating: 4.9 },
  { name: "Kerala Pistachio Melt", category: "Nut Fusion", price: 299, description: "Creamy chocolate melt infused with premium pistachios and Kerala-inspired richness.", image: "keralapistachio.jpeg", stock: 33, rating: 4.3 },
  { name: "Malabar Nut Royale", category: "Nut Fusion", price: 899, description: "Royal assortment of nut-filled chocolates inspired by the flavors of Malabar.", image: "malabarnutroyale.jpeg", stock: 10, rating: 5 },
  { name: "Coconut Silk Crunch", category: "Nut Fusion", price: 439, description: "Silky coconut chocolate blended with a satisfying crunchy texture.", image: "coconutsilkcrunch.jpeg", stock: 23, rating: 4.6 },
  { name: "Hazel Royale", category: "Nut Fusion", price: 329, description: "Royal hazelnut chocolate with a creamy texture and luxurious cocoa finish.", image: "hazelroyale.jpeg", stock: 38, rating: 4.7 },
];

console.log(`Prepared ${products.length} products for import.`);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = "http://localhost:5226/api/Product";
const IMAGE_FOLDER = path.join(__dirname, "public");

async function importProducts() {
  const token = process.env.ADMIN_TOKEN;

  console.log("Token exists:", Boolean(token));
console.log("Token length:", token?.length);

  if (!token) {
    throw new Error("ADMIN_TOKEN environment variable is missing.");
  }

  for (const product of products) {
    const imagePath = path.join(IMAGE_FOLDER, product.image);

    if (!fs.existsSync(imagePath)) {
      console.error(`Image not found: ${imagePath}`);
      continue;
    }

    const form = new FormData();

    form.append("Name", product.name);
    form.append("Category", product.category);
    form.append("Price", String(product.price));
    form.append("Description", product.description);
    form.append("Stock", String(product.stock));
    form.append("Rating", String(product.rating));
    form.append("Image", product.image);
    form.append("ImageFile", fs.createReadStream(imagePath));

    try {
      const response = await axios.post(API_URL, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`✅ Imported: ${response.data.name}`);
    } catch (error) {
      console.error(
        `❌ Failed: ${product.name}`,
        error.response?.status,
        error.response?.data ?? error.message
      );
      break;
    }
  }
}

importProducts().catch(console.error);

