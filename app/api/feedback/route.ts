import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createClient } from "@/utils/supabase/server";
import OpenAI from 'openai';
import console from 'console';

// Schema for feedback validation
const feedbackSchema = z.object({
  feedback: z.string().min(1, 'Feedback cannot be empty'),
});

// Schema for LLM classification
const classificationSchema = z.object({
  title: z.string(),
  category: z.enum([
    'bug',
    'feature_request',
    'improvement',
    'question',
  ]),
  priority: z.enum(['low', 'medium', 'high']),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    // Parse and validate the feedback
    const body = feedbackSchema.parse(await request.json());

    console.log(body);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Failed to process feedback' },
      { status: 500 }
    );
  }
}
