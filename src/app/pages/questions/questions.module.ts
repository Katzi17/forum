import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [QuestionsComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  exports: [QuestionsComponent],
})
export class QuestionsModule {}
