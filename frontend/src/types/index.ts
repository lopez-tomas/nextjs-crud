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

export interface ICategory {
  id: number;
  categoria: string;
  activo: number; // boolean (1, 0)
}

export interface ICreateProduct {
  id?: number;
  id_category: number;
  name: string;
  description: string;
  col1: string;
  active: number // boolean (1, 0)
  featured: number // boolean (1, 0)
}