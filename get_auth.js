const puppeteer = require("puppeteer");

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: false, // Open visible browser as requested
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // Listen for the specific request
  // Listen for the response to ensure it was successful (200 OK)
  page.on("response", (response) => {
    // Check for get-home
    if (
      response.url().includes("api-content/get-home") &&
      response.status() === 200
    ) {
      const request = response.request();
      const headers = request.headers();

      console.log("--- CAPTURED HEADERS (On Success 200) ---");
      console.log("Url:", response.url());
      console.log("Cookie:", headers["cookie"] || "NONE");
      console.log("Authorization:", headers["authorization"] || "NONE");
      console.log("------------------------");
    }
  });

  console.log("Navigating to https://www.allticket.com/ ...");
  await page.goto("https://www.allticket.com/", { waitUntil: "networkidle2" });

  console.log("Browser is open. Please Log In manually.");
  console.log(
    'Script is listening for "get-home" or booking API requests to capture headers...'
  );
  console.log("Press Ctrl+C in terminal to stop when done.");

  // Keep alive forever (or until user kills execution)
  await new Promise(() => {});
})();
