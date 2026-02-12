'use server';

import {
  extractPreferences,
  type ExtractPreferencesOutput,
  type ExtractPreferencesInput,
} from '@/ai/flows/extract-preferences';

type Message = {
    role: 'user' | 'model';
    content: string;
};

export async function getAiResponse(
  conversation: Message[]
): Promise<ExtractPreferencesOutput> {
  const latestUserQuery = conversation.findLast((m) => m.role === 'user');
  if (!latestUserQuery) {
    throw new Error('No user query found');
  }

  const input: ExtractPreferencesInput = {
    query: latestUserQuery.content,
    conversation: conversation.slice(0, -1),
  };

  const response = await extractPreferences(input);
  return response;
}
