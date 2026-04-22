import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 2000,
    });
    await loading.present();

    const email = this.registrationForm.get('email')!.value;
    const password = this.registrationForm.get('password')!.value;

    const data = {
      email: email,
      password: password,
    };

    this.http.post('https://reqres.in/api/register', data).subscribe(
      async (response) => {
        console.log('Register response', response);

        const alert = await this.alertController.create({
          header: 'Success',
          message: 'You have been registered successfully',
          buttons: ['OK'],
        });
        await alert.present();
        console.log("ahhji35csh",response);
        await loading.dismiss();

        this.router.navigate(['/login']);
      },
      async (error) => {
        console.error('Register error', error);

        const alert = await this.alertController.create({
          header: 'Error',
          message: error.error.error,
          buttons: ['OK'],
        });
        await alert.present();

        await loading.dismiss();
      }
    );
  }
}
