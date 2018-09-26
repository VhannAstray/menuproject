import { Component, OnInit } from '@angular/core';
import { RecetteInterface } from './../../shared/interfaces/recette-interface';
import { Subscription } from 'rxjs';
import { RecetteService } from '../../shared/services/recette-service.service';

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

  constructor(private recetteService: RecetteService) {
    // initialise la recette avec des valeurs vides
    this.recette = {instructions: '',
    titre: '',
    nombrePersonnes: 0,
    tempsCuisson: 0,
    tempsPreparation: 0,
    typeMeal: 1
    };

  }

  ngOnInit() {
    // recupère l'id de la recette diffusé par recettes.components.ts
    this.recetteIdSubscription = this.recetteService.getId().subscribe((id) => {
      // utilise cet id pour faire un SELECT by id dans la bdd
      this.recetteSubscription = this.recetteService.getRecettes(id).subscribe((recette) => {
        // donne la valeur venant de la bdd à this.recette
        this.recette = {
          instructions: recette[0].instructions,
          titre: recette[0].titre,
          nombrePersonnes: recette[0].nombrePersonnes,
          tempsCuisson: recette[0].tempsCuisson,
          tempsPreparation: recette[0].tempsPreparation,
          typeMeal: recette[0].typeMeal

        };
      });
    });
  }

}
