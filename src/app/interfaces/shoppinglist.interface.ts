export interface ShoppingListInterface {
    id: string,
    products: [
        {
            name: string,
            ammount: number,
            productId: string,
            size: string,
            totalPrice: number
        }
    ]
}