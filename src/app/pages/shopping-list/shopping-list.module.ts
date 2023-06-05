import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { ShoppingListRoutingModule } from "./shopping-list.routing.module";
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from "@angular/material/snack-bar";


@NgModule({
    declarations: [ShoppingListComponent],
    imports: [
        CommonModule,
        ShoppingListRoutingModule,
        MatFormFieldModule,
        MatCardModule,
        MatDividerModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatButtonModule,
    ]
})
export class ShoppingListModule { }
