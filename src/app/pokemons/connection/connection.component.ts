import { AuthRefresh } from './../../models/auth-refresh';
import { AuthLogin } from './../../models/auth-login';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { Router } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { PokemonDetailed } from 'src/app/models/pokemonDetailed.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  constructor(private pokemonService: PokemonService) { }

  email = 'francois.poire@ig2i.centralelille.fr';
  password = 'toto12345';

  authLogin: AuthLogin;
  authRefresh: AuthRefresh;

  listIdPokemon: Array<number>;
  newListIdPokemon: Array<number>;

  pokemonArray: Array< PokemonDetailed >;

  ngOnInit() {
    this.get_authentification().pipe(
      switchMap( () => this.get_pokemon_team() )
    ).subscribe();
  }

  get_authentification() {
    return this.pokemonService.getAccessToken(this.email, this.password).pipe(
      tap(result => this.authLogin = result)
    );
  }

  get_refresh_token() {
    return this.pokemonService.getRefreshToken(this.authLogin.refresh_token).subscribe(result => this.authRefresh = result);
  }

  get_pokemon_team() {
    return this.pokemonService.getTeam(this.authLogin.access_token).pipe(
      tap(result => this.listIdPokemon = result)
    );
  }

  set_pokemon_team() {
    this.newListIdPokemon = [1, 2, 3, 4, 5, 6, 7, 8, 9].slice(0, 6);
    return this.pokemonService.setTeam(this.authLogin.access_token, this.newListIdPokemon);
  }

  set_pokemon_team_modif(arrayId: Array<number>) {
    this.listIdPokemon = arrayId.slice(0, 6);
    return this.pokemonService.setTeam(this.authLogin.access_token, this.listIdPokemon);
  }


  getTeam() {
    this.set_pokemon_team().pipe(
      switchMap( () => this.get_pokemon_team())
    ).subscribe();
  }

}
