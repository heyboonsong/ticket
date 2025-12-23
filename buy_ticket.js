const { exec } = require("child_process");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const { error } = require("console");

// --- Configuration ---
const CONFIG = {
  EVENT_NAME: "SMTOWNLIVE2026inBKK",
  ZONE_ID: ["C3"],
  TOKEN:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhleWJvb25zb25nQGdtYWlsLmNvbSIsInVybGJhY2siOiJ3d3cuYWxsdGlja2V0LmNvbSIsInBheW1lbnRDaGFubmVsIjoiQzA3IiwidGlja2V0VHlwZSI6IjAxIiwibGFuZyI6IkUiLCJkYXRhIjoiYTk0YTU3NGY3NGJhMWM5MTdiZTA1NGYwYmM5NjI1MDBhOGIyY2U0ODA3ZmYzOGJmNTY2YWYxNGY0MDkzYjcyODU0ZmViMTExMjk2MDg4NmFjNDBjYTk1MjBkOTI4NGEzNzdiYjYxMjU4MWNlY2MzZmVlMjU0OGI0MmM4YTkyYmJiM2QzYWYzMmU5NTg3NzQxYWQzYjE0MTQyODUyZjg3Mzg4YjNjZmRlMDNjZTljNDg2Y2ExODcwMzVlZTU1YjZlNzNkOTc0OTc3Y2VhNGU5MDgxYTliYWNjNDA0YjVmN2QwMjliMGI2Y2Y0YTE0NzA2NjdlZjQzODlkZWUzMGMwNDY0ZmY4NDQwY2RjOGFhOWUyM2MyZmZhYTJiOThhODZjOTU3ZGYxOGEyNDc5YWUzZTVmZmQzMmE5NTI0NGFiZGIwMTEzMDk2ZDQ3ZDAyMWY4MzMxNDFkMmMxODFiYjQ1NTFmN2QyZjU2ZDJhM2NmN2ExY2RkYTI4OWVlOTZkNDU2NTdiZTQyNGMzMmUyOTkzMTA1ZTIyZjlkZjZkODNhMTllOTljZTdjNjU1ZTBjYWUwMmEzMjEzNTgzMTNlOTZlMTU2OTIwNzIyZDUzMzZmYmQzY2RiOTNjZjFiM2Y4YjMyZWVmNzhhZDkzODI4OTFmYzYzNTBjNWM5MDAyMTc4ZTlhZGViNmE2YzYwYmU1MmNlODYwMDYxYWMyZmFhOGI1MzFmMDZiOTZlYmZlMjM0MzQzNDRiNzEzNDVmZTJiZTRkOWU3ZGQxOTY0NzM0MTAyN2JhOGQwNWNjMGFhNDdiYmU5NDgyMjYzMWZiMjQyMDdhNTJiMzFiNDM5YWNiYmY5NzE0ZTYyMzU4NTNhNzBjZTg4NmYyYTk1YjBkZmNkNzRiYTAxNTVhZTM2NGE5Yzk5YzUwZGIxNDJiMjMzMjQyZDM0MTFlNzk5MmNkOWFmOTVlMzZlODUyNGU5YjBkYWRmNTEzZmI3Yjk1YWZhMmY4ZTVjYWI2NDVjNGU0YjgxZTQ3NmEzZGVjMTJkZDQ0NmFlNjVlZDZjZmFlNWQ0NTA0NzkwMWI2YzE4Yjc3N2ExNzU4OWZhNWZkYTE3NzNmZDQ5YTAxMGFjY2NhODY3ZGJhOTJkMDRlMzQxODliMWM1ODk5YzMyYzY2MjI2NjZmY2Y3OTBkMGI2ZjQ5ZjMzMDVmMTgxYjhjZjA1OTIzMDc5ZjM5YjMyMjM0MGUxYzk0N2MyNTNiZWQwM2M1YWQxNjliMjQzMWM2MjQ2NmQ5Y2IyNTgwODY4MDdjNGYzMzBmNmYxNmE5ZGJkNzI4ODg5YjBjZWIiLCJ0aW1lU3RhbXAiOjAuMzkxODIyNDY0NTQ0NDU1OSwiZmlyc3RuYW1lIjoiQm9vbnNvbmciLCJsYXN0bmFtZSI6IlNyaXRob25nIiwic2luZ0FkZHJlc3MiOiI0OS40OS4yMTYuMTM5IiwidHlwZSI6ImVtYWlsX2xvZ2luIiwic2NvcmUiOjEsInVzZXJNYWlsIjoiaGV5Ym9vbnNvbmdAZ21haWwuY29tIiwiaWF0IjoxNzY2NDY2MDYwLCJleHAiOjE3NjY0NzY4NjAsImlzcyI6ImNzYXRrMTgifQ.tm1IEZZjjSMOWb5yH4qgVCy3AA6hynaIIs2ZXkLpZiQ",
  START_TIME: null, // e.g., "2025-12-23T00:10:30"
  // SET WITH API
  PERFORM_ID: "",
  ROUND_ID: "",
  EVENT_CONSENT: [],
  COOKIE: "",
  BASE_URL: "https://www.allticket.com",
  // Format: "YYYY-MM-DDTHH:mm:ss" or null to run immediately
};

