import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
    selector: 'app-customer',
    imports: [],
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
    httpClient = inject(HttpClient);
    private modalService = inject(NgbModal);
    customerDetails: any;
    customerIdToDelete: number = 0;

    openAddCustomerDialog() {
        this.modalService
            .open(AddCustomerDialogComponent)
            .result.then((data) => {
                if (data.event == 'closed') {
                    this.getCustomerData();
                }
            });
    }

    openConfirmDeleteDialog(customerId: number) {
        this.customerIdToDelete = customerId;
        this.modalService.open(DialogBoxComponent).result.then((data) => {
            if (data.event === 'confirm') {
                this.deleteCustomerData();
                console.log('The Delete Event is confirmed');
            }
        });
    }

    ngOnInit(): void {
        this.getCustomerData();
    }

    getCustomerData() {
        // Get customer data from database
        const apiUrl = 'https://localhost:7107/api/Customer';
        this.httpClient.get(apiUrl).subscribe((result) => {
            this.customerDetails = result;
            console.log(this.customerDetails);
        });
    }

    deleteCustomerData() {
        const apiUrl = `https://localhost:7107/api/Customer?customerId=${this.customerIdToDelete}`;
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }),
        };

        this.httpClient.delete(apiUrl, httpOptions).subscribe({
            complete: () => {
                this.getCustomerData();
                this.customerIdToDelete = 0;
            },
        });
    }

    openEditCustomerDialog(customer: any) {
        // Open the dialog box using the DialogBoxComponent and a callback function.
        // We are using modalReference because we need to pass the customer data to the dialog box input.
        const modalReference = this.modalService.open(
            AddCustomerDialogComponent,
        );
        // Set the customer data to be edited in the modal.
        modalReference.componentInstance.customer = {
            customerId: customer.CustomerId,
            firstName: customer.FirstName,
            lastName: customer.LastName,
            email: customer.Email,
            phone: customer.Phone,
            registrationDate: customer.RegistrationDate,
        };
        modalReference.result.then((data) => {
            if (data.event === 'closed') {
                this.getCustomerData();
            }
        });
    }
}
