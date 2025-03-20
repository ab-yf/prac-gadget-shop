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

  // Object holding the form data.
	inventoryData = {
		productId: '',
		productName: '',
		availableQty: 0,
		reorderPoint: 0,
	};

  inventoryDetails: any;

  ngOnInit(){
    const apiUrl = "https://localhost:7107/api/Inventory";
    // Fetching database entries on initialization of the component.
    // We do not need HTTP Headers or the Body for fetching (GET).
    this.httpClient.get(apiUrl).subscribe(data =>{
      // Mapping the fetched data to the inventoryDetails as an object.
      this.inventoryDetails = data;
      console.log(this.inventoryDetails);
    });
  }

  // Called when form is submitted.
	onSubmit(): void {
    // URL to which the form data will be POSTed.
    const apiUrl = "https://localhost:7107/api/Inventory";
    // Contains HTTP Headers, including the Authorization token and content type.
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      })
    }
    // This method sends a POST request to the API with the form data and HTTP Options.
    // Subscribe handles the response from the API.
    this.httpClient.post(apiUrl, this.inventoryData, httpOptions).subscribe({
      next: data => console.log(data),
      error : error => console.log('There was an error!', error),
      complete: () => {
          alert('You submitted the form!' + JSON.stringify(this.inventoryData));
        }
    });
	}
}