async function main() {
  (async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({
      headless: false, // Open visible browser as requested
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--window-size=400,600",
        "--ozone-override-screen-size=400,600",
      ],
      defaultViewport: {
        width: 400,
        height: 600,
      },
    });
    const page = await browser.newPage();

    // Listen for the specific request
    // Listen for the response to ensure it was successful (200 OK)
    page.on("response", async (response) => {
      // Check for get-home
      if (
        response.url().includes("api-content/get-home") &&
        response.status() === 200
      ) {
        const request = response.request();
        const headers = request.headers();

        console.log("--- CAPTURED HEADERS (On Success 200) ---");
        const cookie = headers["cookie"];
        console.log(cookie);
        if (!cookie) {
          console.log("Cookie not found in headers");
          return;
        }
        CONFIG.COOKIE = cookie;
        // await process();
      }
    });

    await page.goto("https://www.allticket.com/", {
      waitUntil: "networkidle2",
    });

    setTimeout(() => {
      console.log(
        "Starting Ticket Automation (Curl Mode) - Press Ctrl+C to stop"
      );
    }, 10000);
    await new Promise(() => {});
  })();

  // // --- SCHEDULER: Wait if START_TIME is set ---
  // if (CONFIG.START_TIME) {
  //   const startTime = new Date(CONFIG.START_TIME).getTime();
  //   if (!isNaN(startTime)) {
  //     while (true) {
  //       const now = new Date().getTime();
  //       const waitTime = startTime - now;

  //       if (waitTime <= 0) {
  //         console.log("\nStart time reached! Launching automation...");
  //         break;
  //       }

  //       // Calculate hours, minutes, seconds left
  //       const hours = Math.floor((waitTime / (1000 * 60 * 60)) % 24);
  //       const minutes = Math.floor((waitTime / (1000 * 60)) % 60);
  //       const seconds = Math.floor((waitTime / 1000) % 60);

  //       process.stdout.write(
  //         `\r[Scheduler] Waiting... Time remaining: ${hours}h ${minutes}m ${seconds}s   `
  //       );

  //       // Wait 1 second before checking again
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //     }
  //   } else {
  //     console.warn("Invalid START_TIME format. Running immediately.");
  //   }
  // }

  // while (true) {
  //   const success = await checkAndReserve();
  //   if (!success) {
  //     break;
  //   }

  //   // Polling interval
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  // }
}

