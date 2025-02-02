import { Routes } from '@angular/router';
import { PaginaBienvenidaComponent } from './components/pagina-bienvenida/pagina-bienvenida.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [
    {
        path:'',
        component:PaginaBienvenidaComponent,
        pathMatch:'full'
    },
    {
        path:'principal',
        component:PaginaPrincipalComponent
    },
    {
        path:'login',
        component:InicioSesionComponent
    },
    {
        path:'registro',
        component:RegistroComponent
    }
];
