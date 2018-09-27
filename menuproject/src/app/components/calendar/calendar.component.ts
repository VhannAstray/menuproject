import { Component, OnInit } from '@angular/core';
import { RecetteInterface } from '../../shared/interfaces/recette-interface';
import { Subscription } from 'rxjs';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { RecetteService } from '../../shared/services/recette-service.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  /** J'utilise un tableau à 2 dimensions pour gérer les recettes de la semaine :
  * La première dimensions correspond au jour de la semaine, 1 pour lundi et 7 pour dimanche
  * La deuxième permet de parcourir les recettes du jour choisi en première dimension.
  **/
  public recettesSemaine: RecetteInterface[][];

  private recettesSubscription: Subscription;

  constructor(public ngxSmartModalService: NgxSmartModalService, private recetteService: RecetteService) {
    console.log('Chargement du component Calendar');
    this.recettesSemaine = []; // Nécessaire pour pouvoir utiliser la variable
    for (let i = 1; i < 8; i++) {
      this.recettesSemaine[i] = []; // Nécessaire pour pouvoir utiliser la variable

      let emptyRecette: RecetteInterface;
      emptyRecette = {
        instructions: "Recette Vide",
        isMidi: -1,
        nombrePersonnes: -1,
        tempsCuisson: -1,
        tempsPreparation: -1,
        titre: "vide",
        typeMeal: -1
      };
      // Initialisation du tableau vide.
      for (let j = 1; j < 7; j++) {
        this.recettesSemaine[i][j] = emptyRecette;
      }

      this.recettesSubscription = this.recetteService.getRecettesByPlanning(i).subscribe((recettes) => {
        console.log('Nombre de recettes du jour ' + ' ' + i + ' ' + 'Nb recettes :' + recettes.length);
        if (recettes.length != 0) {
          // Reconstruction du planning complet.
          for (let j = 0; j < recettes.length; j++) {
            // Si la recette est du midi.
            if (recettes[j].isMidi == 1) {
              if (recettes[j].typeMeal == 1) // Entrée
                this.recettesSemaine[i][1] = recettes[j];
              if (recettes[j].typeMeal == 2) // Plat
                this.recettesSemaine[i][2] = recettes[j];
              if (recettes[j].typeMeal == 3) // Dessert
                this.recettesSemaine[i][3] = recettes[j];
            } else { // Si la recette est du diner.
              if (recettes[j].typeMeal == 1) // Entrée
                this.recettesSemaine[i][4] = recettes[j];
              if (recettes[j].typeMeal == 2)  // Plat
                this.recettesSemaine[i][5] = recettes[j];
              if (recettes[j].typeMeal == 3)  // Dessert
                this.recettesSemaine[i][6] = recettes[j];
            }
          }
        }
      });
    }
    console.log(this.recettesSemaine);
  }

  public open(param: any): any {
    console.log(param);
    this.recetteService.sendCalInfo(param);
    this.ngxSmartModalService.getModal('popupcalendar').open();
  }

  ngOnInit() {
  }

  public detailId(id: number): void {
    this.ngxSmartModalService.getModal('popupOne').open();
    this.recetteService.sendId(id);
    console.log('Id send is : ' + id);
  }

  public delete(param: any): any {
    console.log(param);
  }

}
