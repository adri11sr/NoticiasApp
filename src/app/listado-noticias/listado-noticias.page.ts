import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias-service/noticias.service';
import { Noticia } from '../Models/noticia.model';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.page.html',
  styleUrls: ['./listado-noticias.page.scss'],
})
export class ListadoNoticiasPage implements OnInit {

  noticias:Noticia[];

  constructor(
    private noticiasService: NoticiasService,
    private router:Router
    ) { }

  ngOnInit() {
    this.getNoticias();
  }

  getNoticias(){
    this.noticiasService.verNoticias().subscribe((noticiasDB) => {
      console.log(noticiasDB);
      this.noticias = noticiasDB;
    }, (error) => {
      console.log(error);
    });
  }

  irDetalle(noticia: Noticia) {
    this.router.navigate(['noticia-detalle', {noticia:JSON.stringify(noticia)}])
  }

  eliminarNoticia(noticiaID: number, i: number) {
    this.noticiasService.eliminarNoticia(noticiaID).subscribe(() => {
      console.log("Noticia eliminada");
      //this.getNoticias();
      this.noticias.splice(i,1);
    },
    err => {
      console.log(err);
    });

  }

  editarNoticia(noticia: Noticia) {
    this.router.navigate(['/agregar', {noticia: JSON.stringify(noticia)}]);
  }

}
