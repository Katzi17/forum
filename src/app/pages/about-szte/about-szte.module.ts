import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutSzteRoutingModule } from './about-szte-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AboutSzteComponent } from './about-szte.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [AboutSzteComponent],
  imports: [
    CommonModule,
    AboutSzteRoutingModule,
    SharedModule,
    MatCardModule,
    MatTabsModule,
  ],
})
export class AboutSzteModule {}
