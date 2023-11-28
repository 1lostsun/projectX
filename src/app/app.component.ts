import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GoogleBooksAPI } from "google-books-js";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Books Searcher';
  search = new FormControl('');
  currentSearch: string | null = null;
  items: any = [];
  googleBooksApi = new GoogleBooksAPI();

  async handleSearch() {
    console.log(this.search.value);
    if (this.currentSearch === this.search.value) return;

    const result = await this.googleBooksApi.search({
      filters: {
        title: this.search.value || '',
      },
    });

    const test = this.googleBooksApi.getVolume("uaoREAAAQBAJ");

    console.log(test)

    this.currentSearch = this.search.value;
    this.items = result.items;
  
    console.log(result);
  }
}
