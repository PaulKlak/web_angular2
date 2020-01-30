import { PagedData } from 'src/app/models/paged-data.model';
import { PokemonService } from './../service/pokemon.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pagination: PagedData<Pokemon> = {
    data: [],
    limit: 20,
    offset: 0
  };

  @Output() myMessages: EventEmitter<number> = new EventEmitter();


  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemons();
  }

  getAllPokemons() {
    this.pokemonService.getAllPokemons(this.pagination).subscribe(result => this.pagination.data = result.data);
  }

  getPokemons() {
    this.pokemonService.getPokemons(this.pagination).subscribe(result => this.pagination.data = result.data);
  }

  onScroll() {
    console.log('scrolled!!');
    this.pagination.limit = this.pagination.limit + 10;
    this.getAllPokemons();
  }

  sendMessage(id: number) {
    this.myMessages.emit(id);
  }

  searchPokemon($event) {
    if ($event.target.value !== '') {
      this.pokemonService.getPokemonBySearch($event.target.value).subscribe(result => this.pagination.data = result.data);
    } else {
      this.getPokemons();
    }
  }

}
