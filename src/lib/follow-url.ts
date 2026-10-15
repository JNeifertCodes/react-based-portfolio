// Hands the URL to the browser the same way a link click would, so downloads
// and mailto: work from a button without navigating the page.
export function followUrl(href: string, download?: string) {
  const link = document.createElement("a");
  link.href = href;
  if (download) link.download = download;
  link.click();
}
