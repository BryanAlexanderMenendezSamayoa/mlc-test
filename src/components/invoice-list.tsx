import type { Invoice } from '@/lib/data';
import InvoiceCard from '@/components/invoice-card';

type InvoiceListProps = {
  invoices: Invoice[];
};

export default function InvoiceList({ invoices }: InvoiceListProps) {
  const needsReviewInvoices = invoices.filter(
    (invoice) => invoice.status === 'Not Validated'
  );
  const validatedInvoices = invoices.filter(
    (invoice) => invoice.status === 'Validated'
  );

  return (
    <div className="space-y-12">
      <section>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
          Action Required
        </h2>
        {needsReviewInvoices.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {needsReviewInvoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No invoices require your attention.
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
          Validated
        </h2>
        {validatedInvoices.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {validatedInvoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No validated invoices found.</p>
        )}
      </section>
    </div>
  );
}
