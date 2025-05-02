import {Component, HostListener, Inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ThemeService} from './services/theme.service';
import {Meta} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';
import {SidebarComponent} from './components/ui/sidebar/sidebar.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('contentState', [
      state('open', style({
        transform: 'translateX(0)'
      })),
      state('closed', style({
        transform: 'translateX(-100%)'
      })),
      transition('* <=> *', [
        animate('0.3s ease-in-out')
      ])
    ]),
  ]
})
export class AppComponent{
  isMenuOpen = false;
  isMobile = false;
  private resizeListener: any;
  contentClass = 'w-full xs:w-11/12 md:w-10/12';
  showScrollTop = false;
  showScrollBottom = false;

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

    this.getIsMobile();
    this.resizeListener = () => {
      this.getIsMobile();
    };
    window.addEventListener('resize', this.resizeListener);
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
    this.getContentClass();
  }

  // Ferme la sidebar sur mobile lors du click sur un menu de navigation
  onMenuUpdate(isOpen: boolean) {
    this.isMenuOpen = isOpen;
    this.getContentClass();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  getIsMobile(): boolean {
    this.isMenuOpen = true;
    const MOBILE_BREAKPOINT = 768;
    this.isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (this.isMobile) {
      this.isMenuOpen = false;
    }

    this.getContentClass();

    return this.isMobile;
  }

  getContentClass(): string {
    if (this.isMobile) {
      this.contentClass = 'w-full';
    } else {
      if (this.isMenuOpen) {
        this.contentClass = 'w-full sm:w-11/12 md:w-10/12';
      } else {
        this.contentClass = 'w-full';
      }
    }
    return this.contentClass;
  }

  getContentState(): string {
    if (this.isMobile && this.isMenuOpen) {
      return 'hidden';
    } else if (!this.isMobile && this.isMenuOpen) {
      return 'partial';
    } else {
      return 'full';
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.showScrollTop = window.scrollY > 200;

    const scrollBottom = window.innerHeight + window.scrollY;
    const pageHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    this.showScrollBottom = scrollBottom < pageHeight - 50;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

}
