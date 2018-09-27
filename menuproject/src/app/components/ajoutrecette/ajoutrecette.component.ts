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

  /**
   * @var calInfoSubscription subscription depuis le calendrier
   */
  private calInfoSubscription: Subscription;

  /**
   * @var calInfoStr : substract du param recu depuis le calendrier
   */
  private calInfoStr: string;

  private recetteInsert: any;

  constructor(public ngxSmartModalService: NgxSmartModalService, private recetteService: RecetteService) {
    this.recettesSorted = [];
    this.recetteInsert = {
      planning_id: 0,
      recettes_id: 0,
      is_midi: 0
    };
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

    // recup info depuis le calendrier et tri les recettes en suivant du type de plat
    this.calInfoSubscription = this.recetteService.getCalInfo().subscribe((indiceCal) => {
      this.calInfoStr = indiceCal;
      console.log('info recues depuis le calendrier : ' + this.calInfoStr);
      const calType = this.calInfoStr.substr(2);
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

  // ouvre une popup suivant l'id de la recette
  public detailId(id: number): void {
    this.ngxSmartModalService.getModal('popupOne').open();
    this.recetteService.sendId(id);
    console.log('Id send is : ' + id);
  }

  // tri la recette suivant le type de plat passé en param
  public sortRecette(typeMeal: number): any {
    this.recettesSorted = [];
    for (const r of this.recettes) {
      if (r.typeMeal === typeMeal) {
          this.recettesSorted.push(r);
      }
    }
  }

  public add(recetteId: number): any {
    // console.log('passe par la dans le add');
      this.recetteInsert.recettes_id = recetteId;
      // console.log('recette id est : ' + this.recetteInsert.recettes_id);
      // console.log(this.calInfoStr);
      this.recetteInsert.planning_id = parseInt(this.calInfoStr.substr(0, 1), 10);
      // console.log(this.recetteInsert.planning_id);
      const midiStr = this.calInfoStr.substr(2);
      if (midiStr === '1' || midiStr === '2' || midiStr === '3') {
        this.recetteInsert.is_midi = 1;

      } else {
        this.recetteInsert.is_midi = 0;
      }
      console.log(this.recetteInsert);
  }


}
