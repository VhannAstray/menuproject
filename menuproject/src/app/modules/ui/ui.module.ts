import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes, Router } from '@angular/router';

import { CalendarComponent } from './../../components/calendar/calendar.component';
import { DetailrecettesComponent } from './../../components/detailrecettes/detailrecettes.component';
import { RecettesComponent } from './../../components/recettes/recettes.component';

const appRoutes: Routes = [
    { path: 'calendar', component: CalendarComponent },
    { path: 'app-detailrecettes', component: DetailrecettesComponent },
    { path: 'app-recettes', component: RecettesComponent}
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  exports: [LayoutComponent]
})
export class UiModule { }