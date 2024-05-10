import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRoutingModule } from './header-routing.module';
import { SharedModule } from '../shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    HeaderRoutingModule,
    SharedModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class HeaderModule {}
