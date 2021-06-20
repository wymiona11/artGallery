import { AllPaintingsComponent } from './paintings/all-paintings/all-paintings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingResolverService } from './services/resolver.service';

const routes: Routes = [
  {
    path: 'all-paintings',
    component: AllPaintingsComponent,
    resolve:{
      paintings: PaintingResolverService
    }
  },
  {
    path: '',
    redirectTo: '/all-paintings',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
