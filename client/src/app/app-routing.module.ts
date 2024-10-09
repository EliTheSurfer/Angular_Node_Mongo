import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueListComponent } from './league-list/league-list.component';
import { TeamPageComponent } from './team-page/team-page.component';

const routes: Routes = [
  { path: '', component: LeagueListComponent },
  { path: 'team/:teamId', component: TeamPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
