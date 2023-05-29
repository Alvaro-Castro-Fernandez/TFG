export interface AccountInterface {
    firtsName: string,
    secondName: string,
    email: string,
    password: string,
    username: string,
    bankAccount: string,
    hasDeliveries: boolean,
    city: string,
    postalCode:number,
    district: string,
    isEmployee: boolean,
    adress: string,
    hasMessages: [{
        from: string,
        to: string,
        head: string,
        content: string,
        sendDate: string
    }],
}