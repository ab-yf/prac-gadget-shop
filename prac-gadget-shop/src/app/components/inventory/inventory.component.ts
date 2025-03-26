import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
    selector: 'app-inventory',
    imports: [FormsModule, CommonModule],
    templateUrl: './inventory.component.html',
    styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit {
    httpClient = inject(HttpClient);
    // Variable to hold the ID of the product to be deleted.
    productIdToDelete: number = 0;
    // Variable to hold the value of the productId input field.
    disableProductIdInput = false;
    // Object holding the form data.
    inventoryData = {
        productId: '',
        productName: '',
        availableQty: 0,
        reorderPoint: 0,
    };
    inventoryDetails: any[] = []; // Initialize as an empty array
    private modalService = inject(NgbModal);

    ngOnInit() {
        this.fetchInventory();
    }

    fetchInventory() {
        const apiUrl = 'https://localhost:7107/api/Inventory';
        // Fetching database entries on initialization of the component.
        // We do not need HTTP Headers or the Body for fetching (GET).
        this.httpClient.get(apiUrl).subscribe((data) => {
            // Create a *new* array.  This is the key change.
            this.inventoryDetails = Array.isArray(data) ? [...data] : []; // Important check!
            console.log(this.inventoryDetails);
        });
    }

    // Called when form is submitted.
    onSubmit(): void {
        // URL to which the form data will be POSTed.
        const apiUrl = 'https://localhost:7107/api/Inventory';
        // Contains HTTP Headers, including the Authorization token and content type.
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }),
        };

        if (this.disableProductIdInput == true) {
            // If the productId input field is disabled, send a PUT request instead.
            // The URL will be the same as the POST request, but with the productId in the query string.
            const putUrl = `${apiUrl}?productId=${this.inventoryData.productId}`;
            // This method sends a PUT request to the API with the form data and HTTP Options.
            // Subscribe handles the response from the API.
            this.httpClient
                .put(putUrl, this.inventoryData, httpOptions)
                .subscribe({
                    next: (data) => console.log(data),
                    error: (error) => console.log('There was an error!', error),
                    complete: () => {
                        alert(
                            'You submitted the form!' +
                                JSON.stringify(this.inventoryData),
                        );
                        // Fetch the updated inventory *after* the PUT is complete.
                        this.fetchInventory();
                        // Clear the form (optional, but good practice)
                        this.inventoryData = {
                            productId: '',
                            productName: '',
                            availableQty: 0,
                            reorderPoint: 0,
                        };
                        // Re-enable the productId input field after the PUT is complete.
                        this.disableProductIdInput = false;
                    },
                });
            return;
        } else {
            // This method sends a POST request to the API with the form data and HTTP Options.
            // Subscribe handles the response from the API.
            this.httpClient
                .post(apiUrl, this.inventoryData, httpOptions)
                .subscribe({
                    next: (data) => console.log(data),
                    error: (error) => console.log('There was an error!', error),
                    complete: () => {
                        alert(
                            'You submitted the form!' +
                                JSON.stringify(this.inventoryData),
                        );
                        // Fetch the updated inventory *after* the POST is complete.
                        this.fetchInventory();
                        // Clear the form (optional, but good practice)
                        this.inventoryData = {
                            productId: '',
                            productName: '',
                            availableQty: 0,
                            reorderPoint: 0,
                        };
                    },
                });
        }
    }

    openConfirmDialog(productId: number) {
        // Set the productIdToDelete variable to the ID of the product to be deleted.
        this.productIdToDelete = productId;
        console.log('Product ID to delete: ' + this.productIdToDelete);
        // Open the dialog box using the DialogBoxComponent and a callback function.
        this.modalService.open(DialogBoxComponent).result.then((data) => {
            // If the event is 'confirm', call the deleteProduct method.
            if (data.event === 'confirm') {
                this.deleteProduct();
                console.log('The Delete Event is confirmed');
            }
        });
    }

    deleteProduct() {
        // URL to which the DELETE request will be sent.
        const apiUrl = `https://localhost:7107/api/Inventory?productId=${this.productIdToDelete}`;
        // Contains HTTP Headers, including the Authorization token and content type.
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }),
        };
        // This method sends a DELETE request to the API with the product ID and HTTP Options.
        // Subscribe handles the response from the API.
        this.httpClient.delete(apiUrl, httpOptions).subscribe({
            complete: () => {
                // Fetch the updated inventory *after* the DELETE is complete.
                this.fetchInventory();
                // Reset the productIdToDelete variable to 0.
                this.productIdToDelete = 0;
            },
        });
    }

    populateFormForEdit(inventory: any) {
        // Populate the form with the data of the product to be edited.
        this.inventoryData.productId = inventory.ProductId;
        this.inventoryData.productName = inventory.ProductName;
        this.inventoryData.availableQty = inventory.AvailableQty;
        this.inventoryData.reorderPoint = inventory.ReOrderPoint;
        // Disable the productId input field when editing.
        this.disableProductIdInput = true;
    }
}
