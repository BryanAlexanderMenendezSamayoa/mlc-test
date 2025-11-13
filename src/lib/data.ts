export type Invoice = {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  dueDate: string;
  status: 'Validada' | 'No Validada';
};

export const invoices: Invoice[] = [
  {
    id: 'INV-001',
    customerName: 'Acme Inc.',
    customerEmail: 'contact@acme.com',
    amount: 250.0,
    dueDate: '2024-08-01',
    status: 'Validada',
  },
  {
    id: 'INV-002',
    customerName: 'Stark Industries',
    customerEmail: 'tony@starkindustries.com',
    amount: 1500.5,
    dueDate: '2024-08-05',
    status: 'No Validada',
  },
  {
    id: 'INV-003',
    customerName: 'Wayne Enterprises',
    customerEmail: 'bruce@wayne.com',
    amount: 750.0,
    dueDate: '2024-07-25',
    status: 'Validada',
  },
  {
    id: 'INV-004',
    customerName: 'Ollivanders',
    customerEmail: 'sales@ollivanders.co.uk',
    amount: 89.99,
    dueDate: '2024-08-10',
    status: 'No Validada',
  },
  {
    id: 'INV-005',
    customerName: 'Cyberdyne Systems',
    customerEmail: 'info@cyberdyne.com',
    amount: 12000.0,
    dueDate: '2024-09-01',
    status: 'No Validada',
  },
  {
    id: 'INV-006',
    customerName: 'Gekko & Co',
    customerEmail: 'gordon@gekko.com',
    amount: 345.67,
    dueDate: '2024-07-30',
    status: 'Validada',
  },
];
