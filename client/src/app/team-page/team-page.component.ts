import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService, Player } from '../player.service';
import { LeagueService, Team } from '../league.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit, OnDestroy {
  players: Player[] = [];
  teamId: string = '';
  teamName$ = new BehaviorSubject<string>('Team Details');
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private leagueService: LeagueService
  ) { }

  ngOnInit(): void {
    const routeSub = this.route.params.subscribe(params => {
      this.teamId = params['teamId'];
      this.loadTeamDetails();
      this.loadPlayers();
    });
    this.subscriptions.push(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadTeamDetails(): void {
    this.leagueService.getTeamById(this.teamId).subscribe(
      (team: Team) => {
        this.teamName$.next(team.name);
      },
      (error: any) => {
        console.error('Error fetching team details:', error);
      }
    );
  }

  loadPlayers(): void {
    this.playerService.getPlayersByTeamId(this.teamId).subscribe(
      (players: Player[]) => {
        this.players = players;
      },
      (error: any) => {
        console.error('Error fetching players:', error);
      }
    );
  }
}
