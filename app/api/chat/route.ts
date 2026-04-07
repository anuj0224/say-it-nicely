import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { 
      message, 
      tone, 
      situation, 
      outputMode, 
      history = [] 
    } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API Configuration Error' }, { status: 500 });
    }

    const systemPrompt = `You are an expert in polite communication, especially in Indian social and cultural contexts.

Your job is to rewrite raw, rude, or emotional thoughts into polite, respectful, and natural-sounding responses.

Rules:
- Language Mode: ${outputMode || 'Auto'}
- If Mode is Auto: Detect input language automatically and reply in same (Hindi or English).
- If Mode is English: Respond in polite English.
- If Mode is Hinglish: Respond in friendly, natural Hinglish.
- Tone: ${tone || 'Polite'}
- Situation: ${situation || 'General'}
- Respect Indian cultural nuances (elders, indirect phrasing).
- Avoid robotic or corporate phrases (e.g., "I hope this finds you well").
- Keep response short (1–3 lines).
- Sound like a real person, not an AI.`;

    const userPromptTemplate = `Rewrite this message in a ${tone} tone for ${situation}. 
Output mode: ${outputMode}.

Message: "${message}"`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.map((m: any) => ({ role: m.role, content: m.content })),
      { role: 'user', content: userPromptTemplate }
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Say It Nicely AI Assistant',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 250,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API Error:', errorData);
      return NextResponse.json({ error: 'Failed to chat' }, { status: response.status });
    }

    const data = await response.json();
    const output = data.choices[0]?.message?.content?.trim() || '';

    return NextResponse.json({ output });
  } catch (error) {
    console.error('API Chat Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
