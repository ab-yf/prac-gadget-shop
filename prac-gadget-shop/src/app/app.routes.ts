import { Routes } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';
import { CustomerComponent } from './components/customer/customer.component';

export const routes: Routes = [
    { path: 'inventory', component: InventoryComponent },
    { path: 'customer', component: CustomerComponent },
];
