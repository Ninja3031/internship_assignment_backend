import { OpenRouter } from "@openrouter/sdk";

export async function suggestPriority(title, description = "") {
  const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY 
  });

  const text = `${title} ${description}`.trim();

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const stream = await openrouter.chat.send({
        chatRequest: {
          model: "openai/gpt-oss-120b:free",
          messages: [
            {
              role: "system",
              content:
                `You are a strict JSON API. Return ONLY valid JSON. No explanation, no markdown.

Format:
{"priority":"high|medium|low","reasoning":"string"}

If unsure, return medium.`
            },
            {
              role: "user",
              content: `Task: ${text}`
            }
          ],
          stream: true
        },
        signal: controller.signal
      });

      clearTimeout(timeout);

      let response = "";

      for await (const chunk of stream) {
        if (chunk?.error) {
          console.error("OpenRouter Stream Error:", chunk.error);
          throw new Error(chunk.error.message || "Stream error");
        }
        const content = chunk?.choices?.[0]?.delta?.content;
        if (content) response += content;
      }

      if (!response.trim()) {
         console.error("OpenRouter returned an empty response. Stream may not be supported or model is failing.");
      }

      const cleanResponse = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      let result;
      try {
        const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
          throw new Error("No valid JSON found in response");
        }

        result = JSON.parse(jsonMatch[0]);
      } catch (err) {
        console.error("JSON parse failed:", cleanResponse);
        throw err;
      }

      return {
        priority: result?.priority ?? "medium",
        reasoning: result?.reasoning ?? "AI analyzed the task priority."
      };
    } catch (error) {
      if (attempt === 1) {
        console.error("OpenRouter API error:", error.message);

        return {
          priority: "medium",
          reasoning: "Fallback: AI service failed."
        };
      }
    }
  }
}