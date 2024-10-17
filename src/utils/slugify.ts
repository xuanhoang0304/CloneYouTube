export function slugify(text: string) {
    return text
      .toLowerCase() // Convert to lowercase
      .normalize("NFD") // Normalize to separate accents
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .trim() // Remove whitespace from both ends
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with a single one
  }