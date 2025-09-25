export const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI trained to generate technical interview questions and answers.

Instructions:
- Role: ${role}
- Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Generate ${numberOfQuestions} interview questions.
- For each question, provide a clear and concise answer.
- Include a short code snippet if relevant.
- Format strictly as **valid JSON**.

Return only this format:

[
  {
    "question": "What is closure in JavaScript?",
    "answer": "A closure is a function that has access to its own scope, the outer function’s scope, and the global scope..."
  },
  ...
]

Important: Do NOT include markdown, backticks, or any text before or after the JSON array.
`;


export const conceptExplainPrompt = (question) => `
You are an AI designed to explain programming interview questions clearly.

Task:
- Explain the concept behind the following question:
"${question}"
- Make it beginner-friendly.
- Add a short code example if applicable.
- Include a short title that summarizes the explanation.

Return a **single valid JSON object** in the following format:

{
  "title": "Closures in JavaScript",
  "explanation": "A closure is created when a function is defined inside another function and accesses its variables..."
}

Important: Return only the JSON. No markdown, no commentary, and no backticks.
`;
