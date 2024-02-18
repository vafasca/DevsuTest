//interface en angular para estos datos: identificacion
//nombre y edad.
export interface Product{
    id:string;
    name:string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
    showDropdown?: boolean;
}