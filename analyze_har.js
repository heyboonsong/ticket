const fs = require("fs");

const harPath =
  "/Users/heyboonsong/Workspaces/mysafe/projects/ticket/www.allticket.com.har";
const rawData = fs.readFileSync(harPath);
const har = JSON.parse(rawData);

const entries = har.log.entries;
console.log(`Total entries: ${entries.length}`);

// Find get-seat
const seatEntries = entries.filter((entry) =>
  entry.request.url.includes("get-seat")
);

console.log("--- Headers for get-seat ---");
seatEntries.forEach((entry) => {
  console.log(`URL: ${entry.request.url}`);
  console.log("Headers:");
  entry.request.headers.forEach((h) => {
    // Hide very long values but show names
    const val =
      h.value.length > 200 ? h.value.substring(0, 100) + "..." : h.value;
    console.log(`  ${h.name}: ${val}`);
  });
  console.log("Cookies:");
  entry.request.cookies.forEach((c) => {
    console.log(`  ${c.name}: ${c.value.substring(0, 50)}...`);
  });
  console.log("-------------------------");
});
