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

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const typePrompts = {
  functional: "Functional test cases including Unit, Integration, Regression, UAT",
  nonfunctional: "Non-functional test cases including Performance, Load, Stress, Security, Usability, Accessibility",
  behavioral: "Behavioral test cases including Positive, Negative, Destructive",
  specialized: "Specialized test cases including Database, UI, Compatibility",
  all: "All types: Functional, Non-functional, Behavioral, Specialized",
};

export async function POST(req) {
  try {
    const { criteria, type } = await req.json();

    const prompt = `
You are a QA Lead.

Generate ${typePrompts[type]}.

STRICT RULES:
- Return ONLY JSON
- No explanation

Format:

[
  {
    "title": "",
    "steps": "",
    "expected": ""
  }
]

Acceptance Criteria:
${criteria}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    let text = response.choices[0].message.content;
    text = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text);

    return new Response(JSON.stringify(parsed), { status: 200 });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}