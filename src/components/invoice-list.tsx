import type { Invoice } from '@/lib/data';
import InvoiceCard from '@/components/invoice-card';

type InvoiceListProps = {
  invoices: Invoice[];
};

export default function InvoiceList({ invoices }: InvoiceListProps) {
  const needsReviewInvoices = invoices.filter(
    (invoice) => invoice.status === 'No validada'
  );
  const validatedInvoices = invoices.filter(
    (invoice) => invoice.status === 'Validada'
  );

  return (
    <div className="space-y-12">
      <section>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
          Acción Requerida
        </h2>
        {needsReviewInvoices.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {needsReviewInvoices.map((invoice) => (
              <InvoiceCard key={invoice.file_id} invoice={invoice} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Ninguna factura requiere su atención.
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
          Validadas
        </h2>
        {validatedInvoices.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {validatedInvoices.map((invoice) => (
              <InvoiceCard key={invoice.file_id} invoice={invoice} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No se encontraron facturas validadas.</p>
        )}
      </section>
    </div>
  );
}
