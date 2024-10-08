import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public correo: string = '';
  public isAlertOpen: boolean = false;
  public alertButtons: any[] = [];

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  
  async recuperarContrasena() {
    // Verifica que this.correo esté definido y no vacío
    if (!this.correo || this.correo.trim() === '') {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Campo obligatorio',
        buttons: ['OK']
      });
  
      await alert.present();
    } else {
      // Busca el usuario por correo
      const usuarioEncontrado = Usuario.buscarUsuarioPorCorreo(this.correo);
  
      if (!usuarioEncontrado) {
        // Redirige a la página de error si no se encuentra el usuario
        this.router.navigate(['/incorrecto']);
      } else {
        // Si el usuario es encontrado, redirige a la página de pregunta secreta
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usuarioEncontrado
          }
        };
        this.router.navigate(['/pregunta'], navigationExtras);
      }
    }
  }
  

  volverAlInicio() {
    this.router.navigate(['/ingreso']);
  }

}
