import {Component, Inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ThemeService} from './services/theme.service';
import {Meta} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'Mon déménagement';

  constructor(private themeService: ThemeService, private metaService: Meta, @Inject(DOCUMENT) private document: Document) {
    this.metaService.addTags([
      {
        name: 'title',
        content: 'Mon déménagement',
      },
      {
        name: 'author',
        content: 'Julien MARTIN',
      },
      {
        name: 'description',
        content: 'Mon déménagement est votre nouvelle application vous permettant d\'organiser votre déménagement',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        property: 'og:title',
        content: 'Mon déménagement',
      },
      {
        property: 'og:site_name',
        content: 'Mon déménagement',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:description',
        content: 'Mon déménagement est votre nouvelle application vous permettant d\'organiser votre déménagement',
      },
      {
        property: 'og:url',
        content: 'https://mon-demenagement.martin-julien-dev.fr',
      },
      {
        property: 'og:image',
        content: 'https://mon-demenagement.martin-julien-dev.fr/assets/images/mon-demenagement.png',
      },
    ])
  }

  ngOnInit() {
    this.document.documentElement.lang = 'fr';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
