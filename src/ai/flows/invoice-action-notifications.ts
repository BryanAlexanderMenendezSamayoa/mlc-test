'use server';

/**
 * @fileOverview Un agente de IA que monitorea los estados de las facturas y sugiere acciones importantes a seguir.
 *
 * - getInvoiceNotifications - Una función que genera notificaciones dinámicas basadas en los estados de las facturas.
 * - InvoiceNotificationsInput - El tipo de entrada para la función getInvoiceNotifications.
 * - InvoiceNotificationsOutput - El tipo de retorno para la función getInvoiceNotifications.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvoiceNotificationsInputSchema = z.object({
  invoiceStatus: z
    .string()
    .describe(
      'El estado de validación de la factura. Puede ser \'validada\' o \'no validada\'.'
    ),
  invoiceDetails: z.string().describe('Detalles adicionales sobre la factura.'),
});
export type InvoiceNotificationsInput = z.infer<typeof InvoiceNotificationsInputSchema>;

const InvoiceNotificationsOutputSchema = z.object({
  notification: z.string().describe('Una notificación dinámica que sugiere una próxima acción.'),
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
  prompt: `Eres un asistente de IA que monitorea los estados de las facturas y sugiere acciones importantes a seguir.

  Basado en el estado y los detalles de la factura, genera una notificación dinámica que sugiera la siguiente acción.

  Estado de la Factura: {{{invoiceStatus}}}
  Detalles de la Factura: {{{invoiceDetails}}}

  Notificación: `,
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
