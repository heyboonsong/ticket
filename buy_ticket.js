const { exec } = require("child_process");

// --- Configuration ---
const CONFIG = {
  TOKEN:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhleWJvb25zb25nQGdtYWlsLmNvbSIsInVybGJhY2siOiJ3d3cuYWxsdGlja2V0LmNvbSIsInBheW1lbnRDaGFubmVsIjoiQzA3IiwidGlja2V0VHlwZSI6IjAxIiwibGFuZyI6IkUiLCJkYXRhIjoiYTk0YTU3NGY3NGJhMWM5MTdiZTA1NGYwYmM5NjI1MDBhOGIyY2U0ODA3ZmYzOGJmNTY2YWYxNGY0MDkzYjcyODU0ZmViMTExMjk2MDg4NmFjNDBjYTk1MjBkOTI4NGEzNzdiYjYxMjU4MWNlY2MzZmVlMjU0OGI0MmM4YTkyYmJiM2QzYWYzMmU5NTg3NzQxYWQzYjE0MTQyODUyZjg3Mzg4YjNjZmRlMDNjZTljNDg2Y2ExODcwMzVlZTU1YjZlNzNkOTc0OTc3Y2VhNGU5MDgxYTliYWNjNDA0YjVmN2QwMjliMGI2Y2Y0YTE0NzA2NjdlZjQzODlkZWUzMGMwNDY0ZmY4NDQwY2RjOGFhOWUyM2MyZmZhYTJiOThhODZjOTU3ZGYxOGEyNDc5YWUzZTVmZmQzMmE5NTI0NGFiZGIwMTEzMDk2ZDQ3ZDAyMWY4MzMxNDFkMmMxODFiYjQ1NTFmN2QyZjU2ZDJhM2NmN2ExY2RkYTI4OWVlOTZkNDU2NTdiZTQyNGMzMmUyOTkzMTA1ZTIyZjlkZjZkODNhMTllOTljZTdjNjU1ZTBjYWUwMmEzMjEzNTgzMTNlOTZlMTU2OTIwNzIyZDUzMzZmYmQzY2RiOTNjZjFiM2Y4YjMyZWVmNzhhZDkzODI4OTFmYzYzNTBjNWM5MDAyMTc4ZTlhZGViNmE2YzYwYmU1MmNlODYwMDYxYWMyZmFhOGI1MzFmMDZiOTZlYmZlMjM0MzQzNDRiNzEzNDVmZTJiZTRkOWU3ZGQxOTY0NzM0MTAyN2JhOGQwNWNjMGFhNDdiYmU5NDgyMjYzMWZiMjQyMDdhNTJiMzFiNDM5YWNiYmY5NzE0ZTYyMzU4NTNhNzBjZTg4NmYyYTk1YjBkZmNkNzRiYTAxNTVhZTM2NGE5Yzk5YzUwZGIxNDJiMjMzMjQyZDM0MTFlNzk5MmNkOWFmOTVlMzZlODUyNGU5YjBkYWRmNTEzZmI3Yjk1YWZhMmY4ZTVjYWI2NDVjNGU0YjgxZTQ3NmEyM2JkZWJjYzBkNmQ3NGJlODY0Y2M2NTIwNTU2YTgxNmEzNTQ4ZmRlODExYWI0ODNjZDZjZmFkNWZiOWJkNWEyMjUyNWMyYWQzMzE1NzcxYWU4NmVhZDUyYWYwM2Q1NzVkYzJmNTQ3YzFmNDNhMWRhMmEyZDNhZDhlMDI5NzQ0YzI3NTM0ZmJjNGZjYTM1Mjg1OGFlMDViY2IyZjdiNjgxYTMwMTU4NGYyMWRiYjlkNDg3NmE0OGQ1ZGRjMjBjIiwidGltZVN0YW1wIjowLjYzODkxMDEzNTg2MzE4MzUsImZpcnN0bmFtZSI6IkJvb25zb25nIiwibGFzdG5hbWUiOiJTcml0aG9uZyIsInNpbmdBZGRyZXNzIjoiNDkuNDkuMjE2LjEzOSIsInR5cGUiOiJleHRlbmQiLCJzY29yZSI6MSwidXNlck1haWwiOiJoZXlib29uc29uZ0BnbWFpbC5jb20iLCJpYXQiOjE3NjY0MjEyMTgsImV4cCI6MTc2NjQzMjAxOCwiaXNzIjoiY3NhdGsxOCJ9.polig1BdGPgpjg0rM1jbT4IKQpBisxGpoFZS3pzrk-s",
  EVENT_NAME: "SMTOWNLIVE2026inBKK",
  ZONE_ID: "A2",
  // SET WITH API
  PERFORM_ID: "25952",
  ROUND_ID: "R1",
  BASE_URL: "https://www.allticket.com",
  COOKIE:
    "_ga=GA1.2.764019633.1766411747; _gid=GA1.2.2120792405.1766411747; G_ENABLED_IDPS=google; cookieconsent_status=allow; cookies-strictly=true; cookies-performance=false; aws-waf-token=314f55ae-578f-4a1b-89ca-b4a38c7a71d8:NQoAfON2oDtMAAAA:gl8vaths6tvgn49Aq+Sc43Ngkxa5B/LRBG+iJQY0EncrfmxaTV+DKs4TZDZJYuzydAxODadpZAoCUT447ZHdb4Mz12uH7o6luZ3wo1dNGQ2CZqIBiT2/nRCFww3p52GRXpCCueADNjO6C/hycnhGrrCDbUsVgujjjCRHOVJgmtQW1CqZ6lC2Haopg4YSCIZCHtHalOAHMth/6jTOFJq1bwNBxXPIB+hIWnD0osESl6+PqVWqjHKkrZow5flexpiXtjVG3iMmqHLrjvM3n+zWvcPyFLUVzw==; _gat=1; _ga_ERZFFGWN5D=GS2.2.s1766417124$o2$g1$t1766422653$j52$l0$h539641078",
};

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

