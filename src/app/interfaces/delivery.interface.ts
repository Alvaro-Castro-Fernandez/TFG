export interface DeliveryInterface{
    productData:{
        productName:string,
        productId:string,
        quantity:number,
    },
    from:string,
    to:string,
    dateOfDelivery:{
        date:string,
        hour:string,
    },
    packageLocator:string,
}