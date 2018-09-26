import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxSmartModalModule, NgxSmartModalService  } from 'ngx-smart-modal';
import { RecetteService } from './shared/services/recette-service.service';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PopupComponent } from './components/popup/popup.component';
import { ContenuPopComponent } from './components/contenu-pop/contenu-pop.component';
import { AppelPopComponent } from './components/appel-pop/appel-pop.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DetailrecettesComponent } from './components/detailrecettes/detailrecettes.component';
import { RecettesComponent } from './components/recettes/recettes.component';
import { DontcookComponent } from './components/dontcook/dontcook.component';
import { PopupcalendarComponent } from './components/popupcalendar/popupcalendar.component';
import { AjoutrecetteComponent } from './components/ajoutrecette/ajoutrecette.component';
import { CarterecetteComponent } from './components/carterecette/carterecette.component';


import { UiModule } from './modules/ui/ui.module';

const appRoutes: Routes = [
  { path: '', component: CalendarComponent},
  { path: 'calendar', component: CalendarComponent },
  { path: 'app-detailrecettes', component: DetailrecettesComponent },
  { path: 'app-recettes', component: RecettesComponent}
];

@NgModule({
  declarations: [
    PopupComponent,
    ContenuPopComponent,
    AppelPopComponent,
    AppComponent,
    CalendarComponent,
    DetailrecettesComponent,
    DontcookComponent,
    PopupcalendarComponent,
    CarterecetteComponent,
    AjoutrecetteComponent,
    RecettesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UiModule,
    NgxSmartModalModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    NgxSmartModalService,
    RecetteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
