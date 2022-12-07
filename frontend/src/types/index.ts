export interface IProduct {
  id: number;
  nombre: string;
  id_categoria: number;
  nombre_categoria: string;
  descripcion: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  cantidad: number;
  activo: number; // boolean (1, 0)
  destacado: number; // boolean (1, 0)
}