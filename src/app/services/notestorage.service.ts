import { Injectable } from '@angular/core';

interface noteItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  lastOpenedAt: string;
}

const storageName = 'note_list';

const defaultList = [
  {
    id: '30151767745',
    title: 'ng new',
    content:
      'The Angular CLI makes it easy to create an application that already works, right out of the box. It already follows our best practices!',
    createdAt: '1613291296964',
    lastOpenedAt: '1613291296964',
  },
  {
    id: '398445531588',
    createdAt: '1613291296964',
    lastOpenedAt: '1613291296964',
    title: 'ng generate',
    content:
      'Generate components, routes, services and pipes with a simple command. The CLI will also create simple test shells for all of these.',
  },
  {
    id: '1613290416245',
    createdAt: '1613291288113',
    lastOpenedAt: '1613291288113',
    title: 'ng serve',
    content: 'Easily test your app locally while developing.',
  },
  {
    id: '165639324391',
    createdAt: '1613291505260',
    lastOpenedAt: '1613291505260',
    title: 'Test, Lint',
    content:
      'Make your code really shine. Run your unit tests, your end-to-end tests, or execute the official Angular linter with the breeze of a command.',
  },
];

@Injectable({
  providedIn: 'root',
})
export class NotestorageService {
  private noteList;

  constructor() {
    this.noteList =
      JSON.parse(localStorage.getItem(storageName)) || defaultList;
  }

  // get items
  get() {
    const messageIds = Object.keys(this.noteList);
    const noteListItems = messageIds
      .map((id) => this.noteList[id])
      .sort((a, b) => (a.lastOpenedAt < b.lastOpenedAt ? 1 : -1));
    return [...noteListItems];
  }

  // get an Item
  getItem(itemId) {
    return this.noteList.filter((x) => x.id === itemId)[0];
  }

  // add a new item
  post(item) {
    const noteitem: noteItem = {
      ...item,
      id: this.uniqueID().toString(),
      createdAt: this.timeStamp().toString(),
      lastOpenedAt: this.timeStamp().toString(),
    };
    this.noteList.push(noteitem);
    return this.update();
  }

  // update an item
  put(itemId, changeItem) {
    const updatedItem = { ...changeItem, lastOpenedAt: this.timeStamp() };
    Object.assign(this.noteList[this.findItemIndex(itemId)], updatedItem);
    return this.update();
  }

  // remove an item
  destroy(itemId) {
    this.noteList.splice(this.findItemIndex(itemId), 1);
    return this.update();
  }

  private update() {
    localStorage.setItem(storageName, JSON.stringify(this.noteList));
    return this.get();
  }

  private findItemIndex(itemId) {
    return this.noteList.findIndex((x) => x.id === itemId);
  }

  uniqueID() {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
  }

  timeStamp() {
    return new Date().getTime();
  }
}
