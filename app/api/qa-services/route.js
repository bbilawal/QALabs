// import { generatePlaywrightTests } from "../../ai-bot/qa-generator.js";

// import { generateExcelTestCases } from "../../ai-bot/qa-generator.js";

// import generator from "@/ai-bot/qa-generator.js";
// import { generateStructuredTestCases } from "../../ai-bot/qa-generator.js";

// const { generateStructuredTestCases } = generator;

// import { generateAITestCases } from "../../ai-bot/aiGenerator.js";

// export async function POST(req) {
//   try {
//     const { criteria } = await req.json();

//     const aiResult = await generateAITestCases(criteria);

//     return new Response(JSON.stringify({ result: aiResult }), {
//       status: 200,
//     });
//   } catch (err) {
//     return new Response(
//       JSON.stringify({ error: err.message }),
//       { status: 500 }
//     );
//   }
// }
import OpenAI from "openai";

export async function POST(req) {
  try {
    // ✅ Validate API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("Missing OPENAI_API_KEY");
      return Response.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { criteria, type } = await req.json();

    const typePrompts = {
      functional: "Functional test cases including Unit, Integration, Regression, UAT",
      nonfunctional: "Non-functional test cases including Performance, Load, Stress, Security, Usability, Accessibility",
      behavioral: "Behavioral test cases including Positive, Negative, Destructive",
      specialized: "Specialized test cases including Database, UI, Compatibility",
      all: "All types: Functional, Non-functional, Behavioral, Specialized",
    };

    const prompt = `
Generate ${typePrompts[type]} test cases.

Return ONLY valid JSON array:
[
  {
    "title": "",
    "steps": "",
    "expected": ""
  }
]

Criteria:
${criteria}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    let text = response.choices[0].message.content;

    console.log("RAW AI RESPONSE:", text);

    // ✅ Clean response safely
    text = text.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON PARSE ERROR:", parseError);
      
      // fallback response (IMPORTANT)
      return Response.json([
        {
          title: "Fallback Test Case",
          steps: "Step 1, Step 2",
          expected: "Expected result",
        },
      ]);
    }

    return Response.json(parsed);

  } catch (err) {
    console.error("API ERROR:", err);

    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}