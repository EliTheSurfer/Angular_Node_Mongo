import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Player {
  _id: string;
  name: string;
  photo: string;
  position: string;
  birthdate: string;
  price: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:3000/team';

  constructor(private http: HttpClient) { }

  getPlayersByTeamId(teamId: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/${teamId}`);
  }
}
