import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/_services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    pwd: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage: string;
  constructor(public authService: AuthService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form.reset();
  }

  getErrorMessageEmail() {
    if (this.form.get('email').hasError('required')) {
      return `l'email est obligatoire`;
    }
    return this.form.get('email').hasError('email') ? `L'email n'est pas valide` : '';
  }

  getErrorMessagePwd() {
    if (this.form.get('pwd').hasError('required')) {
      return `le mot de passse est obligatoire`;
    }
    return this.form.get('pwd').hasError('minlength') ? `Le mot de passe doit contenir 6 caractères minimum` : '';
  }

  async onSubmit() {
    this.errorMessage = undefined;
    if(this.form.valid) {
      const result = await this.authService.SignIn(this.form.get('email').value, this.form.get('pwd').value);
      this.errorMessage = result;
    }
  }


  goToSignUp() {
    this.router.navigate(['auth/signUp'])
  }

}
