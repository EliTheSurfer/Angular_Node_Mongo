import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeagueListComponent } from './league-list/league-list.component';
import { TeamListComponent } from './team-list/team-list.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { LeagueService } from './league.service';
import { PlayerService } from './player.service';

@NgModule({
  declarations: [
    AppComponent,
    LeagueListComponent,
    TeamListComponent,
    PlayerCardComponent,
    TeamPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [LeagueService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
