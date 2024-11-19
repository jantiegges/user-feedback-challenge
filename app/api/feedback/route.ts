import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('Authentication error:', authError?.message);
      return NextResponse.json(
        { message: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    console.log('User:', user);
    console.log('Body:', await request.json());

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
