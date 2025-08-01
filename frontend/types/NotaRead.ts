export interface NotaRead {
  id: number;
  titulo: string;
  contenido: string;
  archivada: boolean;
  fechaCreacion: string;
  fechaModificacion?: string | null;
}