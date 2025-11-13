'use server';

/**
 * @fileOverview An AI agent that monitors invoice statuses and suggests important upcoming actions.
 *
 * - getInvoiceNotifications - A function that generates dynamic notifications based on invoice statuses.
 * - InvoiceNotificationsInput - The input type for the getInvoiceNotifications function.
 * - InvoiceNotificationsOutput - The return type for the getInvoiceNotifications function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvoiceNotificationsInputSchema = z.object({
  invoiceStatus: z
    .string()
    .describe(
      'The validation status of the invoice. Can be \'validated\' or \'not validated\'.'    ),
  invoiceDetails: z.string().describe('Additional details about the invoice.'),
});
export type InvoiceNotificationsInput = z.infer<typeof InvoiceNotificationsInputSchema>;

const InvoiceNotificationsOutputSchema = z.object({
  notification: z.string().describe('A dynamic notification suggesting an upcoming action.'),
});
export type InvoiceNotificationsOutput = z.infer<typeof InvoiceNotificationsOutputSchema>;

export async function getInvoiceNotifications(
  input: InvoiceNotificationsInput
): Promise<InvoiceNotificationsOutput> {
  return invoiceActionNotificationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'invoiceActionNotificationsPrompt',
  input: {schema: InvoiceNotificationsInputSchema},
  output: {schema: InvoiceNotificationsOutputSchema},
  prompt: `You are an AI assistant that monitors invoice statuses and suggests important upcoming actions.

  Based on the invoice status and details, generate a dynamic notification suggesting the next action.

  Invoice Status: {{{invoiceStatus}}}
  Invoice Details: {{{invoiceDetails}}}

  Notification: `,
});

const invoiceActionNotificationsFlow = ai.defineFlow(
  {
    name: 'invoiceActionNotificationsFlow',
    inputSchema: InvoiceNotificationsInputSchema,
    outputSchema: InvoiceNotificationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
