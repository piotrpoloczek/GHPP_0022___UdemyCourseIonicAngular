import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private loadingCtrl: LoadingController
  ) { }


  ngOnInit() {
  }

  onLogin() {
    this.authService.login();
    this.isLoading = true;
    this.loadingCtrl.create({keyboardClose: true, message: 'Logging in...'}).then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        loadingEl.dismiss();
      }, 1500);
    });
    setTimeout(() => {
      // this.isLoading = false;
      this.router.navigateByUrl('/places/tabs/discover');
    }, 1500);
  }

  onLogout() {
    this.authService.logout();
  }

  onSubmit(form: NgForm){
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    console.log(email, password);

    if(this.isLogin) {
      this.onLogin();
    } else {
      // this.onSignup();
    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }
}
