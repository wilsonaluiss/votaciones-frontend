import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateAdapter, MatNativeDateModule, MatRippleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { MatTimepickerModule } from 'mat-timepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from './utils/material.module';
import { authInterceptorProviders } from './services/auth.interceptor';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { PuntosAtencionComponent } from './pages/admin/puntos-atencion/puntos-atencion.component';
import { UsuariosAtencionComponent } from './pages/admin/usuarios-atencion/usuarios-atencion.component';
import { TipoQuejasComponent } from './pages/admin/tipo-quejas/tipo-quejas.component';
import { AsignacionRechazoComponent } from './pages/admin/asignacion-rechazo/asignacion-rechazo.component';
import { UsuariosPuntoAtencionComponent } from './pages/admin/usuarios-punto-atencion/usuarios-punto-atencion.component';
import { AdministracionUsuariosComponent } from './pages/admin/administracion-usuarios/administracion-usuarios.component';
import { CentralizadorComponent } from './pages/centralizador/centralizador/centralizador.component';
import { CentralizadorDashboardComponent } from './pages/centralizador/centralizador-dashboard/centralizador-dashboard.component';
import { CentralizadorSidebarComponent } from './pages/centralizador/centralizador-sidebar/centralizador-sidebar.component';
import { OperadorComponent } from './pages/operador/operador/operador.component';
import { OperadorDashboardComponent } from './pages/operador/operador-dashboard/operador-dashboard.component';
import { OperadorSidebarComponent } from './pages/operador/operador-sidebar/operador-sidebar.component';
import { AnalisisComponent } from './pages/centralizador/analisis/analisis.component';
import { QuejasUsuarioComponent } from './pages/user/quejas-usuario/quejas-usuario.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { ConsultaUsuarioComponent } from './pages/user/consulta-usuario/consulta-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    PuntosAtencionComponent,
    UsuariosAtencionComponent,
    TipoQuejasComponent,
    QuejasUsuarioComponent,
    AsignacionRechazoComponent,
    UsuariosPuntoAtencionComponent,
    AdministracionUsuariosComponent,
    UserDashboardComponent,
    CentralizadorComponent,
    CentralizadorDashboardComponent,
    CentralizadorSidebarComponent,
    OperadorComponent,
    OperadorDashboardComponent,
    OperadorSidebarComponent,
    UserSidebarComponent,
    ConsultaUsuarioComponent,
    AnalisisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MaterialModule,
    HttpClientModule,
    MatAutocompleteModule,
  ],
  exports: [
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatTableModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatProgressBarModule,
    NgxSpinnerModule,
    MatDividerModule,
    CommonModule,
    MatFormFieldModule,
    MatTimepickerModule
    
  ],
  providers: [ authInterceptorProviders,
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'accent' } },
    //{ provide: MatPaginatorIntl, useValue: CustomPaginator() },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
