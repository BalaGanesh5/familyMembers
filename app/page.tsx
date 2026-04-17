import fs from "fs";
import path from "path";
import GalleryClient from "./GalleryClient";

export default async function InfiniteGallery() {
  // Safely read the images from the public/gallery directory
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  let imageUrls: string[] = [];

  try {
    if (fs.existsSync(galleryDir)) {
      const files = fs.readdirSync(galleryDir);
      // Filter for standard image formats only
      const imageFiles = files.filter((file) =>
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      );
      imageUrls = imageFiles.map((file) => `/gallery/${file}`);
    }
  } catch (error) {
    console.error("Error reading gallery directory:", error);
  }

  // Render the Client Component and pass the actual images we found!
  return <GalleryClient imageUrls={imageUrls} />;
}