import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { reject } from 'q';
import { LoginService } from '../services/login.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  formLogin: FormGroup;
  userId: string;
  email: string;
  token: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private navCtrl: NavController
  ) {
    this.createForm();
  }


  ionViewWillEnter() {
    this.createForm();
  }

  private createForm() {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.loginService.post(this.formLogin.value).subscribe((response: any) => {
      console.log('Resonse', response);
      this.loginService.setCookie('user_id', response.user_id);
      this.loginService.setCookie('email', response.email);
      this.loginService.setCookie('token', response.token);
      this.userData();
    },
      (error) => {
        console.log(error.json);
        reject(error.json);
      });
  }

  userData() {
    this.email = this.loginService.getCookie('email');
    this.userId = this.loginService.getCookie('user_id');
    this.token = this.loginService.getCookie('token');
  }

  logout() {
    this.loginService.clearCookie();
  }

  irParaProdutos(){
    this.navCtrl.navigateForward('produtos');
  }
}