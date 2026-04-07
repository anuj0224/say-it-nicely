import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, tone, situation } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is not defined');
      return NextResponse.json({ error: 'API Configuration Error' }, { status: 500 });
    }

    const systemPrompt = `You are an expert in polite communication, especially in Indian social and cultural contexts.

Your job is to rewrite messages into polite, respectful, natural-sounding responses.

Rules:
- Detect input language automatically
- Reply in same language (Hindi or English)
- Handle Hinglish naturally
- Be respectful and culturally appropriate
- Avoid sounding robotic or overly formal
- Avoid generic phrases like "I hope this message finds you well"
- Keep response short (1–3 lines)
- Sound like a real human`;

    const userPrompt = `Rewrite this message in a ${tone} tone for ${situation}.

Rules:
- Keep it polite and respectful
- Avoid aggression or rudeness
- Keep it concise (1–3 lines)
- Match input language (Hindi/English/Hinglish)

Message:
"${message}"`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'Say It Nicely',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 250,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API Error:', errorData);
      return NextResponse.json({ error: 'Failed to generate response' }, { status: response.status });
    }

    const data = await response.json();
    const output = data.choices[0]?.message?.content?.trim() || '';

    return NextResponse.json({ output });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
