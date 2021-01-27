import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])

  });
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  login() {
    document.getElementById('spinner').style.display = "block";
    axios.post("https://btal-ride.herokuapp.com/api/admin/login", this.form.value).then(res => {
    document.getElementById('spinner').style.display ="none";
      return this.router.navigate(['/admin']);
    }).catch(err => {
      console.log(err)
    })
  }

}
