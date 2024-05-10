import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersDataRoutingModule } from './users-data-routing.module';
import { UsersDataComponent } from './usersData.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [UsersDataComponent],
  imports: [CommonModule, UsersDataRoutingModule, SharedModule, MatTableModule],
})
export class UsersDataModule {}
