import { Component, OnInit } from '@angular/core';
import { RecetteService } from './../../shared/services/recette-service.service';
import { RecetteInterface } from './../../shared/interfaces/recette-interface';
import { Subscription } from 'rxjs';
import { TypePlat } from '../../shared/interfaces/type-plat';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-ajoutrecette',
  templateUrl: './ajoutrecette.component.html',
  styleUrls: ['./ajoutrecette.component.scss']
})
export class AjoutrecetteComponent implements OnInit {

  /**
   * @var recettes : Tableau de recette interface qui sont les données les recettes depuis la bdd
   */
  public recettes: RecetteInterface[];

  /**
   * @var recettesSorted: Tableau de recette interface qui sont les données triées par type de plat
   */
  public recettesSorted: RecetteInterface[];

  /**
   * Subscription au recettes depuis le service
   */
  private recettesSubscription: Subscription;

  /**
   * @var typeMeal : de type TypePlat qui contient id et libelle d'un type de plat
   */
  private typeMeal: TypePlat;

  /**
   * Subscription au type de plat depuis le service
   */
  private typePlatSubscription: Subscription;
  // private typeMealLabel: String[];


  private calInfoSubscription: Subscription;
  private calInfoStr: string;

  constructor(public ngxSmartModalService: NgxSmartModalService, private recetteService: RecetteService) {
    this.recettesSorted = [];
    this.typeMeal = {
      libelle: ''
    };


    // recupération des recettes
    this.recettesSubscription = this.recetteService.getRecettes().subscribe((recettes) => {
      // recupère les recettes de la bdd et les sauvegardes dans recettes
      this.recettes = recettes;
      // par défaut tri les recettes pour afficher les entrées
      // this.sortRecette(1);
    });

    // récupération des types de plats
    this.typePlatSubscription = this.recetteService.getTypePlat().subscribe((typePlat) => {
      this.typeMeal = typePlat;
      // enregistre chaque libelle dans le tableau de string typeMealLabel
      // for (let i = 0; i < 3; i++ ) {
      //  this.typeMealLabel.push(this.typeMeal[i].libelle);
      // }
      // console.log(' les labels de plat ' + this.typeMealLabel);
    });

    this.calInfoSubscription = this.recetteService.getCalInfo().subscribe((indiceCal) => {
      this.calInfoStr = indiceCal;
      console.log('info recues depuis le calendrier : ' + this.calInfoStr);
      const calType = this.calInfoStr.substr(2);
      console.log('substract est : ' + calType);
      if (calType === '1' || calType === '4') {
        this.sortRecette(1);
      } else if (calType === '2' || calType === '5') {
        this.sortRecette(2);
      } else {
        this.sortRecette(3);
      }
    });
  }

  ngOnInit() {
  }

  public detailId(id: number): void {
    this.ngxSmartModalService.getModal('popupOne').open();
    this.recetteService.sendId(id);
    console.log('Id send is : ' + id);
  }

  public sortRecette(typeMeal: number): any {
    this.recettesSorted = [];
    for (const r of this.recettes) {
      if (r.typeMeal === typeMeal) {
          this.recettesSorted.push(r);
      }
    }
  }

  public assignRec(): void {
    console.log("je click sur le bon bouton");
    this.recetteService.assignRecPlanning({
      "planning_id": 6,
      "recettes_id": 14,
      "is_midi": 1
    });
  }
}
