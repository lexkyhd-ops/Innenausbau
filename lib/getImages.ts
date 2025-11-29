import { readdir } from 'fs/promises'
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

export async function getImagesByCategory(): Promise<Record<string, ImageItem[]>> {
  const imagesDir = join(process.cwd(), 'public', 'images')
  const categories: Record<string, ImageItem[]> = {}

  try {
    // Map folder names to category names
    const folderToCategory: Record<string, string> = {
      'Spachteltechnik': 'Spachteltechnik',
      'Trockenbau': 'Trockenbau',
      'Malerarbeit': 'Malerarbeit',
      'Terasse': 'Terrassenbau',
    }

    // Read all directories in the images folder
    const entries = await readdir(imagesDir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const folderName = entry.name
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
              src: `/images/${folderName}/${file}`,
              alt: `${categoryName} Projekt`,
              category: categoryName,
            }))

          categories[categoryName].push(...imageFiles)
        } catch (error) {
          console.error(`Error reading directory ${folderName}:`, error)
        }
      }
    }
  } catch (error) {
    console.error('Error reading images directory:', error)
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


