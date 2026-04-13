import { runAITest } from "../../../ai-bot/index.js";

let crawlProgress = {};

// ▶ START TEST
export async function POST(req) {
  try {
    const { url, sessionId } = await req.json();

    if (!url || !sessionId) {
      throw new Error("URL and sessionId are required");
    }

    crawlProgress[sessionId] = {
      pages: [],
      progress: "Starting crawl...",
      result: {
        errors: [],
        testCases: [],
        screenshots: [],
      },
      status: "running",
    };

    const result = await runAITest(
      url,
      // progress callback
      (page) => {
        crawlProgress[sessionId].progress = `Crawled: ${page}`;
        crawlProgress[sessionId].pages.push(page);
      },
      // partial updates
      (partial) => {
        crawlProgress[sessionId].result = partial;
      }
    );

    if (crawlProgress[sessionId].status !== "stopped") {
      crawlProgress[sessionId].progress = "Crawl completed!";
      crawlProgress[sessionId].result = result;
      crawlProgress[sessionId].status = "completed";
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}

// ⏳ GET
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId || !crawlProgress[sessionId]) {
    return new Response(
      JSON.stringify({ progress: "", pages: [] }),
      { status: 200 }
    );
  }

  return new Response(
    JSON.stringify(crawlProgress[sessionId]),
    { status: 200 }
  );
}

// ⛔ STOP
export async function PUT(req) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId || !crawlProgress[sessionId]) {
      throw new Error("Invalid sessionId");
    }

    crawlProgress[sessionId].status = "stopped";
    crawlProgress[sessionId].progress = "⛔ Test stopped by user";

    return new Response(
      JSON.stringify({
        success: true,
        pages: crawlProgress[sessionId].pages,
        result: crawlProgress[sessionId].result,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}


// export const dynamic = "force-dynamic";
// export const maxDuration = 60;

// global.sessions = global.sessions || {};
// const sessions = global.sessions;

// export async function POST(req) {
//   const { url, sessionId } = await req.json();

//   sessions[sessionId] = {
//     status: "running",
//     pages: [],
//     result: null,
//     progress: "Starting test...",
//   };

//   // simulate AI testing
//   setTimeout(() => {
//     sessions[sessionId] = {
//       status: "completed",
//       progress: "Test completed",
//       pages: [url, url + "/about", url + "/contact"],
//       result: {
//         pages: [url],
//         errors: [
//           { page: url, defect: "Broken button" }
//         ],
//         testCases: [
//           { page: url, testCase: "Check homepage loads" }
//         ],
//       },
//     };
//   }, 4000);

//   return Response.json({ ok: true });
// }

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const sessionId = searchParams.get("sessionId");

//   const session = sessions[sessionId];

//   if (!session) {
//     return Response.json({ status: "not_found", pages: [] });
//   }

//   return Response.json(session);
// }

// export async function PUT(req) {
//   const { sessionId } = await req.json();

//   if (sessions[sessionId]) {
//     sessions[sessionId].status = "stopped";
//   }

//   return Response.json({ ok: true });
// }