import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// components
import { CardComponent } from './card/card.component';
import { HeadboardComponent } from './headboard/headboard.component';
import { HeaderComponent } from './header/header.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SearchTextComponent } from './search/search-text.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    CardComponent,
    HeaderComponent,
    SearchTextComponent,
    HeadboardComponent,
    PaginatorComponent,
  ],
  exports: [
    CardComponent,
    HeaderComponent,
    SearchTextComponent,
    HeadboardComponent,
    PaginatorComponent,
  ],
})
export class ComponentsModule { }
