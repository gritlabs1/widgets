import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MutexButtonsComponent } from './mutex-buttons.component';

@NgModule({
  imports: [
    MutexButtonsComponent,
    RouterModule.forChild([{ path: '', component: MutexButtonsComponent }])
  ]
})
export class MutexModule {}
