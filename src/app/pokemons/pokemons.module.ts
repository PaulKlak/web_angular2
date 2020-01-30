import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { MatListModule } from '@angular/material/list';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { AppRoutingModule } from '../app-routing.module';

import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PokedexComponent } from './pokedex/pokedex.component';

import { MatInputModule } from '@angular/material/input';
import { ConnectionComponent } from './connection/connection.component';
import { TeamComponent } from './team/team.component';
import { PokemonList2Component } from './pokemon-list2/pokemon-list2.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent,
    ConnectionComponent,
    TeamComponent,
    PokemonList2Component
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    AppRoutingModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    InfiniteScrollModule,
    MatSidenavModule,
    MatInputModule
  ],
  exports: [
    PokemonListComponent,
    PokemonDetailComponent
  ]
})
export class PokemonsModule { }