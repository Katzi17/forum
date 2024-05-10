import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongratulationComponent } from './congratulation.component';

const routes: Routes = [{ path: '', component: CongratulationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CongratulationRoutingModule {}
