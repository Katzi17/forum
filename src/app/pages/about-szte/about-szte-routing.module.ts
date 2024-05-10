import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutSzteComponent } from './about-szte.component';

const routes: Routes = [
  {
    path: '',
    component: AboutSzteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutSzteRoutingModule {}
