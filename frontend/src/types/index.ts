import type { IncomingMessage } from "http";

export interface IProduct {
  id: number;
  nombre: string;
  id_categoria: number;
  nombre_categoria: string;
  descripcion: string;
  col1: string | null;
  col2: string | null;
  col3: string | null;
  col4: string | null;
  col5: string | null;
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
  id?: number | null;
  id_category: number;
  name: string;
  description: string;
  col1?: string | null;
  active: number // boolean (1, 0)
  featured: number // boolean (1, 0)
}

export interface IEditProduct extends Partial<ICreateProduct> {
  id: number;
}

export interface IUserLog {
  readonly id: number;
  username: string;
  rol: string;
  is_admin: number; // boolean (1, 0)
}

export interface InitialState {
  user: IUserLog | null;
}

export interface AppContextProps {
  state?: InitialState;
  setUser?: (user: any) => void;
}

export type IncomingMessageWithCookies = IncomingMessage & { cookies: Partial<{ [key: string]: string }> }