import OpenAI from "openai";

interface LlmGradingFeedback {
	content_accuracy: number;
	content_accuracy_feedback: string;
	completeness: number;
	completeness_feedback: string;
	organization: number;
	organization_feedback: string;
}

export class LlmService {
	private openai: OpenAI;
	private model = "gpt-4o-mini"; // matches Python
	private temperature = 1.75;

	constructor() {
		this.openai = new OpenAI({
			apiKey: "nunya biznas",
			baseURL: "https://api.openai.com/v1", // ← Use official OpenAI API endpoint
		});
	}
	async grade(
		question: string,
		answer: string,
	): Promise<{ percent_score: number; feedback: string }> {
		console.log("Asking LLM to Grade:", question, " Answer:", answer);

		// const openai = new OpenAI({
		// 	apiKey: "eric.farng@gmail.com",
		// 	baseURL: "https://interview-ai.stepful.com/v1",
		// });

		console.log("Calling LLM API");

		const instructions = `Please grade the question on three parts. 1: content accuracy, 2: Completeness and converage, 3: organization and clarity
        
        Part 1: Content Accuracy
Correct facts: The student must provide medically accurate information.
Use of proper terminology: Medical/scientific terms should be used correctly (e.g., "myocardium" vs. "heart muscle").


Part 2: Completeness / Coverage
Does the answer fully address all parts of the question?
For example:
Compact vs. spongy bone: Should mention structure, location, and function of both.
Blood flow path: Needs to include all chambers, valves, and major vessels in the right sequence.
Villi: Should include structure, location, and their role in nutrient absorption.


Part 3: Organization & Logic, Clarity & Conciseness
Information is presented in a logical order.
Answer flows in a way that mirrors real biological/physiological processes.
The explanation is clear, without vague or overly verbose descriptions.
No significant spelling or grammar issues that confuse meaning.

Please grade content accuracy out of 5 points and return some specific feedback
Please grade completeness and Coverage out of 3 points and return some specific feedback
please grade organization and clarity ouf of 2 points and return some specific feedback

please repond in JSON format like this
{"content_accuracy": 5, "content_accuracy_feedback": "This part was not accurate", 
"completeness": 3, "completeness_feedback": "You failed to mention this",
"organization": 2, "organization_feedback": "This part was unclear to me"}
`;

		const response = await this.openai.chat.completions.create({
			model: "gpt-4o-2024-08-06",
			messages: [
				{
					role: "system",
					content:
						"You are grading a medical exam. This is question is a free form text field. ",
				},
				{
					role: "user",
					content: `The question is \`\`\`${question}\`\`\` and the answer is \`\`\`${answer}\`\`\`.  ${instructions} `,
				},
			],
			temperature: 0.7,
		});

		console.log("Raw LLM response:", JSON.stringify(response, null, 4));

		// Extract content string
		const rawContent = response.choices[0]?.message?.content || "";

		// Remove triple backticks and optional `json` label
		const cleanedJson = rawContent
			.replace(/^```json\s*/i, "")
			.replace(/```$/, "")
			.trim();

		// Try parsing it
		let parsed: LlmGradingFeedback | null = null;

		try {
			parsed = JSON.parse(cleanedJson);
		} catch (err) {
			console.error("Failed to parse LLM JSON:", err);
		}

		console.log("JSON response:", JSON.stringify(parsed, null, 4));


        const points = (parsed?.content_accuracy ?? 0) + (parsed?.completeness ?? 0) + (parsed?.organization ?? 0);

        let feedback = "";
        if (parsed?.content_accuracy_feedback) feedback += `Accuracy: ${wrapText(parsed.content_accuracy_feedback)}\n\n`;
        if (parsed?.completeness_feedback) feedback += `Completeness: ${wrapText(parsed.completeness_feedback)}\n\n`;
        if (parsed?.organization_feedback) feedback += `Organization: ${wrapText(parsed.organization_feedback)}\n\n`;
        if (feedback.trim() === "") feedback = "No detailed feedback returned.";

		const grade = { percent_score: points/10, feedback: feedback };
		console.log("LLM Grade:", grade);

		return grade;
	}
}


function wrapText(text: string, lineLength = 40): string {
	return text.replace(
		new RegExp(`(.{1,${lineLength}})(\\s+|$)`, "g"),
		"$1\n"
	).trim();
}

/*
curl https://interview-ai.stepful.com/v1/chat/completions   -H "Content-Type: application/json"  -H "Authorization: Bearer eric.farng@gmail.com"  -d '{    "model": "gpt-4o-2024-08-06",    "messages": [      {        "role": "user",        "content": "Write me a short story about a cat."      }    ],    "temperature": 0.7  }'


$headers = @{
  "Content-Type" = "application/json"
  "Authorization" = "Bearer eric.farng@gmail.com"
}

$body = @{
  model = "gpt-4o-2024-08-06"
  messages = @(
    @{ role = "user"; content = "Write me a short story about a cat." }
  )
  temperature = 0.7
}
$response = Invoke-WebRequest -Uri "https://interview-ai.stepful.com/v1/chat/completions" `
  -Method POST `
  -Headers $headers `
  -Body ($body | ConvertTo-Json -Depth 3)

# Show the HTTP status and content
$response.StatusCode
$response.StatusDescription
$response.Content

*/

