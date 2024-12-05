const { OpenAI } = require("openai");
//const { Configuration, OpenAIApi } = require("openai");

const openaiApi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

const chat = async (prompt, text) => {
try {  
const openai = new OpenAI(openaiApi);
const completion = await openai.chat.completions.create({
model: "gpt-4o-mini",
messages: [
{ role: "system", content: prompt },
{ role: "user", content: text },
],
});
return completion.data.choices[0].message;
} catch (err) {
console.error("Error al conectar con OpenAI:", err);
return "ERROR";
}
};
module.exports = chat;