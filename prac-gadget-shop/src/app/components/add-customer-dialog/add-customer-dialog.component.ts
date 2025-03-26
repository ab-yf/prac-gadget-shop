import { Component, inject } from '@angular/core';
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
export class AddCustomerDialogComponent {
    httpClient = inject(HttpClient);
    modal = inject(NgbActiveModal);

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
