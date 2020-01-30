import { ConnectionComponent } from './pokemons/connection/connection.component';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';
import { TeamComponent } from './pokemons/team/team.component';
import { PokemonList2Component } from './pokemons/pokemon-list2/pokemon-list2.component';

const routes: Routes = [
  { path: 'pokemons/:id', component: PokemonDetailComponent},
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'pokemons2', component: PokemonList2Component },
  { path: 'pokedex/:id', component: PokedexComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'connection', component: ConnectionComponent},
  { path: 'team', component: TeamComponent},
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
