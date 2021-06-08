import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../model/crudService';
import { userValidator, passwordValidator } from '../utils/validators';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Component({
    selector: 'login-root',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    signInForm: FormGroup;
    login = false;
    users: any;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private crudService: CrudService
    ) { }

    ngOnInit() {
        this.signInForm = this.formBuilder.group({
            user:  [null, userValidator],
            password: [null, passwordValidator]
        });
    }

  
    onSubmit = () => {
        if (this.signInForm.valid) {
           this.login = false;
           this.crudService.GetUsersList().snapshotChanges().pipe(
            map(actions => 
              actions.map(a => {
                const data = a.payload.val() as User;
                const id = a.key
                return { id, ...data };
              }).filter(a =>
                a.user ==  this.signInForm.get('user').value &&
                a.password == this.signInForm.get('password').value 
              )
            )).subscribe(data => {
               if (data.length) {
                 this.router.navigate(['dashboard']);
                }
                else{
                    this.login = true;
                }
            });;
           
           
        }
     
        return false;
    }
}

