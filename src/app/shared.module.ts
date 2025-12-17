import { NgModule } from '@angular/core';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  
  imports: [SafePipe],
  exports: [SafePipe]
})
export class SharedModule { }