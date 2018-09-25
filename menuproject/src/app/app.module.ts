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
import { HeaderComponent } from './modules/ui/header/header.component';
import { FooterComponent } from './modules/ui/footer/footer.component';
import { LayoutComponent } from './modules/ui/layout/layout.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DetailrecettesComponent } from './components/detailrecettes/detailrecettes.component';
import { RecettesComponent } from './components/recettes/recettes.component';

import { TestService } from './shared/services/test.service';

const appRoutes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: 'app-detailrecettes',      component: DetailrecettesComponent },
  { path: 'app-recettes', component: RecettesComponent}
];

@NgModule({
  declarations: [
    PopupComponent,
    ContenuPopComponent,
    AppelPopComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    CalendarComponent,
    DetailrecettesComponent,
    RecettesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
