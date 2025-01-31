import { Routes } from '@angular/router';
import { PaginaBienvenidaComponent } from './components/pagina-bienvenida/pagina-bienvenida.component';

export const routes: Routes = [
    {
        path:'',
        component:PaginaBienvenidaComponent,
        pathMatch:'full'
    }
];
