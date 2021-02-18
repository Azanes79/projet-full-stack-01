import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/_services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    pwd: ['', [Validators.required, Validators.minLength(6)]],
    confirmPwd: ['', [Validators.required]]
  }, { validators: this.checkPasswords });

  errorMessage: string;
  constructor(public authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

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

  getErrorMessageConfirmPwd() {
    if (this.form.hasError('notSame')) {
      this.form.controls.confirmPwd.setErrors({notSame: true})
      return `Le mot de passe ne correspond pas`;
    }
  }

  checkPasswords(form: FormGroup) {
      const password = form.controls.pwd.value;
      const confirmPassword = form.controls.confirmPwd.value;
      return password === confirmPassword ? null : { notSame: true }
  }

  async onSubmit() {
    this.errorMessage = undefined;
    if (this.form.valid) {
      const result = await this.authService.SignUp(this.form.get('email').value, this.form.get('pwd').value);
      this.errorMessage = result;
    }
  }

}
