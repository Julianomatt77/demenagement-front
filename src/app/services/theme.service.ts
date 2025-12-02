import { Injectable, Renderer2, RendererFactory2, DOCUMENT } from '@angular/core';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private darkMode: boolean = false;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  private initTheme(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Vérifie si un thème est stocké dans localStorage (pour persistance)
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
      this.setDarkMode(true);
    } else {
      this.setDarkMode(false);
    }

    // Écoute les changements de préférences système
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (localStorage.getItem('theme') === null) {
        this.setDarkMode(e.matches);
      }
    });
  }

  setDarkMode(isDark: boolean): void {
    this.darkMode = isDark;
    if (isDark) {
      this.renderer.addClass(this.document.documentElement, 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleTheme(): void {
    this.setDarkMode(!this.darkMode);
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }
}
