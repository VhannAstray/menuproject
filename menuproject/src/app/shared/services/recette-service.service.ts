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
   * observable subject de type RecetteInterface
   */
  private recetteSubject: Subject<RecetteInterface[]> = new Subject<RecetteInterface[]>();

  constructor(private _api: HttpClient) { }

  public getRecettes(id: number = null): Observable<RecetteInterface[]> {
    if (id !== null) {
      return this._api.get<RecetteInterface[]>(Constants._API_ROOT + '/' + id);
    } else {
      console.log('Il est passe par ici');
      return this._api.get<RecetteInterface[]>(
        Constants._API_ROOT
      );
    }
  }
}
