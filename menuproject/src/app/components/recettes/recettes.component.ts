import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { RecetteService } from './../../shared/services/recette-service.service';
import { RecetteInterface } from './../../shared/interfaces/recette-interface';
import { Subscription } from 'rxjs';
import { TypePlat } from '../../shared/interfaces/type-plat';


@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.scss']
})
export class RecettesComponent implements OnInit {
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

  /**
   * @var string : tableau de string avec les libelles des types de plat
   * Utilise pour afficher une string dans le html
   */
  private typeMealLabel: String[];
  
  public recettesTemp: RecetteInterface;

  constructor(public ngxSmartModalService: NgxSmartModalService, private recetteService: RecetteService) {

    this.recettesSorted = [];
    this.typeMeal = {
      libelle: ''
    };
    this.typeMealLabel = [];

    // recupération des recettes
    this.recettesSubscription = this.recetteService.getRecettes().subscribe((recettes) => {
      // recupère les recettes de la bdd et les sauvegardes dans recettes
      this.recettes = recettes;
      // par défaut tri les recettes pour afficher les entrées
      this.sortRecette(1);
      console.log("this recettes ");
      console.log(this.recettes);
    });

    // récupération des types de plats
    this.typePlatSubscription = this.recetteService.getTypePlat().subscribe((typePlat) => {
      this.typeMeal = typePlat;
      // enregistre chaque libelle dans le tableau de string typeMealLabel
      for (let i = 0; i < 3; i++) {
        this.typeMealLabel.push(this.typeMeal[i].libelle);
      }
      console.log(' les labels de plat ' + this.typeMealLabel);
    });
  }

  ngOnInit() {    
  }


  /**
   * Methode de tri des recettes par type de plat
   * @param typeMeal id du type de plat
   */
  public sortRecette(typeMeal: number): any {
    this.recettesSorted = [];
    for (const r of this.recettes) {
      if (r.typeMeal === typeMeal) {
          this.recettesSorted.push(r);
      }
    }
    console.log(this.recettesSorted);
  }

  /**
   * Méthode qui ouvre la popup des détails de recette et broadcast l'id de la recette
   * @param id Identifiant de la recette suivant le bouton détail cliquer par l'utilisateur
   */
  public detailId(id: number): void {
    this.ngxSmartModalService.getModal('popupOne').open();
    this.recetteService.sendId(id);
    console.log('Id send is : ' + id);
  }

}
