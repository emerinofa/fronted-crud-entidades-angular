import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { EntitiesComponent } from './components/entities/entities.component';
import { EntitiesFormComponent } from './pages/entities-form/entities-form.component';
import { TipoContribuyentesComponent } from './components/taxpayers-type/taxpayers-type.component';
import { TipoContribuyenteFormComponent } from './pages/taxpayers-type-form/tipo-contribuyentes-form.component';
import { DocumentTypeComponent } from './components/document-type/document-type.component';
import { TipoDocumentoFormComponent } from './pages/tipo-documentos-form/documents-type-form.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'entidades',
        component: EntitiesComponent,
        pathMatch: 'full',
        canActivate:[ AdminGuard ]
    },
    {
        path: 'entidades/formulario',
        component: EntitiesFormComponent,
        pathMatch: 'full',
        canActivate:[ AdminGuard ]
    },
    {
        path: 'entidades/formulario/:id',
        component: EntitiesFormComponent,
        pathMatch: 'full',
        canActivate:[ AdminGuard ]
    },
    {
        path: 'lista-tipo-contribuyente',
        component: TipoContribuyentesComponent,
        pathMatch: 'full',
        canActivate:[ AdminGuard ]
    },
    {
        path: 'lista-tipo-contribuyente/formulario-tipo-contribuyente',
        component: TipoContribuyenteFormComponent,
        pathMatch: 'full',
        canActivate:[ AdminGuard ]
    },
    {
        path: 'lista-tipo-contribuyente/formulario-tipo-contribuyente/:id',
        component: TipoContribuyenteFormComponent,
        pathMatch: 'full',
        canActivate:[ AdminGuard ]
    },
    {
        path: 'lista-tipo-documento',
        component: DocumentTypeComponent,
        pathMatch: 'full',
        canActivate:[ AdminGuard ]
    },
    {
        path: 'lista-tipo-documento/formulario-tipo-documento',
        component: TipoDocumentoFormComponent,
        pathMatch: 'full',
        canActivate:[ AdminGuard ]
    },
    {
        path: 'lista-tipo-documento/formulario-tipo-documento/:id',
        component: TipoDocumentoFormComponent,
        pathMatch: 'full',
        canActivate:[ AdminGuard ]
    },
    {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'admin',
        component: DashboardComponent,
        pathMatch: 'full',
        canActivate: [ AdminGuard ],
    },
    {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        pathMatch: 'full',
        canActivate: [ NormalGuard ],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {

}
