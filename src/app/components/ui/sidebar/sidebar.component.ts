import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {AuthService} from '../../../services/auth.service';
import {StorageService} from '../../../services/storage.service';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isMenuOpen = false;
  @Output() updateMenuOpen: EventEmitter<boolean>;
  isLoggedIn = false;
  isMobile = false;
  isDesktopInitialState = true;
  private resizeListener: any;

  constructor(private themeService: ThemeService, private authService: AuthService, private storageService: StorageService, private router: Router) {
    this.updateMenuOpen = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }

    this.getIsMobile();
    this.resizeListener = () => {
      this.getIsMobile();
    };
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
    this.updateMenuOpen.emit(this.isMenuOpen)
  }

  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('');
      this.storageService.clean();
    });
    this.isLoggedIn = false;
  }

  getIsMobile(): boolean {
    this.isMenuOpen = true;
    const MOBILE_BREAKPOINT = 768;
    this.isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    // console.log(this.isMobile);
    if (this.isMobile) {
      this.isMenuOpen = false;
    }
    return this.isMobile;
  }

}
