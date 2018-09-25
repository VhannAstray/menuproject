import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { RecetteInterface } from './../../shared/interfaces/recette-interface';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.scss']
})
export class RecettesComponent implements OnInit {

  public recettes: RecetteInterface[];

  constructor(public ngxSmartModalService: NgxSmartModalService) {
    this.recettes = [
      {
        titre: 'Recette 1',
        instructions: 'Faire ca',
        tempsCuisson: 10,
        tempsPreparation: 5,
        nombrePersonnes: 2,
        typeMeal: 1
      },
      {
        titre: 'Recette 2',
        instructions: 'Faire autre chose',
        tempsCuisson: 4,
        tempsPreparation: 50,
        nombrePersonnes: 4,
        typeMeal: 2
      },
      {
        titre: 'Recette 3',
        instructions: 'Plein de trucs',
        tempsCuisson: 10,
        tempsPreparation: 10,
        nombrePersonnes: 3,
        typeMeal: 3
      }
    ];
  }

  ngOnInit() {
  }

}
