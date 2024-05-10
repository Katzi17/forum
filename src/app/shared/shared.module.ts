import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { DateFormatPipe } from './pipes/dateFormat.pipe';
import { ShowMorePipe } from './pipes/showMore.pipe';

@NgModule({
  declarations: [HeaderComponent, DateFormatPipe, ShowMorePipe],
  imports: [
    AngularFireModule,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    ReactiveFormsModule,
    NgIf,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCard,
  ],
  exports: [
    AngularFireModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    HeaderComponent,
    ShowMorePipe,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatSelectModule,
    DateFormatPipe,
  ],
})
export class SharedModule {}
