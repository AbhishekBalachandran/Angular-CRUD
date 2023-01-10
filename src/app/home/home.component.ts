import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../medicine.service';
import { Medicine } from '../medicine';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  MedicineDetails: MedicineDetails[] = [];
  loadedMedicinesOriginal: Medicine[] = [];
  uiLoadedMedicine: Medicine[] = [];
  errors:any = null;

  constructor(private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.medicineService.readAll().subscribe(
      (response)=> {
      this.loadedMedicinesOriginal = response;
      this.uiLoadedMedicine = this.loadedMedicinesOriginal;
      },
      (error) => {
        this.errors = ('Server error :   '+error.statusText);
      }
    )
  }

  SearchChanges(val: string) {
    console.log(val);
    let filteredList = [];
    if(val) {
      this.loadedMedicinesOriginal.forEach(element => {

        if(element.name.toLowerCase().includes(val.toLowerCase()) || 
        element.company.toLowerCase().includes(val.toLowerCase()))
        {
          filteredList.push(element)
        }
      });
      this.uiLoadedMedicine = filteredList; 
    } 
    else{
      this.uiLoadedMedicine = this.loadedMedicinesOriginal;
    }
  }
}

export class MedicineDetails {
  id: number
  name: String
  company: string
  expiry_date: string

  constructor(id: number, name: string, company: string, expiry_date: string) {
    this.id = id;
    this.name = name;
    this.company = company;
    this.expiry_date = expiry_date;
  }
}

