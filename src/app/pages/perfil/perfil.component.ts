import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Cliente } from 'src/app/backend/models';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  cliente: Cliente = {
    uid: '',
    email: '',
    celular: '',
    foto: '',
    referencia: '',
    nombre: '',
    segundoNombre: '',
    apellido: '',
    segundoApellido: '',
    ubicacion: null,
    referenciaDos: '',
  };

  newFile: any;

  uid = '';

  suscriberUserInfo: Subscription;

  ingresarEnable = false;

  constructor(public menucontroler: MenuController,
              public firebaseauthService: FirebaseauthService,
              public firestorageService: FirestorageService,
              public firestoreService: FirestoreService) { 

        this.firebaseauthService.stateAuth().subscribe( res => {
          console.log(res)
          if (res !== null) {
            this.uid = res.uid;
            this.getUserInfo(this.uid);
          } else {
            this.initCliente()
          }

        });
  }

  async ngOnInit() {
    
    const uid = await this.firebaseauthService.getUid();
    console.log(uid);

  }
  
  initCliente() {
    this.uid = '';
    this.cliente = {
      uid: '',
      email: '',
      celular: '',
      foto: '',
      referencia: '',
      nombre: '',
      segundoNombre: '',
      apellido: '',
      segundoApellido: '',
      referenciaDos: '',
      ubicacion: null,
    };
    console.log(this.cliente)
  }

  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }


  async newImageUpload(event: any) { 
    if (event.target.files && event.target.files[0]) {
      
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.cliente.foto = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
 }

  async registrarse() {
    const credenciales = {
      email: this.cliente.email,
      password: this.cliente.celular,
    };
    const res = await this.firebaseauthService.registrar(credenciales.email, credenciales.password).catch( err => {
      console.log('error -> ', err)
    });
    const uid = await this.firebaseauthService.getUid();
    this.cliente.uid = uid;
    this.guardarUser(); 
    //console.log(uid);
    
 }

 async guardarUser() {

  const path = 'Clientes';
  const name = this.cliente.nombre;
  if (this.newFile !== undefined) {
    const res = await this.firestorageService.uploadImage(this.newFile, path, name);
    this.cliente.foto = res;
  }
  this.firestoreService.createDoc(this.cliente, path, this.cliente.uid).then( res => {
    console.log('guardado con exito')
  }).catch( error => {
  });
}

  async salir() {
    //const uid = await this.firebaseauthService.getUid();
    //console.log('saliste')
    this.firebaseauthService.logout();
    this.suscriberUserInfo.unsubscribe();
  }
  
  getUserInfo(uid:string) {
    const path = 'Clientes';
    this.suscriberUserInfo = this.firestoreService.getDoc<Cliente>(path, uid).subscribe( res => {
      this.cliente = res;
    });
  }
  

  ingresar() {

    const credenciales = {
      email: this.cliente.email,
      password: this.cliente.celular,
    };
    this.firebaseauthService.login(credenciales.email,credenciales.password).then( res => {
      console.log('ingresaste')
    })
  }


}
