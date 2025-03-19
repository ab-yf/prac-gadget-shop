import {Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
	selector: 'app-inventory',
	imports: [FormsModule],
	templateUrl: './inventory.component.html',
	styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  httpClient = inject(HttpClient);

	inventoryData = {
		productId: '',
		productName: '',
		availableQty: 0,
		reorderPoint: 0,
	};

	onSubmit(): void {
    const apiUrl = "https://localhost:7107/api/Inventory";
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      })
    }
    this.httpClient.post(apiUrl, this.inventoryData, httpOptions).subscribe({
      next: data => console.log(data),
      error : error => console.log('There was an error!', error),
      complete: () => {
          alert('You submitted the form!' + JSON.stringify(this.inventoryData));
        }
    });
	}
}
