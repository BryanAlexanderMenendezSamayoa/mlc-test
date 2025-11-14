"use client";

import { useState, useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Send,
} from 'lucide-react';
import type { Invoice } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast"


type InvoiceCardProps = {
  invoice: Invoice;
};

const statusConfig = {
  Validada: {
    label: 'Validada',
    icon: CheckCircle2,
    className:
      'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
  },
  'No validada': {
    label: 'No Validada',
    icon: AlertTriangle,
    className:
      'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
  },
};

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
  const { toast } = useToast();
  const [formattedDate, setFormattedDate] = useState('');

  const { factura_data, status, file_name } = invoice;
  const {
    'Número de factura': invoiceId,
    Proveedor: customerName,
    'Monto total': amountStr,
    Fecha: dueDate,
  } = factura_data;

  const amount = amountStr ? parseFloat(amountStr) : null;


  useEffect(() => {
    if (dueDate) {
      // Client-side only date formatting
      setFormattedDate(
        new Date(dueDate).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );
    }
  }, [dueDate]);

  const currentStatus = statusConfig[status];
  const Icon = currentStatus.icon;

  const handleSendToReview = () => {
    toast({
      title: "Enviado para Revisión",
      description: `La factura ${invoiceId} ha sido enviada para revisión.`,
    })
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold">{invoiceId || 'N/A'}</CardTitle>
          {currentStatus && (
            <div
              className={cn(
                'inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                currentStatus.className
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{currentStatus.label}</span>
            </div>
          )}
        </div>
        <CardDescription>{customerName}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Monto</p>
          {amount !== null ? (
            <p className="text-2xl font-semibold text-foreground">
              {factura_data.Moneda} {amount.toFixed(2)}
            </p>
          ) : (
            <p className="text-2xl font-semibold text-red-500">Campo faltante</p>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Fecha</p>
          <p className="font-medium text-foreground">
            {formattedDate || 'N/A'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Comentarios</p>
          <p className="text-sm text-muted-foreground">{invoice.comentarios}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2 bg-muted/50 p-4">
        {status === 'No validada' && (
          <>
            <Button onClick={handleSendToReview} variant="secondary">
              <Send className="mr-2 h-4 w-4" />
              Enviar a Revisión
            </Button>
          </>
        )}
        {status === 'Validada' && (
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Descargar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
