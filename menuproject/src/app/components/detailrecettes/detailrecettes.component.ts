import { Component, OnInit } from '@angular/core';
import { RecetteInterface } from './../../shared/interfaces/recette-interface';
import { Subscription } from 'rxjs';
import { RecetteService } from '../../shared/services/recette-service.service';
import { TypePlat } from '../../shared/interfaces/type-plat';

@Component({
  selector: 'app-detailrecettes',
  templateUrl: './detailrecettes.component.html',
  styleUrls: ['./detailrecettes.component.scss']
})
export class DetailrecettesComponent implements OnInit {

  /**
   * Inscription au flux d'envoie d'id de recette depuis recettes.component.ts
   */
  private recetteIdSubscription: Subscription;

  /**
   * Inscription au flux d'envoie de requete à la bdd
   */
  private recetteSubscription: Subscription;

  /**
   * @var recette qui est affiche dans la popup detail
   */
  public recette: RecetteInterface;

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

  constructor(private recetteService: RecetteService) {
    // initialise la recette avec des valeurs vides
    this.recette = {
      instructions: '',
      titre: '',
      nombrePersonnes: 0,
      tempsCuisson: 0,
      tempsPreparation: 0,
      typeMeal: 1,
      photos: ''
    };
    this.typeMeal = {
      libelle: ''
    };
    this.typeMealLabel = [];

    // récupération des types de plats
    this.typePlatSubscription = this.recetteService.getTypePlat().subscribe((typePlat) => {
      this.typeMeal = typePlat;
      // enregistre chaque libelle dans le tableau de string typeMealLabel
      for (let i = 0; i < 3; i++ ) {
        this.typeMealLabel.push(this.typeMeal[i].libelle);
      }
      console.log(' les labels de plat ' + this.typeMealLabel);
    });

  }

  ngOnInit() {
    // recupère l'id de la recette diffusé par recettes.components.ts
    this.recetteIdSubscription = this.recetteService.getId().subscribe((id) => {
      // utilise cet id pour faire un SELECT by id dans la bdd
      this.recetteSubscription = this.recetteService.getRecettes(id).subscribe((recette) => {
        console.log('Recette : ' + JSON.stringify(recette));
        // donne la valeur venant de la bdd à this.recette
        this.recette = {
          instructions: recette[0].hasOwnProperty('instructions') ? recette[0].instructions : '',
          titre: recette[0].titre,
          nombrePersonnes: recette[0].nombrePersonnes,
          tempsCuisson: recette[0].tempsCuisson,
          tempsPreparation: recette[0].tempsPreparation,
          typeMeal: recette[0].typeMeal,
          photos: recette[0].photos
        };
      });
    });
  }

}
