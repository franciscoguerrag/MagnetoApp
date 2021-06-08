import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { userValidator, passwordValidator } from '../utils/validators';
import { map } from 'rxjs/operators';
import { CrudService } from '../model/crudService';

@Component({
    selector: 'dashboard-root',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    tutorials: any;
    
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private crudService:CrudService
    ) { }

    ngOnInit() {
        this.crudService.GetUsersList().snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.key, ...c.payload.val() })
              )
            )
            ).subscribe(data => {
                this.tutorials = data;
                console.log('tutorials',data);
            });
       
    }

}

