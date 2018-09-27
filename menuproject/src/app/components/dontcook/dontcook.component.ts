import { Component, OnInit } from '@angular/core';
// import service de popup
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-dontcook',
  templateUrl: './dontcook.component.html',
  styleUrls: ['./dontcook.component.scss']
})
export class DontcookComponent implements OnInit {

  public infoCase: String;

  // injection du service de popup dans le constructeur
  constructor(public ngxSmartModalService: NgxSmartModalService) {

  }

  ngOnInit() {
  }

  public open(param: any): any {
    console.log(param);
    console.log(this);
    this.ngxSmartModalService.getModal('popupcalendar').open();
    
  }
}
