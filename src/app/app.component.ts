import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import firebase from 'firebase/compat/app';

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
    firebase.initializeApp({
      apiKey: "AIzaSyDqNKLnqUxuXNE156e5tB6KNPghSN5KMH8",
      authDomain: "app-workouts.firebaseapp.com",
    });
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}