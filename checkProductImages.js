
import fs from "node:fs";
import path from "node:path";

const imageFolder = path.join(process.cwd(), "public");

const images = [
  "darkvelvet.jpeg",
  "malabardark.jpeg",
  "malabarnoir.jpeg",
  "monsoondark.jpeg",
  "coffeecoastdark.jpeg",
  "royalty.jpeg",
  "cocoamaharaja.jpeg",
  "zamoringold.jpeg",
  "malabardynasty.jpeg",
  "velvetcrown.jpeg",
  "wheynadu.jpeg",
  "malabarmusclebar.jpeg",
  "proteinforge.jpeg",
  "powerbiteelite.jpeg",
  "fitfuel.jpeg",
  "goldenwalnutfusion.jpeg",
  "keralapistachio.jpeg",
  "malabarnutroyale.jpeg",
  "coconutsilkcrunch.jpeg",
  "hazelroyale.jpeg",
];

const missing = images.filter(
  (image) => !fs.existsSync(path.join(imageFolder, image))
);

console.log(`Found: ${images.length - missing.length}/${images.length} images`);

if (missing.length) {
  console.log("Missing images:", missing);
} else {
  console.log("All images are ready!");
}
