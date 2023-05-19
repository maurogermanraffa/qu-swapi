import { NgModule } from '@angular/core';
import { NavigatorService } from './services/navigation/navigator.service';
import { SWApiService } from './services/swapi/swapi.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [SWApiService, NavigatorService],
})
export class SharedModule { }
