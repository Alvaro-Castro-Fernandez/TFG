export interface EmployeeInterface {
    firstName:string,
    secondName:string,
    isSupervisor:boolean,
    publishedItems:[{
        itemId:string,
        itemValue:string,
        itemonSale:boolean,
    }],
    bornDate:string,
    dni:string,
    email:string,
    team:number |undefined,
    supervisor:string | null,
}