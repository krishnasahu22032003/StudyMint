import ENV_SECRETS from "../lib/ENV_SECRETS.js";

export const generateGeminiResponse = async (prompt: string) => {
  const apiKey = ENV_SECRETS.GEMINI_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_KEY is missing");
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Gemini API Error ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No text returned from Gemini");
    }

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleanText);
    } catch {
      console.error("Invalid JSON:", cleanText);
      throw new Error("Gemini returned invalid JSON");
    }
  } catch (error: any) {
    console.error("Gemini Fetch Error:", error.message);
    throw error;
  }
};