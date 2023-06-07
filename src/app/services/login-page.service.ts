import { Injectable } from "@angular/core";
import { DocumentService } from "./document.service";
import { Data } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class LoginPageService {

    constructor(
        private ds: DocumentService
    ) {
    }

    async checkIfEmailExist(email: string) {
        let comparator = await this.ds.getByAttrr("/accounts", "email", email);
        if (comparator === undefined) {
            return true
        } else {
            return false
        }
    }

    async createNewAccountInDatabase(data: Data) {
        await this.ds.create('/accounts', data);
    }
}