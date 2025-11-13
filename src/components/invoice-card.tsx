"use client";

import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Lightbulb,
  Loader2,
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
import { getAINotification } from '@/app/actions';
import { useToast } from "@/hooks/use-toast"


type InvoiceCardProps = {
  invoice: Invoice;
};

const statusConfig = {
  Validated: {
    label: 'Validated',
    icon: CheckCircle2,
    className:
      'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
  },
  'Not Validated': {
    label: 'Not Validated',
    icon: AlertTriangle,
    className:
      'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
  },
};

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
  const { toast } = useToast();
  const [notification, setNotification] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentStatus = statusConfig[invoice.status];
  const Icon = currentStatus.icon;

  const handleSendToReview = () => {
    toast({
      title: "Sent for Review",
      description: `Invoice ${invoice.id} has been sent for review.`,
    })
  };

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setNotification(null);
    try {
      const invoiceDetails = `Invoice ID: ${invoice.id}, Customer: ${invoice.customerName}, Amount: $${invoice.amount}, Due: ${invoice.dueDate}`;
      const result = await getAINotification({
        invoiceStatus: 'not validated',
        invoiceDetails,
      });
      setNotification(result.notification);
    } catch (error) {
      console.error('Failed to get AI notification:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get AI suggestion. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold">{invoice.id}</CardTitle>
          <div
            className={cn(
              'inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
              currentStatus.className
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{currentStatus.label}</span>
          </div>
        </div>
        <CardDescription>{invoice.customerName}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Amount</p>
          <p className="text-2xl font-semibold text-foreground">
            ${invoice.amount.toFixed(2)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Due Date</p>
          <p className="font-medium text-foreground">
            {new Date(invoice.dueDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        {notification && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-900/50 dark:bg-blue-900/30 dark:text-blue-200">
            <Lightbulb className="h-5 w-5 flex-shrink-0" />
            <p>{notification}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2 bg-muted/50 p-4">
        {invoice.status === 'Not Validated' && (
          <>
            <Button onClick={handleSendToReview} variant="secondary">
              <Send className="mr-2 h-4 w-4" />
              Send to Review
            </Button>
            <Button onClick={handleGetSuggestion} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="mr-2 h-4 w-4" />
              )}
              AI Suggestion
            </Button>
          </>
        )}
        {invoice.status === 'Validated' && (
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