async function process() {
  try {
    const { event_id, event_consent } = await fetchEventInfo();
    if (!event_id && !event_consent) {
      console.log("Failed to fetch Event ID or Consent");
      return;
    }

    console.log(`Fetched Event ID: ${event_id}`);
    console.log(`Has Consent: ${!event_consent ? false : true}`);
    CONFIG.PERFORM_ID = event_id;
    CONFIG.EVENT_CONSENT = event_consent ?? [];
  } catch (err) {
    console.error("Could not fetch Event ID:", err);
  }

  if (!CONFIG.ZONE_ID.length) {
    const success = await checkAndReserve(null);
    console.log("Success: ", success);
    return;
  }
  for (const zoneId of CONFIG.ZONE_ID) {
    console.log(
      `Target: Event ${CONFIG.PERFORM_ID} | Zone ${zoneId} | ReserveZone ${CONFIG.RESERVE_ZONE_ID}`
    );
    const success = await checkAndReserve(zoneId);
    if (!success) {
      console.log(`Failed to reserve seats for Zone: ${zoneId}`);
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

async function checkAndReserve(initialZoneId) {
  let zoneId = initialZoneId;
  const timestamp = new Date().toLocaleTimeString();
  console.log(
    `[${timestamp}] Checking seats for Zone:  ${!zoneId ? "NO Zone" : zoneId}`
  );

  try {
    // Step 1: Get Round
    // Payload from HAR: {"performId":"25952"}
    const roundRes = await curlRequest("/api-booking/get-round", {
      performId: CONFIG.PERFORM_ID,
    });
    console.log(roundRes.data);
    if (
      roundRes.data.success &&
      roundRes.data.data.event_info.list_round.length > 0
    ) {
      const roundId = roundRes.data.data.event_info.list_round[0].roundId;
      if (!zoneId) {
        // Dynamic Zone Parsing
        const $ = cheerio.load(roundRes.data.data.event_info.zoneLayout);
        zoneId = $("area").attr("data-zone");
        console.log("Auto-Detected Zone ID: " + zoneId);
      }

      CONFIG.ROUND_ID = roundId;
      console.log(`Fetched Round ID: ${CONFIG.ROUND_ID}`);
    } else {
      console.log(
        "Could not fetch rounds or list empty, PERFORM_ID:",
        CONFIG.PERFORM_ID
      );

      return false;
    }

    if (!zoneId) {
      console.log("No Zone ID determined. Aborting.");
      return false;
    }

    // Step 2: Get Seat
    const response = await curlRequest("/api-booking/get-seat", {
      performId: CONFIG.PERFORM_ID,
      roundId: CONFIG.ROUND_ID,
      zoneId: zoneId,
    });

    // Explicitly verify response structure
    const seatData = response && response.data ? response.data : {};

    // Check top-level success.
    if (!seatData) {
      console.log("Empty or invalid response object.");
      return false;
    }

    const innerData = seatData.data || {};
    const seatsAvailable = innerData.seats_available || [];

    if (!seatsAvailable || seatsAvailable.length === 0) {
      console.log(
        `[${timestamp}] No free seats found (seats_available empty). Retrying...`
      );
      return false;
    }

    if (innerData.zone_type == "NONSEAT") {
      // Reserve NONSEAT
      console.log("Attempting NONSEAT reservation...");
      const reservePayload = {
        performId: CONFIG.PERFORM_ID,
        roundId: CONFIG.ROUND_ID,
        zoneId: zoneId,
        screenLabel: zoneId,
        seatTo: { seatType: "NONSEAT", seatAmount: "1" },
        shirtTo: [],
        consents: getConsents(),
      };

      const reserveRes = await curlRequest(
        "/api-booking/handler-reserve",
        reservePayload
      );
      const reserveData = reserveRes.data;

      // Check reservation response
      if (reserveData && reserveData.success === false) {
        console.error("Reservation Failed:", reserveData);
        return false;
      }

      console.log(
        `Reservation Response (${reserveData.success}) \n UUID: ${reserveRes.data.data.uuid} \n zoneId: ${zoneId} \n seatTo NONSEAT`
      );
      return true;
    }

    // Flatten all seats from all available zones/sections
    let allSeats = [];
    seatsAvailable.forEach((section) => {
      if (section.seat && Array.isArray(section.seat)) {
        allSeats = allSeats.concat(section.seat);
      }
    });

    if (allSeats.length === 0) {
      console.log(
        `[${timestamp}] Structure found but 'seat' array is empty. Retrying...`
      );
      return false;
    }

    // Check availability.
    // Status "A" means Available.
    const availableSeats = allSeats.filter((s) => s.status === "A");

    if (availableSeats.length === 0) {
      console.log(
        `[${timestamp}] Seats loaded but none are 'A' (Available). Retrying...`
      );
      return false;
    }

    console.log(`\n!!! FOUND ${availableSeats.length} AVAILABLE SEATS !!!`);
    for (let i = 0; i < availableSeats.length; i++) {
      const selectedSeat = availableSeats[i];
      const seats = `${selectedSeat.rowName}_${selectedSeat.seatNo}`;
      console.log(
        `Selected Seat: ${seats} (Row: ${selectedSeat.rowNo}, Col: ${selectedSeat.colNo})`
      );

      // Reserve Seat
      console.log("Attempting reservation...");
      const reservePayload = {
        performId: CONFIG.PERFORM_ID,
        roundId: CONFIG.ROUND_ID,
        zoneId: zoneId,
        screenLabel: zoneId,
        seatTo: {
          seatType: "SEAT",
          seats: [seats],
        },
        shirtTo: [],
        consents: getConsents(),
      };

      curlRequest("/api-booking/handler-reserve", reservePayload).then(
        (reserveRes) => {
          const reserveData = reserveRes.data;
          // Check reservation response
          if (reserveData && reserveData.success === false) {
            console.error("Reservation Failed:", reserveData);
            return false;
          }
          console.log(
            `Reservation Response (${reserveData.success}) \n UUID: ${reserveRes.data.data.uuid} \n zoneId: ${zoneId} \n seatTo: ${reservePayload.seatTo.seats}`
          );
        }
      );
    }

    return true;
  } catch (error) {
    console.error(`[${timestamp}] Error: ${error.message}`);
    return false;
  }
}

function getConsents() {
  let consents = [];
  for (const consent of CONFIG.EVENT_CONSENT) {
    consents.push({ consentId: consent.consentId, consentvalue: "Y" });
  }

  return consents;
}

// Function to fetch the Event ID dynamically
function fetchEventInfo() {
  return new Promise((resolve, reject) => {
    // Using a simpler curl for the public GET endpoint
    const url =
      `https://www.allticket.com/master/event_info/${CONFIG.EVENT_NAME}.json?time=` +
      new Date().getTime();
    const command = `curl -s '${url}' -H 'accept: application/json'`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Failed to fetch event info:", error);
        reject(error);
        return;
      }
      try {
        const json = JSON.parse(stdout);
        if (json && json.data && json.data.event_id) {
          resolve(json.data);
        } else {
          reject(new Error("event_info not found in response"));
        }
      } catch (e) {
        reject(e);
      }
    });
  });
}

