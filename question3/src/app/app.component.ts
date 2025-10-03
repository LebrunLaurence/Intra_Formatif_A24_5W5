import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { est10mots } from './est10mots';
import { contientNom } from './commnom';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,ReactiveFormsModule,]
})
export class AppComponent {
  title = 'reactive.form';
  loginForm:FormGroup;

  

  constructor(private formBuilder:FormBuilder) {
    this.loginForm = formBuilder.group(
      {
        nom:['',[Validators.required]],
        roadNumber:['',[Validators.required,Validators.min(1000),Validators.max(9999)]],
        postalCode:['',[Validators.pattern("^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$")]],
        commentaire:['',[est10mots()]]
      },{
        validators: contientNom()
      }
    );
   }
}


