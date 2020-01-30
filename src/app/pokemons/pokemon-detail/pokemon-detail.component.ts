import { Observable } from 'rxjs';
import { PokemonService } from './../service/pokemon.service';
import { Component, OnInit, Input } from '@angular/core';
import { PokemonDetailed } from 'src/app/models/pokemonDetailed.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private router: Router) {
  }

@Input()
set name(name: number) {
  this.id = name;
  this.getLoadPokemon2();
}

 pokemon$ = new Observable<PokemonDetailed>();


  pokemon: PokemonDetailed;
  audio = new Audio();
  id: number;

  ngOnInit() {
    this.getLoadPokemon();
  }

  play() {
    this.audio.play();
  }


  getLoadPokemon() {
    this.pokemonService.getPokemon(this.id).subscribe(res => this.pokemon = res);

    this.audio.src = '../../../../assets/audio/' + this.id + '.mp3';
    this.audio.load();
  }



  getLoadPokemon2() {
    this.pokemon$ = this.pokemonService.getPokemon(this.id);

    this.audio.src = '../../../../assets/audio/' + this.id + '.mp3';
    this.audio.load();
  }



}
