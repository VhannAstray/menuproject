import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSmartModalModule, NgxSmartModalService  } from 'ngx-smart-modal';

import { AppComponent } from './app.component';
import { PopupComponent } from './components/popup/popup.component';
import { ContenuPopComponent } from './components/contenu-pop/contenu-pop.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    ContenuPopComponent
  ],
  imports: [
    BrowserModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
