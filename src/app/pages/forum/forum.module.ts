import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumRoutingModule } from './forum-routing.module';
import { ForumComponent } from './forum.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ForumComponent],
  imports: [
    CommonModule,
    ForumRoutingModule,
    SharedModule,
    MatTableModule,
    MatCardModule,
  ],
  exports: [ForumComponent],
})
export class ForumModule {}
