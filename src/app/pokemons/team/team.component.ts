import { PokemonService } from './../service/pokemon.service';
import { ConnectionComponent } from './../connection/connection.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetailed } from 'src/app/models/pokemonDetailed.model';
import { tap, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  conn: ConnectionComponent;

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService, private router: Router) { }

  myPokemons: Array<number>;
  // pokemonArray$ = new Observable< Array< PokemonDetailed > >();

  pokemonArray: Array< PokemonDetailed >;
  pokemon: PokemonDetailed;
  id: number;

  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.conn = new ConnectionComponent(this.pokemonService);

    this.conn.get_authentification().pipe(
      switchMap( () => this.conn.get_pokemon_team() )
    ).pipe( switchMap( () => this.getPokemonDetailed() )
    ).subscribe();

  }

  getPokemonDetailed() {
    return this.pokemonService.getPokemonArray(this.conn.listIdPokemon).pipe(
      tap(result => {
        this.pokemonArray = result;
      })
    );
  }

  removePokemon(id: number) {
    const index = this.conn.listIdPokemon.indexOf(id);
    if (index > -1) {
      this.conn.listIdPokemon.splice(index, 1);
    }
    const newArray: Array<number> = this.conn.listIdPokemon;

    this.conn.set_pokemon_team_modif(newArray).pipe(
      switchMap( () => this.conn.get_pokemon_team() )
    ).pipe(
      switchMap( () => this.getPokemonDetailed() )
    ).subscribe();
  }


  addPokemon(id: number) {
    const index = this.conn.listIdPokemon.indexOf(id);

    if ( this.conn.listIdPokemon.length > 5) {
      alert('You already have 6 pokemons');
    } else if (index > -1) {
      alert('You cannot add twice the same pokemon');
    } else {
      if (id > -1) {
        this.conn.listIdPokemon.push(id);
      }
      const newArray: Array<number> = this.conn.listIdPokemon;
      this.conn.set_pokemon_team_modif(newArray).pipe(
        switchMap( () => this.conn.get_pokemon_team() )
      ).pipe(
        switchMap( () => this.getPokemonDetailed() )
      ).subscribe();
    }
  }

  getMessageChild($event) {
    console.log('received id : ' + $event);
    this.id = $event;
    this.addPokemon(this.id);
  }

}
