

import OpenAI from "openai";


const client =  new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  
});

export async function generateAITestCases(criteria) {
  const prompt = `
You are a senior QA Lead.

Generate detailed test cases from this acceptance criteria.

Include:
- Functional test cases
- Edge cases
- Negative scenarios
- Data variations
- UI validations

Format in JSON with:
title, steps, expectedResult

Criteria:
${criteria}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  return response.choices[0].message.content;
}