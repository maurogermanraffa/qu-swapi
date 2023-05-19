import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavigatorService } from 'src/app/core/shared/services/navigation/navigator.service';

@Component({
  selector: 'wb-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isMobile: boolean = true;

  constructor(
    private _location: Location,
    private navigatorService: NavigatorService
  ) {
    this.isMobile = this.navigatorService.isMobile;
  }

  onBackClick() {
    this._location.back();
  }
}
