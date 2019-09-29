import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listado-noticias',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'listado-noticias', loadChildren: './listado-noticias/listado-noticias.module#ListadoNoticiasPageModule' },
  { path: 'noticia-detalle', loadChildren: './noticia-detalle/noticia-detalle.module#NoticiaDetallePageModule' },
  { path: 'agregar', loadChildren: './agregar/agregar.module#AgregarPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
