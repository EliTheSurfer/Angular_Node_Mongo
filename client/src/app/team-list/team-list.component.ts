import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Team, LeagueService } from '../league.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnChanges {
  @Input() leagueId: string | null = null;
  teams: Team[] = [];

  constructor(private leagueService: LeagueService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['leagueId'] && this.leagueId) {
      this.getTeams();
    }
  }

  getTeams(): void {
    if (this.leagueId) {
      this.leagueService.getTeamsByLeague(this.leagueId)
        .subscribe(teams => this.teams = teams);
    }
  }

  onTeamClick(teamId: string): void {
    this.router.navigate(['/team', teamId]);
  }
}
