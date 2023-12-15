import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        AppComponent,
    ],
    exports: [
        FormsModule,
        LoginComponent,
        CommonModule,
    ],
    providers: [
        authInterceptorProviders,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        NavbarComponent,
        SignupComponent,
        MatFormFieldModule,
        HttpClientModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        LoginComponent,
        MatIconModule,
    ]
})
export class AppModule {
}
