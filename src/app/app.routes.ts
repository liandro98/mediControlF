import { Routes } from '@angular/router';
import { PaginaBienvenidaComponent } from './components/pagina-bienvenida/pagina-bienvenida.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { FormRecetaComponent } from './components/form-receta/form-receta.component';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

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
    },
    {
        path:'servicios',
        component:ServiciosComponent
    },
    {
        path:'formReceta',
        component:FormRecetaComponent
    },
    {
        path:'medicamento',
        component:MedicamentosComponent
    },
    {
        path:'estadistica',
        component:EstadisticasComponent
    }
];
