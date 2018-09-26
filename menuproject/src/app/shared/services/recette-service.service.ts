import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
// import constants
import { Constants } from './../constants/constants';
import { RecetteInterface } from './../../shared/interfaces/recette-interface';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  /**
   * observable subject de type RecetteInterface, utilisé pour diffuser les données venant de la bdd
   */
  private recetteSubject: Subject<RecetteInterface[]> = new Subject<RecetteInterface[]>();

  /**
   * observable subject de type number, utilisé pour diffuser l'identifiant de la recette
   */
  private idSubject: Subject<number> = new Subject<number>();

  constructor(private _api: HttpClient) { }

  /**
   * Methode pour obtenir la liste des recettes
   * @param id identifiant de la recette dans la bdd.
   */
  public getRecettes(id: number = null): Observable<RecetteInterface[]> {
    // si l'id est different de null alors on demande une seule recette avec l'identifiant donné
    if (id !== null) {
      console.log('pass par id' + id);
      return this._api.get<RecetteInterface[]>(Constants._API_ROOT + '/' + id);
    } else {
    // sinon on retourne toutes les recettes
      return this._api.get<RecetteInterface[]>(
        Constants._API_ROOT
      );
    }
  }


  /**
   * Diffuse l'identifiant de la recette depuis un composant
   * @param id id de la recette
   */
  public sendId(id: number) {
    this.idSubject.next(id);
  }

    /**
  * Method qui permet de s'inscrire à la diffusion de l'id de la recette
  */
  public getId(): Observable <number> {
    return this.idSubject.asObservable();
  }
}
