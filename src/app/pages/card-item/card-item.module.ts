import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardItemRoutingModule } from './card-item-routing.module';
import { MatCardModule } from '@angular/material/card';
import { CardItemComponent } from './card-item.component';
<<<<<<< HEAD
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
=======
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
>>>>>>> 0523ac815a28041fc54a8f9715e409e4f91697f3





@NgModule({
  declarations: [CardItemComponent],
  imports: [
    CommonModule,
    CardItemRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatPaginatorModule,
<<<<<<< HEAD
    
=======
>>>>>>> 0523ac815a28041fc54a8f9715e409e4f91697f3
  ]
})
export class CardItemModule { }
