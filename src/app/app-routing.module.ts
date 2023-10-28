import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { PuntosAtencionComponent } from './pages/admin/puntos-atencion/puntos-atencion.component';
import { UsuariosPuntoAtencionComponent } from './pages/admin/usuarios-punto-atencion/usuarios-punto-atencion.component';
import { TipoQuejasComponent } from './pages/admin/tipo-quejas/tipo-quejas.component';
import { AdministracionUsuariosComponent } from './pages/admin/administracion-usuarios/administracion-usuarios.component';
import { AdminGuard } from './services/admin.guard';
import { OperadorGuard } from './services/operador.guard';
import { UsuarioGuard } from './services/usuario.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { QuejasUsuarioComponent } from './pages/user/quejas-usuario/quejas-usuario.component';
import { ConsultaUsuarioComponent } from './pages/user/consulta-usuario/consulta-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [UsuarioGuard],
    children: [
     {
        path: 'puntos-atencion',
        component: PuntosAtencionComponent
      },
      {
        path: 'usuarios-punto-atencion',
        component: UsuariosPuntoAtencionComponent
      },
      {
        path: 'tipo-quejas',
        component: TipoQuejasComponent
      },
      {
        path: 'admin-usuarios',
        component: AdministracionUsuariosComponent
      }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'usuario',
        component: QuejasUsuarioComponent
      },
      {
        path: 'consulta',
        component: ConsultaUsuarioComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
