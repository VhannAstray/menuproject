import { Component, OnInit } from '@angular/core';
// import service de popup
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-appel-pop',
  templateUrl: './appel-pop.component.html',
  styleUrls: ['./appel-pop.component.scss']
})
export class AppelPopComponent implements OnInit {
  // injection du service de popup dans le constructeur
  constructor(public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
  }

}
