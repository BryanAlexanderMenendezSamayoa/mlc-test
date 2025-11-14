"use client";

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import type { Invoice } from '@/lib/data';
import InvoiceList from '@/components/invoice-list';
import ChatWindow from '@/components/chat-window'; // Import the new ChatWindow component
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

async function getInvoices(): Promise<Invoice[]> {
  try {
    const response = await fetch(
      'https://test-mlc-127465468754.us-central1.run.app/resultados',
      {
        cache: 'no-store', // Fetch fresh data on each request
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    // Return an empty array or handle the error as needed
    return [];
  }
}

export default function Home() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();


  useEffect(() => {
    const fetchInvoices = async () => {
      const allInvoices = await getInvoices();
      setInvoices(allInvoices);
    };

    fetchInvoices(); // Fetch initially

    const intervalId = setInterval(fetchInvoices, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleUpdate = () => {
    // Fire and forget the request
    fetch('https://test-mlc-127465468754.us-central1.run.app/').catch((error) => {
      // We can log the error, but we won't bother the user with a destructive toast
      // since the main functionality (viewing invoices) is still working.
      console.error('Error al iniciar la actualización:', error);
    });

    // Immediately notify the user
    toast({
      title: 'Actualización en proceso',
      description: 'Se ha solicitado una nueva extracción de facturas. Los resultados aparecerán aquí en breve.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="h-6 w-6 text-primary"
            >
              <rect width="256" height="256" fill="none" />
              <path
                d="M56,120H88a0,0,0,0,1,0,0v72a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V120A0,0,0,0,1,56,120Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <path
                d="M112,88h32a0,0,0,0,1,0,0v104a8,8,0,0,1-8,8h-16a8,8,0,0,1-8-8V88a0,0,0,0,1,0,0Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <path
                d="M168,56h32a0,0,0,0,1,0,0v136a8,8,0,0,1-8,8h-16a8,8,0,0,1-8-8V56a0,0,0,0,1,0,0Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
            <span className="font-bold text-foreground">Resumen de Facturas</span>
          </div>
          <Button onClick={handleUpdate} disabled={isUpdating}>
            <RefreshCw className={cn('mr-2 h-4 w-4', isUpdating && 'animate-spin')} />
            Actualizar
          </Button>
        </div>
      </header>
      <div className="container mx-auto flex flex-col lg:flex-row lg:gap-8">
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mb-8 space-y-2">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Bienvenido de Nuevo
            </h1>
            <p className="text-muted-foreground">
              Aquí hay un resumen de sus facturas recientes.
            </p>
          </div>
          <InvoiceList invoices={invoices} />
        </main>
        <aside className="w-full lg:w-[400px] lg:border-l lg:p-8">
          <ChatWindow />
        </aside>
      </div>
    </div>
  );
}
