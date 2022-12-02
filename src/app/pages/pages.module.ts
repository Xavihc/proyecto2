import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    
    
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    
  ]
})
export class PagesModule { }
