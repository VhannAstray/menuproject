import { Component, OnInit } from '@angular/core';
import { RecetteInterface } from './../../shared/interfaces/recette-interface';

@Component({
  selector: 'app-detailrecettes',
  templateUrl: './detailrecettes.component.html',
  styleUrls: ['./detailrecettes.component.scss']
})
export class DetailrecettesComponent implements OnInit {
  public recette: RecetteInterface;
  constructor() { 
    this.recette= {instructions:'',
    titre:'',
    nombrePersonnes:0,
    tempsCuisson:0,
    tempsPreparation:0,
    typeMeal:0
  }

  }

  ngOnInit() {
  }

}
