import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { AllPaintingsComponent } from './paintings/all-paintings/all-paintings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingResolverService } from './services/resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'all-paintings',
    component: AllPaintingsComponent,
    resolve:{
      paintings: PaintingResolverService
    }
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '',
    redirectTo: '/all-paintings',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo:'/page-not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
