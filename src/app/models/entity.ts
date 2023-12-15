import { TaxpayerType } from "./taxpayer-type";
import { DocumentType } from "./document-type";

export class Entity {
  id!: number;
  direccion!: string;
  estado!: string;
  nombre_comercial!: string;
  nro_documento!: string;
  razon_social!: string;
  tipo_documento!: DocumentType;
  tipo_contribuyente!: TaxpayerType;
}
