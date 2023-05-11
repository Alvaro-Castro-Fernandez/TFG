import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardItemComponent } from './card-item.component';

const routes: Routes = [{ path: '', component: CardItemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardItemRoutingModule { }
