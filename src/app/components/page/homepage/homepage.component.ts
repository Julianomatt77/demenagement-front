import { Component } from '@angular/core';
import {StorageService} from '../../../services/storage.service';
import {environment} from '../../../../environments/environment';

const HAS_RELOADED = environment.has_reloaded;

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  isLoggedIn: boolean;

  constructor(private storageService: StorageService) {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  ngOnInit(): void {
    const hasReloaded = window.sessionStorage.getItem(HAS_RELOADED);
    if (!hasReloaded) {
      window.sessionStorage.setItem(HAS_RELOADED, 'true');
      window.location.reload();
    }

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }
}
