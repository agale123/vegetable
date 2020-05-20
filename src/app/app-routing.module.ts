import { PrelimsComponent } from './prelims/prelims.component';
import { MatchupComponent } from './matchup/matchup.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {path: 'livestream', component: LivestreamComponent},
    {path: 'prelims', component: PrelimsComponent},
    {path: 'knockout', component: HomeComponent},
    {path: '**', redirectTo: 'knockout'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
