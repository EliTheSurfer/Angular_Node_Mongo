import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface League {
  _id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private apiUrl = 'http://localhost:3000/leagues';

  constructor(private http: HttpClient) { }

  getLeagues(): Observable<League[]> {
    return this.http.get<League[]>(this.apiUrl);
  }

  getTeamsByLeague(leagueId: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/${leagueId}`);
  }

  getTeamById(teamId: string): Observable<Team> {
    return this.http.get<Team>(`http://localhost:3000/team/${teamId}`);
  }
}
