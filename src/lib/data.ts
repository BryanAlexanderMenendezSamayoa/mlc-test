export type Invoice = {
  status: 'Validada' | 'No validada';
  file_id: string;
  file_name: string;
  comentarios: string;
  factura_data: {
    Fecha: string;
    Estado: string;
    Moneda: string;
    Impuestos: string;
    Proveedor: string;
    Comentario: string;
    'Monto total': string | null;
    'Nombre de factura': string;
    'Número de factura': string;
  };
  processed_at: string;
};
