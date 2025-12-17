import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { WebCheckInModel } from '../model/web-checkIn.model';
import { FormsModule } from '@angular/forms';
// import { SignaturePad } from 'angular2-signaturepad/signature-pad';


@Component({
    standalone: true,
    selector: 'web-checkin-form',
    templateUrl: './web-checkin-form.page.html',
    styleUrls: ['./web-checkin-form.page.scss'],
    imports: [FormsModule]
})
export class WebCheckinPage implements OnInit {

    @Input() webCheckin: WebCheckInModel;
    @Input() submit: boolean;
    @Input() invalidFlags: any;
    // @ViewChild(SignaturePad, {static: false}) signaturePad: SignaturePad;
    signPlaceholder = true;

    signaturePadOptions = {
        minWidth: 2,
        canvasWidth: 500,
        // canvasHeight: 200
    };

    constructor() {
        this.webCheckin = new WebCheckInModel();
    }

    ngOnInit() {
        this.clearSign();
    }

    drawStart() {
        this.signPlaceholder = false;
        console.log('begin drawing');
    }

    drawComplete() {
        // console.log(this.signaturePad.toDataURL());
        // this.webCheckin.signaturePad = this.signaturePad;
    }

    clearSign() {
        // this.signPlaceholder = true;
        // if (this.signaturePad) {
        //     this.signaturePad.clear();
        // }
    }
}
