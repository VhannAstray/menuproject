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
      this.recettesSubscription = this.recetteService.getRecettesByPlanning(i).subscribe((recettes) => {
        console.log('Nombre de recettes du jour ' + ' ' + i + ' ' + 'Nb recettes :' + recettes.length);
        if (recettes.length != 0) {
          for (let j = 0; j < recettes.length; j++) {
            this.recettesSemaine[i][j] = recettes[j];
          }
        }
      });
    }
    console.log(this.recettesSemaine);
  }

  ngOnInit() {
  }

}
