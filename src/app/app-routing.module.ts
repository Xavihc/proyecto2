import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SetProductosComponent } from './backend/set-productos/set-productos.component';
import { ClimaComponent } from './pages/clima/clima.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SplashComponent } from './pages/splash/splash.component';


const routes: Routes = [
  {
    path: '',
    component: PerfilComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'set-productos',
    component: SetProductosComponent
  },
  {
    path: 'clima',
    component: ClimaComponent
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    component: SplashComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
