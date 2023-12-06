import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GoogleBooksAPI } from "google-books-js";
import { LocalService } from '../services/local.service';
import { Book } from '../types/book.type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Books Searcher';
  search = new FormControl('');
  currentSearch: string | null = null;
  items: any = [];
  googleBooksApi = new GoogleBooksAPI();

  constructor (private localService: LocalService) {}

  async handleSearch() {
    console.log(this.search.value);
    if (this.currentSearch === this.search.value) return;

    const result = await this.googleBooksApi.search({
      filters: {
        title: this.search.value || '',
      },
    });

    this.currentSearch = this.search.value;
    this.items = result.items;
  
    console.log(result);
  }

  async addToStorage(bookId: string) {
    const storage: any = this.localService.getData('booksStorage');
    const currentStorage = JSON.parse(storage) || [];
    console.log(currentStorage);

    if (currentStorage.length && currentStorage.some((item: string) => item === bookId)) return;

    currentStorage.push(bookId);

    this.localService.saveData('booksStorage', JSON.stringify(currentStorage));
  }
}
