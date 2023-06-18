export function formatTitleForFetch(title: string) {
  return title
    .replaceAll("-", " ")
    .replaceAll("%3A", ":")
    .replaceAll("%20", "-");
}
export function formatTitleForUrl(title: string) {
  
  return title.replaceAll(" ", "-").toLocaleLowerCase();
}
