import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
// import constants
import { Constants } from './../constants/constants';
import { RecetteInterface } from './../../shared/interfaces/recette-interface';
import { TypePlat } from '../interfaces/type-plat';


@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  /**
   * observable subject de type RecetteInterface, utilisé pour diffuser les données venant de la bdd
   */
  private recetteSubject: Subject<RecetteInterface[]> = new Subject<RecetteInterface[]>();

  /**
   * observale subject de type TypePlat Interface, utilisé pour diffuser les données de la table type plat de la bdd
   */
  private typePlatSubject: Subject<TypePlat> = new Subject<TypePlat>();

  /**
   * observable subject de type number, utilisé pour diffuser l'identifiant de la recette
   */
  private idSubject: Subject<number> = new Subject<number>();

  /**
   * observable subject de type any, utilisé pour diffuser le type de plat et le jour depuis le calendrier
   */
  private calInfo: Subject<any> = new Subject<any>();

  constructor(private _api: HttpClient) { }

  /**
   * Methode pour obtenir la liste des recettes
   * @param id identifiant de la recette dans la bdd.
   */
  public getRecettes(id: number = null): Observable<RecetteInterface[]> {
    // si l'id est different de null alors on demande une seule recette avec l'identifiant donné
    if (id !== null) {
      console.log('pass par id' + id);
      return this._api.get<RecetteInterface[]>(Constants._API_ROOT + id);
    } else {
      // sinon on retourne toutes les recettes
      return this._api.get<RecetteInterface[]>(
        Constants._API_ROOT
      );
    }
  }

  public getTypePlat(id: number = null): Observable<TypePlat> {
    // si l'id est different de null alors on demande une seule recette avec l'identifiant donné
    if (id !== null) {
      console.log('pass par id de plat : ' + id);
      return this._api.get<TypePlat>(Constants._API_TYPES_PLATS + id);
    } else {
      // sinon on retourne toutes les recettes
      return this._api.get<TypePlat>(
        Constants._API_TYPES_PLATS
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
  public getId(): Observable<number> {
    return this.idSubject.asObservable();
  }

  public getRecettesByPlanning(id: number = null): Observable<RecetteInterface[]> {
    if (id !== null) {
      return this._api.get<RecetteInterface[]>(Constants._API_ROOT_PLANNING + id);
    } else {
      return this._api.get<RecetteInterface[]>(
        Constants._API_ROOT_PLANNING
      );
    }
  }

  /**
   *  Méthode pour diffuser l'indice du type de plat et du jour
   * @param info indice du jour et du type de plat venant du calendrier
   */
  public sendCalInfo(info: any) {
    this.calInfo.next(info);
  }

  /**
   *  Méthode pour s'abonner à l'indice du type de plat et du jour
   */
  public getCalInfo(): Observable<any> {
    return this.calInfo.asObservable();
  }

  /**
   * Méthode pour assigner une recette sur le planning
   * @param recette 
   */
  public assignRecPlanning(recette: any): Observable<any> {
    return this._api.post<any>(Constants._API_MENU_PLANNING,
      recette
    );
  }

  /**
   * Méthode pour retirer une recette du planning
   * @param recette 
   */
  public removeRecPlanning(recette: any) {
    return this._api.delete<any>(Constants._API_MENU_PLANNING + recette.planning_id + '/' + recette.recettes_id + '/' + recette.is_midi);
  }
}
