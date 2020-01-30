import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { PagedData } from 'src/app/models/paged-data.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PokemonDetailed } from 'src/app/models/pokemonDetailed.model';
import { AuthRefresh } from 'src/app/models/auth-refresh';
import { AuthLogin } from 'src/app/models/auth-login';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';

  // '/pokemons?offset=20&limit=20'

  constructor(private httpClient: HttpClient) { }

  getPokemons(pagination: PagedData<Pokemon>): Observable<PagedData<Pokemon>> {
    const url = this.pokemonUrl + '/pokemons?offset=' + pagination.offset + '&limit=' + pagination.limit;
    return this.httpClient.get<PagedData<Pokemon>>(url);
  }

  getAllPokemons(pagination: PagedData<Pokemon>): Observable<PagedData<Pokemon>> {
    const url = this.pokemonUrl + '/pokemons?offset=0' + '&limit=' + pagination.limit;
    return this.httpClient.get<PagedData<Pokemon>>(url);
  }

  getPokemon(id: number): Observable<PokemonDetailed> {
    const urlId: string = this.pokemonUrl + `/pokemons/${id}`;
    return this.httpClient.get<PokemonDetailed>(urlId);
  }

  getPokemonBySearch(search: string): Observable<PagedData<Pokemon>> {
    const urlId: string = this.pokemonUrl + `/pokemons?search=${search}`;
    return this.httpClient.get<PagedData<Pokemon>>(urlId);
  }


  getAccessToken(email: string, password: string): Observable<AuthLogin> {
    const urlId: string = this.pokemonUrl + `/auth/login`;

    const myBody = {
        email,
        password
    };
    return this.httpClient.post<AuthLogin>(urlId, myBody);
  }

  getRefreshToken(refreshToken: string): Observable<AuthRefresh> {
    const urlId: string = this.pokemonUrl + `/auth/refresh`;

    const myBody = {
        refresh_token: refreshToken
    };

    return this.httpClient.post<AuthRefresh>(urlId, myBody);
  }

  getTeam(accessToken: string): Observable<[]> {
    const urlId: string = this.pokemonUrl + `/trainers/me/team`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${accessToken}`
      })
    };

    const myBody = {
    };

    return this.httpClient.get<[]>(urlId, httpOptions);
  }

  setTeam(accessToken: string, ids: Array<number>): Observable<any> {
    const urlId: string = this.pokemonUrl + `/trainers/me/team`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${accessToken}`
      })
    };

    const myBody = ids;

    return this.httpClient.put(urlId, myBody, httpOptions);
  }



  getPokemonArray(myarray: Array<number>): Observable< Array< PokemonDetailed > > {
    const requestArray = [];

    for (const j of myarray) {
      const urlId: string = this.pokemonUrl + `/pokemons/${j}`;
      const rep = this.httpClient.get<PokemonDetailed>(urlId);
      requestArray.push(rep);
    }

    return forkJoin(requestArray);
  }

}