// Function to execute curl command matching the user's successful one
function curlRequest(urlEndpoint, data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data).replace(/"/g, '\\"'); // Escape quotes

    // Removed --silent to see errors if any
    const command = `curl '${CONFIG.BASE_URL}${urlEndpoint}' \\
  -H 'accept: application/json, text/plain, */*' \\
  -H 'accept-language: en-US,en;q=0.9,th;q=0.8' \\
  -H 'authorization: ${CONFIG.TOKEN}' \\
  -H 'content-type: application/json' \\
  -b '${CONFIG.COOKIE}' \\
  -H 'origin: https://www.allticket.com' \\
  -H 'priority: u=1, i' \\
  -H 'referer: https://www.allticket.com/event/${CONFIG.EVENT_NAME}' \\
  -H 'sec-ch-ua: "Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"' \\
  -H 'sec-ch-ua-mobile: ?0' \\
  -H 'sec-ch-ua-platform: "macOS"' \\
  -H 'sec-fetch-dest: empty' \\
  -H 'sec-fetch-mode: cors' \\
  -H 'sec-fetch-site: same-origin' \\
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36' \\
  --data-raw "${jsonData}"`;

    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
      if (error) {
        console.error("Curl Exec Error:", error.message);
        reject(error);
        return;
      }
      try {
        if (!stdout || !stdout.trim()) {
          // Log stderr to see why it's empty
          console.log(`[Curl] Empty response. Stderr: ${stderr || "None"}`);
          resolve({ data: {} });
        } else {
          const json = JSON.parse(stdout);
          resolve({ data: json });
        }
      } catch (e) {
        // Not JSON?
        if (stdout.includes("AccessDenied") || stdout.includes("403")) {
          console.log("[Curl] WAF Blocked (AccessDenied/403)");
        } else {
          console.log("Failed to parse JSON:", stdout.substring(0, 100));
        }
        reject(e);
      }
    });
  });
}

main();
