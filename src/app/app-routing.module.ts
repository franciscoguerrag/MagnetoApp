import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'dashboard/delivery', loadChildren: './dashboard/delivery/delivery.module#DeliveryModule' },
    { path: 'dashboard/receipts', loadChildren: './dashboard/receipts/receipts.module#ReceiptsModule' },
    { path: 'dashboard/inventory', loadChildren: './dashboard/inventory/inventory.module#InventoryModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
