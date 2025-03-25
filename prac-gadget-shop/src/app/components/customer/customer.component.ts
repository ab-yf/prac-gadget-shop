import {Component, inject} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddCustomerDialogComponent} from '../add-customer-dialog/add-customer-dialog.component';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  private modalService = inject(NgbModal);

  openAddCustomerDialog(){
    this.modalService.open(AddCustomerDialogComponent)
  }

}
