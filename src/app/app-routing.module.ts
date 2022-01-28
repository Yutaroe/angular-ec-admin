import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProductComponent } from './add-product/add-product.component';
import { AddToppingComponent } from './add-topping/add-topping.component';
import { BuyUserComponent } from './buy-user/buy-user.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from './guard/auth.guard';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { ToppinglistComponent } from './toppinglist/toppinglist.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddProductComponent, canActivate: [AuthGuard] },
  {
    path: 'addtopping',
    component: AddToppingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'toppinglist',
    component: ToppinglistComponent,
    canActivate: [AuthGuard],
  },
  { path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard] },
  { path: 'buyuser', component: BuyUserComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
