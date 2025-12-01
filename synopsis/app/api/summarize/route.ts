import { NextRequest, NextResponse } from 'next/server';

// Get Python API URL from environment variable
// In production (Vercel), set this to your deployed Python backend URL
// In local development, it defaults to localhost:8000
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { text, summary_style } = body;

        if (!text || !summary_style) {
            return NextResponse.json(
                { error: 'Missing required fields: text and summary_style' },
                { status: 400 }
            );
        }

        // Forward request to Python backend
        const response = await fetch(`${PYTHON_API_URL}/summarize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                summary_style,
            }),
            // Add timeout for production
            signal: AbortSignal.timeout(30000), // 30 second timeout
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.detail || 'Failed to generate summary' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Error:', error);

        // More specific error messages
        if (error instanceof Error && error.name === 'AbortError') {
            return NextResponse.json(
                { error: 'Request timeout. The summarization is taking too long.' },
                { status: 504 }
            );
        }

        return NextResponse.json(
            { error: 'Cannot connect to summarization service. Please try again later.' },
            { status: 503 }
        );
    }
}