async function checkAndReserve() {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] Checking seats for Zone: ${CONFIG.ZONE_ID}...`);

  try {
    // Step 1: Get Round
    // Payload from HAR: {"performId":"25952"}
    const roundRes = await curlRequest("/api-booking/get-round", {
      performId: CONFIG.PERFORM_ID,
    });

    // Dynamically set ROUND_ID
    if (
      roundRes &&
      roundRes.data &&
      roundRes.data.data &&
      Array.isArray(roundRes.data.data.list_round)
    ) {
      const rounds = roundRes.data.data.list_round;
      if (rounds.length > 0) {
        CONFIG.ROUND_ID = rounds[0].roundId;
        console.log(`Fetched Round ID: ${CONFIG.ROUND_ID}`);
      }
    } else {
      console.log(
        "Could not fetch rounds or list empty, using default/hardcoded:",
        CONFIG.ROUND_ID
      );
    }

    // Step 2: Get Seat
    const response = await curlRequest("/api-booking/get-seat", {
      performId: CONFIG.PERFORM_ID,
      roundId: CONFIG.ROUND_ID,
      zoneId: CONFIG.ZONE_ID,
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
    const selectedSeat = availableSeats[0];
    const selectedSeatNo = selectedSeat.seatNo;
    const seats = `${selectedSeat.rowName}_${selectedSeat.seatNo}`;
    console.log(
      `Selected Seat: ${seats} (Row: ${selectedSeat.rowNo}, Col: ${selectedSeat.colNo})`
    );

    // Reserve Seat
    console.log("Attempting reservation...");
    const reservePayload = {
      performId: CONFIG.PERFORM_ID,
      roundId: CONFIG.ROUND_ID,
      zoneId: CONFIG.ZONE_ID,
      screenLabel: CONFIG.ZONE_ID,
      seatTo: {
        seatType: "SEAT",
        seats: [seats],
      },
      shirtTo: [],
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

    console.log("Reservation Response:", reserveData);
    return true;
  } catch (error) {
    console.error(`[${timestamp}] Error: ${error.message}`);
    return false;
  }
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
          resolve(json.data.event_id);
        } else {
          reject(new Error("event_id not found in response"));
        }
      } catch (e) {
        reject(e);
      }
    });
  });
}

async function main() {
  console.log("Starting Ticket Automation (Curl Mode) - Press Ctrl+C to stop");

  try {
    console.log("Fetching dynamic Event ID...");
    const eventId = await fetchEventInfo();
    console.log(`Fetched Event ID: ${eventId}`);
    CONFIG.PERFORM_ID = eventId;
  } catch (err) {
    console.error(
      "Could not fetch Event ID, using fallback/hardcoded:",
      CONFIG.PERFORM_ID
    );
    // We can continue with the hardcoded one if fetch fails, or exit.
    // User asked to 'use' it, so ideally we insist. But fallback is safer.
  }

  console.log(
    `Target: Event ${CONFIG.PERFORM_ID} | Zone ${CONFIG.ZONE_ID} | ReserveZone ${CONFIG.RESERVE_ZONE_ID}`
  );

  while (true) {
    const success = await checkAndReserve();
    if (success) {
      console.log("Exiting automation loop (Success).");
      break;
    }

    // Polling interval
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
}

main();
