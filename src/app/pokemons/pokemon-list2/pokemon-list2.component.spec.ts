import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonList2Component } from './pokemon-list2.component';

describe('PokemonList2Component', () => {
  let component: PokemonList2Component;
  let fixture: ComponentFixture<PokemonList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
