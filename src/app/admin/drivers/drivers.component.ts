import { Component, OnInit } from '@angular/core';
import { Driver } from '../../services/models';
import { DriversService } from 'src/app/services/drivers.service';
import axios from 'axios';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  form = new FormGroup({
    firstname: new FormControl('',Validators.required),
    lastname : new FormControl('', Validators.required),
    contact_number : new FormControl('', Validators.required),
    license: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required)
  });
  drivers: Driver[];

  constructor(
    private driverService: DriversService,
    private router : Router

    ) { }

  ngOnInit(): void {
    this.getDrivers()
  }

  getDrivers(){
    this.driverService.getDrivers().subscribe(drivers => {
      this.drivers = drivers as Driver[];
      console.log(drivers);
    })
  }
  UpdateDriver(id){
    this.router.navigate(['/admin/update-driver/'+id]);
  }
  addnewDriver(){
    console.log(this.form.value);
    axios.post("https://btal-ride.herokuapp.com/api/admin/driver", this.form.value).then(res => {
      document.getElementById("table").style.display = "none";
      this.router.navigate(['/admin']);
    }).catch(err => {
      console.log(err)
    })
  }
  addDriver(){
    document.getElementById("table").style.display = "block";
  }
  deleteDriver(id){
    console.log(id);
    axios.delete("https://btal-ride.herokuapp.com/api/admin/driver/"+id).then(res => {
      this.router.navigate(['/admin']);
    }).catch(err => {
      console.log(err)
    })
  }
}
