import { Component, OnInit } from '@angular/core';
import { NotestorageService } from '../../services/notestorage.service';
import { Router, ActivatedRoute } from '@angular/router';

interface noteItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  lastOpenedAt: string;
}

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  constructor(
    private storage: NotestorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  noteListItem: noteItem = {
    id: '',
    title: '',
    content: '',
    createdAt: '',
    lastOpenedAt: '',
  };

  itemId: string;

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params?.id;
    if (this.itemId) this.getNoteListItem(this.itemId);
  }

  getNoteListItem(id) {
    this.noteListItem = this.storage.getItem(id);
  }

  saveNote() {
    this.itemId ? this.updateNote() : this.addNote();
  }

  addNote() {
    const item = {
      title: this.noteListItem.title,
      content: this.noteListItem.content,
    };
    this.storage.post(item);
    this.router.navigateByUrl('/home');
  }

  updateNote() {
    const itemChange = {
      title: this.noteListItem.title,
      content: this.noteListItem.content,
    };
    this.storage.put(this.itemId, itemChange);
    this.router.navigateByUrl('/home');
  }

  deleteItem(id) {
    this.storage.destroy(id);
    this.router.navigateByUrl('/home');
  }
}
