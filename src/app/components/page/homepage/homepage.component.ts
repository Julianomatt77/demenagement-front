import {Component, effect, inject} from '@angular/core';
import {StorageService} from '../../../services/storage.service';
import {environment} from '../../../../environments/environment';
import {RouterModule} from "@angular/router";
import {CommonService} from '../../../services/common.service';

const HAS_RELOADED = environment.has_reloaded;

@Component({
  selector: 'app-homepage',
  standalone: true,
    imports: [
        RouterModule
    ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  isLoggedIn: boolean = false;
  commonService = inject(CommonService);
  storageService = inject(StorageService);

  constructor() {
    effect(() => {
      this.isLoggedIn = this.commonService.isLoggedIn();
    });
  }

  ngOnInit(): void {
    const hasReloaded = window.sessionStorage.getItem(HAS_RELOADED);
    if (!hasReloaded) {
      window.sessionStorage.setItem(HAS_RELOADED, 'true');
      window.location.reload();
    }

    this.isLoggedIn = this.commonService.isLoggedIn();
  }
}
