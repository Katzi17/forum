import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CongratulationRoutingModule } from './congratulation-routing.module';
import { CongratulationComponent } from './congratulation.component';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CongratulationComponent],
  imports: [
    CommonModule,
    CongratulationRoutingModule,
    SharedModule,
    MatCardModule,
  ],
  exports: [CongratulationComponent],
})
export class CongratulationModule {}
