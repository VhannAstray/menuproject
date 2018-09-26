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

  public recettes: RecetteInterface[];
  public recettesSorted: RecetteInterface[];
  private recettesSubscription: Subscription;
  private typeMeal: TypePlat;
  private typePlatSubscription: Subscription;

  constructor(public ngxSmartModalService: NgxSmartModalService, private recetteService: RecetteService) {
    console.log('Hello Recette Component');
    this.recettesSorted = [];
    this.recettesSubscription = this.recetteService.getRecettes().subscribe((recettes) => {
      console.log('test ' + recettes.length);
      this.recettes = recettes;
      this.sortRecette(1);
    });
    this.typePlatSubscription = this.recetteService.getTypePlat().subscribe((typePlat) => {
      this.typeMeal = typePlat;
    });
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

}
