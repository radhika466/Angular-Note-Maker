import { Component, OnInit } from '@angular/core';
import { NotestorageService } from '../../services/notestorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private storage: NotestorageService, private router: Router) {}
  noteList;

  ngOnInit(): void {
    this.getNoteList();
  }

  getNoteList() {
    this.noteList = this.storage.get();
  }

  editItem(id) {
    this.router.navigate(['./notes/', id]);
  }

  deleteItem(id) {
    this.noteList = this.storage.destroy(id);
  }
}
