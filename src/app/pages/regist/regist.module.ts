import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistRoutingModule } from './regist-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { RegistComponent } from './regist.component';

@NgModule({
  declarations: [RegistComponent],
  imports: [CommonModule, RegistRoutingModule, SharedModule, MatCardModule],
})
export class RegistModule {}
