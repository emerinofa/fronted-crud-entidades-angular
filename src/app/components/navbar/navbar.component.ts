import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule
  ],
  template: `<p>navbar works!</p>`,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {

  public sidebarItems = [
    {
      label: 'Gestion de entidades',
      url: '/entidades',
      icon: 'add_business'
    },
    {
      label: 'Gestion de documentos',
      url: '/lista-tipo-documento',
      icon: 'folder'
    },
    {
      label: 'Gestion de contribuyentes',
      url: '/lista-tipo-contribuyente',
      icon: 'person'
    }
  ]

  isLoggedIn = false;
  user:any = null;

  constructor(public login:LoginService, private router:RouterModule, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )
  }

  public logout() {
    this.login.logout();
    window.location.reload();
    window.location.href = "/login";
  }

  onToolbarDblClick(): void {
    // Aquí puedes definir lo que quieres que suceda cuando se haga doble clic en la barra de herramientas
    console.log('Se hizo doble clic en la barra de herramientas');
  }
}
