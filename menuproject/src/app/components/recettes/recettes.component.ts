import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { RecetteService } from './../../shared/services/recette-service.service';
import { RecetteInterface } from './../../shared/interfaces/recette-interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.scss']
})
export class RecettesComponent implements OnInit {

  public recettes: RecetteInterface[];
  public recettesSorted: RecetteInterface[];
  private recettesSubscription: Subscription;

  constructor(public ngxSmartModalService: NgxSmartModalService, private recetteService: RecetteService) {
    console.log('Hello Recette Component');
    this.recettesSorted = [];
    this.recettesSubscription = this.recetteService.getRecettes().subscribe((recettes) => {
      console.log('test ' + recettes.length);
      this.recettes = recettes;
      this.sortRecette(1);
    });

    /*this.recettes = [
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
    ];*/
  }

  ngOnInit() {
  }

  public sortRecette(typeMeal: number): any {
    this.recettesSorted = [];
    for (const r of this.recettes) {
      if (r.typeMeal === typeMeal) {
          this.recettesSorted.push(r);
      }
    }

    console.log('liste triée : ' + JSON.stringify(this.recettesSorted));
  }

  public detailId(id: number): void {
    this.ngxSmartModalService.getModal('popupOne').open();
    this.recetteService.sendId(id);
    console.log('Id send is : ' + id);
  }

  public open(): void {
    console.log('All your stuff here');
    this.ngxSmartModalService.getModal('popupOne').open();
  }

}
