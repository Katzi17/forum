import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { QuestionsComponent } from '../../pages/questions/questions.component';
import { ForumComponent } from '../../pages/forum/forum.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'forum', component: ForumComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeaderRoutingModule {}
