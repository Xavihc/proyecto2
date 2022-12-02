

export  interface Producto {
    nombre: string;
    precioNormal: number;
    precioReducido: number;
    foto: string;
    id: string;
    fecha: Date;
}

export interface Cliente {
    uid: string;
    email: string;
    nombre: string;
    segundoNombre: string;
    apellido: string
    segundoApellido: string
    celular: string;
    foto: string;
    referencia: string;
    referenciaDos: string;
    ubicacion: any;
    
}