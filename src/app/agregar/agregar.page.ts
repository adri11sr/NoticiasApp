import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias-service/noticias.service';
import { Autor } from '../Models/autor.model';
import { Noticia } from '../Models/noticia.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  autores: Autor[] = new Array<Autor>();
  noticia: Noticia = new Noticia();
  esEditable: boolean = false;

  constructor(
    private noticiasService: NoticiasService,
    private route: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private estado: ActivatedRoute
  ) { }

  ngOnInit() {

    if(this.estado.snapshot.params.noticia != undefined){
      this.esEditable = true;
      this.noticia = new Noticia(JSON.parse(this.estado.snapshot.params.noticia));
    }

    this.obtenerAutores();
  }

  private obtenerAutores(){
    this.noticiasService.listadoAutores().subscribe((listAutores) => {
      console.log(listAutores);
      this.autores = listAutores;
    });
  }

  async guadarNoticia(){

    const loading = await this.loadingController.create({
      message: 'Guardando la noticia',
    });
    await loading.present();

    console.log(this.noticia);
    this.noticiasService.agregarNoticia(this.noticia).subscribe(()=> {
      this.mostrarMensaje('Noticia guardada');
      console.log("Se ha guardado");
      loading.dismiss();
      this.route.navigate([''])
    },
    (err) => {
      this.mostrarMensaje('Ocurrio algun error');
      loading.dismiss();
      console.log(err);
    });
  }

  async modificarNoticia() {
    const loading = await this.loadingController.create({
      message: 'Editando la noticia',
    });
    await loading.present();

    console.log(this.noticia);
    this.noticiasService.editarNoticia(this.noticia).subscribe(()=> {
      this.mostrarMensaje('Noticia modificada');
      console.log("Se ha modificado la noticia");
      loading.dismiss();
      this.route.navigate([''])
    },
    (err) => {
      this.mostrarMensaje('Ha ocurrio un error');
      loading.dismiss();
      console.log(err);
    });
  }

  private async mostrarMensaje(mensaje: string){
    
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();

  }

}
