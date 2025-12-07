import { NextRequest, NextResponse } from 'next/server';
import {GoogleGenerativeAI} from "@google/generative-ai";

type ge=typeof GoogleGenerativeAI;
let googleapikey:string="AIzaSyBI-MM02W1xAi2320K3X-232_L2wGrX4CU"
let  googleai = new GoogleGenerativeAI(googleapikey)
const googlemodel = googleai.getGenerativeModel({ model: "gemini-2.5-flash" });
 const medicalSystemPrompt = `You are a knowledgeable AI Medical Helper specializing in health, fitness, and wellness guidance. Your role is to:

1. **Provide General Health Information**: Share evidence-based health tips, exercise recommendations, and nutrition advice.

2. **Fitness Guidance**: Offer workout routines, exercise techniques, and fitness tips for different fitness levels.

3. **Nutritional Advice**: Provide general dietary recommendations, healthy eating tips, and nutritional information.

4. **Wellness Support**: Help with stress management, sleep hygiene, mental health tips, and lifestyle improvements.

5. **Safety First**: Always emphasize that your advice is general and not a substitute for professional medical care.

**Important Guidelines:**
- Always remind users to consult healthcare professionals for medical concerns
- Provide practical, actionable advice
- Be encouraging and supportive
- Focus on prevention and wellness
- Never diagnose medical conditions
- Never prescribe medications
- Always prioritize safety in exercise recommendations

**Response Style:**
- Be clear, concise, and encouraging
- Use bullet points for easy reading
- Include specific, actionable steps
- Provide motivation and support
- Always end with a reminder to consult healthcare professionals for serious concerns

Remember: You are a supportive health companion, not a replacement for medical professionals.`;
export async function POST(request: NextRequest) {
  try {
    const data = await request.json(); // Parse the JSON body
let {messages}=data;
    // Example: Process the data (e.g., save to a database)
    console.log('Received data: is essfge', messages);
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json("error", { status: 400 });
  }

    const lastMessage = "adhil";
    try {

      let gogleresponse= await googlemodel.generateContentStream({
        contents:messages,systemInstruction:medicalSystemPrompt

      })
let fullResponseText=""
      
      
      for await (const chunk of gogleresponse.stream) {
    // Each 'chunk' is a GenerateContentResponse object.
    // The actual text content is in the 'text' property.
    const chunkText = chunk.text(); 
    
    // Aggregate the text
    fullResponseText += chunkText;
    
    // In a manual streaming scenario, you would write this chunk to the response stream.
    // console.log("Chunk:", chunkText);
}

console.log(fullResponseText,"is fulesnn00000000000000000")
    // const response = await handleMedicalGroqRequest(messages);
    // // console.log(response,"response");
    // const aiResponse = {
    //   id: Date.now().toString(),
    //   role: 'assistant',
    //   content: response
    // };
    

       return NextResponse.json({ messages: [{
      
      role: 'model',
      parts:[{ "text": fullResponseText }]
    }
     ] }, { status: 201 }); // Return a 201 Created status
    
   
  } catch (error) {
    console.error('Error in medical chat API:', error);
  return  NextResponse.json({messages:[{error:error}]}, { status: 500 });
  }
    // In a real application, you would interact with your database or another service here.
    // For demonstration, we'll just return the received data.
    const newPost = { id: Date.now(), ...data };

  
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

async function handleMedicalGroqRequest(messages:any[]) {
    // console.log(messages,"messages");
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  
  if (!GROQ_API_KEY) {
    return "Groq API key not configured. Please set GROQ_API_KEY environment variable. Get your free API key at https://console.groq.com/";
  }
  
  // Create a specialized medical system prompt
 

  // Clean messages for Groq API (remove id fields and ensure proper format)
  const cleanMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));
console.log(cleanMessages,"cleanMessages");
  // Prepare messages with system prompt
  const systemMessage = {
    role: 'system',
    content: medicalSystemPrompt
  };

  // Add system message at the beginning
  const allMessages = [systemMessage, ...cleanMessages];

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: allMessages,
        temperature: 0.9,
        max_tokens: 1500
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error:Error | any) {
    return `Medical Helper Error: ${error.message}. Please check your Groq API key and try again.`;
  }
}
