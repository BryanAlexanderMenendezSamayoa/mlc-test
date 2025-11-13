import { invoices } from '@/lib/data';
import InvoiceList from '@/components/invoice-list';

export default async function Home() {
  // In a real application, you would fetch the invoices from an API endpoint.
  const allInvoices = invoices;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
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
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-8 space-y-2">
          <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Bienvenido de Nuevo
          </h1>
          <p className="text-muted-foreground">
            Aquí hay un resumen de sus facturas recientes.
          </p>
        </div>
        <InvoiceList invoices={allInvoices} />
      </main>
    </div>
  );
}
