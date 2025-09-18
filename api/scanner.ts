export async function  fetchScannerClasses(AUTH_TOKEN: string | null) {
  console.log("fetchApi")
  const res = await fetch("https://my.api.mockaroo.com/scanner_classes.json", {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "643e87a0",
      "Authorization": `Bearer ${"AUTH_TOKEN"}`
    },
  });
  
  const data = await res.json()
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }
  return data;
}