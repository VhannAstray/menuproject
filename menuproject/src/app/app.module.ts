import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSmartModalModule, NgxSmartModalService  } from 'ngx-smart-modal';
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
import { DontcookComponent } from './components/dontcook/dontcook.component';



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
    DontcookComponent,
    
    RecettesComponent
  ],
  imports: [
    BrowserModule,
    NgxSmartModalModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
