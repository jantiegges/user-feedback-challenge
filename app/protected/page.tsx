import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { FeedbackDialog } from '@/app/components/feedback-dialog';

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <FeedbackDialog />
      </div>
    </div>
  );
}
