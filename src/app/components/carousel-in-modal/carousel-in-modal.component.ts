import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
    selector: 'app-carousel-in-modal',
    templateUrl: './carousel-in-modal.component.html',
    styleUrls: ['./carousel-in-modal.component.scss'],
})

export class CarouselInModalComponent implements OnInit {

    @Input() imgPath: string;

    constructor(
        private modalCtrl: ModalController
    ){}

    ngOnInit(){}

    async dismiss(flag = false) {
        await this.modalCtrl.dismiss({ flag });
    }

}