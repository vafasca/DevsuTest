/**
 * Modelo de datos para un producto.
 */
export interface Product {
    /**
     * Identificador único del producto.
     */
    id: string;

    /**
     * Nombre del producto.
     */
    name: string;

    /**
     * Descripción del producto.
     */
    description: string;

    /**
     * URL del logo del producto.
     */
    logo: string;

    /**
     * Fecha de lanzamiento del producto.
     */
    date_release: Date;

    /**
     * Fecha de revisión del producto.
     */
    date_revision: Date;

    /**
     * Indicador para mostrar o no un menú desplegable.
     * @default false
     */
    showDropdown?: boolean;
}
