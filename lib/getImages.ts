import { readdir, access } from 'fs/promises'
import { join } from 'path'

interface ImageItem {
  src: string
  alt: string
  category: string
}

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

function isValidImageFile(filename: string): boolean {
  const ext = filename.toLowerCase()
  return imageExtensions.some(extension => ext.endsWith(extension))
}

async function directoryExists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function processImageDirectory(
  imagesDir: string,
  categories: Record<string, ImageItem[]>,
  folderToCategory: Record<string, string>,
  basePath: string // 'public' or 'app' to determine the correct image path
): Promise<void> {
  try {
    // Read all directories in the images folder
    const entries = await readdir(imagesDir, { withFileTypes: true })

    for (const entry of entries) {
      // Skip files and only process directories
      if (entry.isDirectory()) {
        const folderName = entry.name
        
        // Skip hidden directories and special directories
        if (folderName.startsWith('.') || folderName === 'node_modules') {
          continue
        }

        // Use mapping if available, otherwise use folder name as category name
        // Neue Ordner werden automatisch erkannt!
        const categoryName = folderToCategory[folderName] || folderName

        if (!categories[categoryName]) {
          categories[categoryName] = []
        }

        try {
          // Read all files in the category folder
          const categoryDir = join(imagesDir, folderName)
          const files = await readdir(categoryDir)

          // Filter and map image files
          const imageFiles = files
            .filter(file => isValidImageFile(file))
            .map(file => ({
              // Use correct path based on source directory
              src: basePath === 'public' 
                ? `/images/${folderName}/${file}`
                : `/images/${folderName}/${file}`, // app/images wird auch über /images serviert wenn richtig konfiguriert
              alt: `${categoryName} Projekt`,
              category: categoryName,
            }))

          // Only add category if it has images
          // WICHTIG: Der Ordner muss mindestens eine Bilddatei enthalten!
          if (imageFiles.length > 0) {
            categories[categoryName].push(...imageFiles)
          }
        } catch (error) {
          console.error(`Error reading directory ${folderName}:`, error)
        }
      }
    }
  } catch (error) {
    console.error(`Error reading images directory ${imagesDir}:`, error)
  }
}

export async function getImagesByCategory(): Promise<Record<string, ImageItem[]>> {
  const categories: Record<string, ImageItem[]> = {}

  // Map folder names to display names (optional - nur wenn Anzeigename anders sein soll)
  // Neue Ordner werden automatisch erkannt - fügen Sie hier nur hinzu, wenn der Anzeigename anders sein soll
  const folderToCategory: Record<string, string> = {
    'Terasse': 'Terrassenbau', // Beispiel: Ordner "Terasse" wird als "Terrassenbau" angezeigt
    // Alle anderen Ordner werden automatisch mit ihrem Ordnernamen als Kategorie erkannt
  }

  // WICHTIG: Neue Ordner müssen in public/images/ erstellt werden!
  // Next.js serviert nur Dateien aus dem public/ Verzeichnis über HTTP
  const imagesDir = join(process.cwd(), 'public', 'images')

  // Process public/images directory
  if (await directoryExists(imagesDir)) {
    await processImageDirectory(imagesDir, categories, folderToCategory, 'public')
  }

  return categories
}

export async function getAllImages(): Promise<ImageItem[]> {
  const imagesByCategory = await getImagesByCategory()
  const allImages: ImageItem[] = []

  for (const category in imagesByCategory) {
    allImages.push(...imagesByCategory[category])
  }

  return allImages
}


