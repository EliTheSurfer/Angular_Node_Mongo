import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { League, LeagueService } from '../league.service';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.css']
})
export class LeagueListComponent implements OnInit {
  leagues: League[] = [];
  leagueControl = new FormControl('');
  filteredLeagues: Observable<League[]>;

  selectedLeagueId: string | null = null;

  constructor(private leagueService: LeagueService) {
    this.filteredLeagues = this.leagueControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value?.name),
      map(name => name ? this._filter(name) : this.leagues.slice())
    );
  }

  ngOnInit(): void {
    this.getLeagues();
  }

  getLeagues(): void {
    this.leagueService.getLeagues()
      .subscribe(leagues => {
        this.leagues = leagues;
        this.filteredLeagues = this.leagueControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value?.name),
          map(name => name ? this._filter(name) : this.leagues.slice())
        );
      });
  }

  private _filter(value: string): League[] {
    const filterValue = value.toLowerCase();
    return this.leagues.filter(league => league.name.toLowerCase().includes(filterValue));
  }

  onLeagueSelect(league: League): void {
    this.selectedLeagueId = league._id;
    this.leagueControl.setValue(league);
  }

  displayFn(league: League): string {
    return league && league.name ? league.name : '';
  }
}
