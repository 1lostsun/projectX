import { LocalService } from './../services/local.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleBooksAPI } from "google-books-js";
import { Book } from '../types/book.type';

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

  constructor (private localService: LocalService) {}

  ngOnInit(): void {
    this.items = [];

    const storage: any = this.localService.getData('booksStorage');
    const currentStorage = JSON.parse(storage) || [];
    
    for (const bookId of currentStorage) {
      const book: any  = this.googleBooksApi.getVolume(bookId);
      book.then((res: any)  => {
        this.items.push(res)
      });
    }
  }

  remove(bookId: string) {
    const storage: any = this.localService.getData('booksStorage');
    const currentStorage = JSON.parse(storage) || [];
    if (!currentStorage.length) return;
    if (!currentStorage.some((item: string) => item === bookId)) return;

    const updatedStorage = currentStorage.filter((item: string) => item !== bookId);
    this.items = this.items.filter((item: Book) => item.id !== bookId);

    this.localService.saveData('booksStorage', JSON.stringify(updatedStorage));
  }
}
