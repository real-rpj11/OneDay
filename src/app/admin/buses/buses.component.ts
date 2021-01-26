import { Component, OnInit } from '@angular/core';
import { Bus } from '../../services/models';
// import { BookingsService } from 'src/app/services/bookings.service';
import { BusesService  } from '../../services/buses.service'



@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {

  buses:  Bus[];

  constructor(
    private busesService: BusesService
    ) { }

  ngOnInit(): void {
    this.getBuses()
  }

  getBuses(){
    this.busesService. getBuses().subscribe(buses => {
      this.buses = buses as Bus[];
      console.log(buses);
    })
  }

}