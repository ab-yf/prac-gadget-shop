import {Component, inject} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddCustomerDialogComponent} from '../add-customer-dialog/add-customer-dialog.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  httpClient = inject(HttpClient);
  private modalService = inject(NgbModal);

  customerData: any;

  openAddCustomerDialog(){
    this.modalService.open(AddCustomerDialogComponent)
  }

  ngOnInit(): void {
    this.getCustomerData();
  }

  getCustomerData() {
    // Get customer data from database
    const apiUrl = "https://localhost:7107/api/Customer";
    this.httpClient.get(apiUrl).subscribe( result => {
      this.customerData = result;
      console.log(this.customerData);
    })
  }
}
