import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search.routing';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    SharedModule,
    ComponentsModule,
    NgbDropdownModule
  ],
  providers: [],
})
export class SearchModule { }
