import { LocalService } from './../services/local.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleBooksAPI } from "google-books-js";

type Book = {
  volumeInfo: {
    title: string,
    description?: string,
    imageLinks?: {
      thumbnail?: string,
      smallThumbnail?: string
    },
    previewLink: string
  }
}

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  providers: [LocalService],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss'
})
export class StorageComponent implements OnInit {
  title: string = 'Избранное';
  items: Array<Book> | any = [];
  googleBooksApi = new GoogleBooksAPI();

  constructor (private localServise: LocalService) {}

  ngOnInit(): void {
    this.items = [];

    const storage: any = this.localServise.getData('booksStorage');
    const currentStorage = JSON.parse(storage) || [];
    
    for (const bookId of currentStorage) {
      const book = this.googleBooksApi.getVolume(bookId);
      console.log(book)
      //if (!book) continue;

      //this.items.push(book);
    }
  }
}
