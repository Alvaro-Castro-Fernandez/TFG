export interface ProductInterface
{
    name:string,
    categories:string[],
    price: number,
    onSale:boolean,
    discount:number | null,
    stock:number,
    description:string,
    clotheSize:string[] | undefined
    country:string[]
}