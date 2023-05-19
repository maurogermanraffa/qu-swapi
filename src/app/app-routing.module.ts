import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const commonsRoutes: Routes = [
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then(
        (m) => m.SearchModule
      ),
  },
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/search' },
];
@NgModule({
  imports: [RouterModule.forRoot(commonsRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
