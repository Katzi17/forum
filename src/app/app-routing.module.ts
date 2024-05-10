import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'regist',
    loadChildren: () =>
      import('./pages/regist/regist.module').then((m) => m.RegistModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about-szte',
    loadChildren: () =>
      import('./pages/about-szte/about-szte.module').then(
        (m) => m.AboutSzteModule
      ),
  },
  {
    path: 'forum',
    loadChildren: () =>
      import('./pages/forum/forum.module').then((m) => m.ForumModule),
  },
  {
    path: 'questions',
    loadChildren: () =>
      import('./pages/questions/questions.module').then(
        (m) => m.QuestionsModule
      ),
  },
  {
    path: 'congratulation',
    loadChildren: () =>
      import('./pages/congratulation/congratulation.module').then(
        (m) => m.CongratulationModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/usersData/users-data.module').then(
        (m) => m.UsersDataModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
