import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form = new FormGroup({
    email_address: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])

  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    document.getElementById('spinner').style.display = "block";
    axios.post("https://btal-ride.herokuapp.com/api/client/login", this.form.value).then(res => {
      document.getElementById('spinner').style.display = "none";
      this.router.navigate(['/userhome']);
      console.log(this.form.value);
    }).catch(err => {
      alert(err);
    })
  }

}
