import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-dialog-box',
    imports: [],
    templateUrl: './dialog-box.component.html',
    styleUrl: './dialog-box.component.css',
})
export class DialogBoxComponent {
    modal = inject(NgbActiveModal);

    confirm() {
        this.modal.close({ event: 'confirm' });
    }
}
