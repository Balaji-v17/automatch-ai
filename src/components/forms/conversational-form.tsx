'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CornerDownLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAiResponse } from '@/app/actions';
import {
  type ExtractPreferencesOutput,
} from '@/ai/flows/extract-preferences';
import { UserPreferences } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function ConversationalForm() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAiResponse(newMessages);

      if (aiResponse.error) {
        setMessages([
          ...newMessages,
          { role: 'model', content: aiResponse.error },
        ]);
        setIsLoading(false);
      } else if (aiResponse.preferences) {
        // AI is confident, redirect to recommendations
        const params = new URLSearchParams();
        const prefs = aiResponse.preferences as UserPreferences;
        params.set('budget', prefs.budget.join(','));
        params.set('vehicleTypes', prefs.vehicleTypes.join(','));
        params.set('usage', prefs.usage);
        params.set('fuelTypes', prefs.fuelTypes.join(','));
        params.set('priority', prefs.priority);
        params.set('maintenance', prefs.maintenance);
        router.push(`/recommendations?${params.toString()}`);
        // No need to set loading to false, as we are navigating away
      } else if (aiResponse.clarification) {
        // AI needs more info
        setMessages([
          ...newMessages,
          { role: 'model', content: aiResponse.clarification },
        ]);
        setIsLoading(false);
      } else {
        // Fallback
        setMessages([
          ...newMessages,
          {
            role: 'model',
            content:
              "I'm having a little trouble understanding. Could you be more specific, or try using the form below?",
          },
        ]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        {
          role: 'model',
          content:
            'Sorry, something went wrong. Please try again or use the detailed form.',
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 rounded-lg border bg-card p-4 min-h-[6rem]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              message.role === 'user' ? 'justify-end' : ''
            }`}
          >
            {message.role === 'model' && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                    <Icons.logo className="h-5 w-5 text-primary" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 text-sm ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarFallback>
                        <Icons.logo className="h-5 w-5 text-primary" />
                    </AvatarFallback>
                </Avatar>
                <div className="max-w-[80%] rounded-lg p-3 text-sm bg-muted flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                </div>
            </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., I want a family car under 10 lakhs for city use"
          className="pr-16"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CornerDownLeft className="h-4 w-4" />
          )}
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
