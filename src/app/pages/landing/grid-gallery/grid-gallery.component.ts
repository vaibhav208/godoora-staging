import { Component, Input } from '@angular/core';
import {Image} from "./image.model";
import { GridGalleryItemComponent } from './grid-gallery-item/grid-gallery-item.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-grid-gallery',
  templateUrl: './grid-gallery.component.html',
  imports: [GridGalleryItemComponent, MatGridListModule, CommonModule]
})
export class GridGalleryComponent{

  @Input() images: Image[];
  @Input() cols: number = 4;
  @Input() rowHeight: number = 2;
  @Input() gutterSize: number = 1;

  constructor() {
  }
  
  ngOnInit() {
  }

}