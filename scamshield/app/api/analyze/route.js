import OpenAI from "openai";

export async function POST(req) {
  const { text } = await req.json();

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `
You are an expert fraud analyst. Analyze the following message:

"${text}"

Return a JSON with:
- riskScore (0-100)
- riskLabel (clear_scam, likely_scam, uncertain, likely_legit)
- scamType (rental, romance, crypto, phishing, job_offer, money_exchange, other)
- reasons: array of short bullet points
- recommendation: short actionable advice for the victim
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  let output;

  try {
    output = JSON.parse(completion.choices[0].message.content);
  } catch {
    output = {
      riskScore: 50,
      riskLabel: "uncertain",
      scamType: "other",
      reasons: ["AI response could not be parsed"],
      recommendation: "Try again with more text.",
    };
  }

  return new Response(JSON.stringify(output), {
    headers: { "Content-Type": "application/json" },
  });
}
