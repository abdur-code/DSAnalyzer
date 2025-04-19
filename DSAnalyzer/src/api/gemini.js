import axios from 'axios';

const API_KEY = 'AIzaSyBWLPAqPzKLii-M8298fOQRM3vNoSNILq0'; // Replace with your actual API key
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/**
 * Evaluates code based on a problem description using the Gemini API.
 *
 * @param {string} code The code to evaluate.
 * @param {string} problemDescription The description of the problem the code is intended to solve.
 * @returns {Promise<object>} A promise that resolves with the evaluation result as a JSON object,
 * or rejects with an error.
 *
 * @throws {Error} If the API request fails, or if the response is not in the expected format.
 */
export const evaluateCode = async (code, problemDescription) => {
  try {
    // Construct the request payload according to the Gemini API documentation.
    const payload = {
      contents: [{
        role: 'user',
        parts: [{
          text: `Problem Description: ${problemDescription || 'No problem description provided'}

Code to evaluate:
\`\`\`
${code}
\`\`\`

Please evaluate this code based on the problem description and rate it out of 10 on the following parameters:
1. Time Complexity Analysis
2. Space Complexity Analysis
3. Edge Case Handling
4. Code Structure
5. Variable Naming
6. Readability
7. Algorithm Choice
8. Problem Understanding (how well the code addresses the problem description)

For each parameter, provide a score out of 10 and a brief explanation.
Then provide an overall score out of 10.
Format your response as JSON with the following structure:
{
  "timeComplexity": {"score": 0, "explanation": ""},
  "spaceComplexity": {"score": 0, "explanation": ""},
  "edgeCases": {"score": 0, "explanation": ""},
  "codeStructure": {"score": 0, "explanation": ""},
  "variableNaming": {"score": 0, "explanation": ""},
  "readability": {"score": 0, "explanation": ""},
  "algorithmChoice": {"score": 0, "explanation": ""},
  "problemUnderstanding": {"score": 0, "explanation": ""},
  "overallScore": 0,
  "summary": "",
  "suggestedImprovements": {
    "code": "",
    "explanation": ""
  }
}

After providing the evaluation, suggest an improved version of the code that better addresses the problem description, with explanations for the improvements made.
The suggested code should be included in the "code" field of "suggestedImprovements" and the explanation in the "explanation" field.`
        }]
      }],
      generationConfig: {
        temperature: 0.2, // Lower temperature for more deterministic output
        maxOutputTokens: 2048, // Ensure enough tokens for a detailed response
      },
    };

    // Make the POST request to the Gemini API.
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Check for a successful HTTP status code (2xx range).
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Gemini API request failed with status: ${response.status}`);
    }

    // Extract the response data.  The API response is documented here:
    // https://ai.google.dev/reference/rest/v1/models/generateContent#response-body
    const responseData = response.data;

    // Check if candidates array exists and has at least one element.
    if (!responseData.candidates || responseData.candidates.length === 0) {
      throw new Error('Gemini API returned an empty candidates array.');
    }

    const firstCandidate = responseData.candidates[0];

    // Check if content exists in the first candidate
    if (!firstCandidate.content) {
      throw new Error("Gemini API response is missing the 'content' property in the first candidate.");
    }
    // Check if parts array exists in content
    if (!firstCandidate.content.parts || firstCandidate.content.parts.length === 0) {
      throw new Error("Gemini API response is missing the 'parts' array in the content.");
    }

    const responseText = firstCandidate.content.parts[0].text;

    // Clean the response text by removing markdown code block syntax
    const cleanedText = responseText
      .replace(/```json\n?/g, '') // Remove opening ```json
      .replace(/```\n?/g, '')     // Remove closing ```
      .trim();                    // Remove any extra whitespace

    // Attempt to parse the JSON response.
    try {
      const result = JSON.parse(cleanedText);
      return result;
    } catch (jsonError) {
      // If JSON parsing fails, provide a more informative error message.
      throw new Error(`Failed to parse JSON from Gemini API response: ${jsonError.message}.  Raw response text: ${cleanedText}`);
    }

  } catch (error) {
    // Improved error handling: Log the error and re-throw it for the caller to handle.
    console.error('Error evaluating code:', error);
    throw error;
  }
};
