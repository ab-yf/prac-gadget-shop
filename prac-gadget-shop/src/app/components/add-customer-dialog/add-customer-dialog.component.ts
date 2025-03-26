import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-add-customer-dialog',
    imports: [FormsModule, CommonModule],
    templateUrl: './add-customer-dialog.component.html',
    styleUrl: './add-customer-dialog.component.css',
})
export class AddCustomerDialogComponent implements OnInit {
    @Input() private customer: any;

    httpClient = inject(HttpClient);
    modal = inject(NgbActiveModal);
    addCustomerBtnText: string = 'Add';
    disableCustomerIdInput = false;

    customerDetails = {
        customerId: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        registrationDate: '',
    };

    onSubmit() {
        // Add customer to database
        const apiUrl = 'https://localhost:7107/api/Customer';

        let httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }),
        };

        if (this.disableCustomerIdInput == true) {
            this.httpClient
                .put(apiUrl, this.customerDetails, httpOptions)
                .subscribe({
                    next: (data) => {
                        console.log(data);
                    },
                    error: (error) => {
                        console.error(error);
                    },
                    complete: () => {
                        alert(
                            'Customer updated successfully' +
                                JSON.stringify(this.customerDetails),
                        );
                        this.modal.close({ event: 'closed' });
                    },
                });
        } else {
            this.httpClient
                .post(apiUrl, this.customerDetails, httpOptions)
                .subscribe({
                    next: (data) => {
                        console.log(data);
                    },
                    error: (error) => {
                        console.error(error);
                    },
                    complete: () => {
                        alert(
                            'Customer added successfully' +
                                JSON.stringify(this.customerDetails),
                        );
                        this.modal.close({ event: 'closed' });
                    },
                });
        }
    }

    ngOnInit() {
        if (this.customer != null) {
            this.customerDetails = this.customer;
            this.addCustomerBtnText = 'Update';
            this.disableCustomerIdInput = true;
        }
    }
}
