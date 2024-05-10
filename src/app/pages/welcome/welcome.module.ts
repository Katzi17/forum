import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  imports: [CommonModule, WelcomeRoutingModule, SharedModule, MatCardModule],
})
export class WelcomeModule {}
