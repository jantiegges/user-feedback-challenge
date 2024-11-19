'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const feedbackFormSchema = z.object({
  feedback: z
    .string()
    .min(10, 'Feedback must be at least 10 characters long')
    .max(1000, 'Feedback must not exceed 1000 characters'),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

export function FeedbackDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      feedback: '',
    },
  });

  async function onSubmit(data: FeedbackFormValues) {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      console.log('Feedback submitted');

      toast({
        title: 'Feedback submitted',
        description:
          "Thank you for your feedback! We'll look into it.",
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Give Feedback</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            Help us improve by sharing your thoughts, suggestions, or
            reporting issues.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? 'Submitting...'
                  : 'Submit Feedback'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
