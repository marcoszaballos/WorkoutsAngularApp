import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import firebase from 'firebase/compat/app';
import { environment } from '../environment'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'WorkoutsAppAngular';

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void{
    firebase.initializeApp(environment.firebaseConfig);
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}