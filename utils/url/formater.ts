export function formatTitleForFetch(title: string) {
  return title
    .replaceAll("-", " ")
    .replaceAll("%3A", ":")
    .replaceAll("%20", "-");
}
export function formatTitleForUrl(title: string) {
  
  return title.replaceAll(" ", "-").toLocaleLowerCase();
}


export function generateSlug(text:string) {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-zA-Z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
    .trim(); // Trim any whitespace
}