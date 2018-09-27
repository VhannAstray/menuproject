import { Component, OnInit } from '@angular/core';
// import service de popup
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'dontcook',
  templateUrl: './dontcook.component.html',
  styleUrls: ['./dontcook.component.scss']
})
export class DontcookComponent implements OnInit {

  // injection du service de popup dans le constructeur
  constructor(public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
  }

  public open(): any {
    this.ngxSmartModalService.getModal('popupcalendar').open();

  }

}
