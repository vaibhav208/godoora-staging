import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'option-popover',
    imports: [IonicModule, CommonModule, FormsModule],
    template: `
        <ion-list>
            <ion-item button lines="none">New</ion-item>
            <ion-item button lines="none">In Progress</ion-item>
            <ion-item button lines="none">Completed</ion-item>
            <ion-item button lines="none">Cancel</ion-item>
            <ion-item button lines="none">Cancel Request</ion-item>
        </ion-list>
    `
})
export class OptionPopoverComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
