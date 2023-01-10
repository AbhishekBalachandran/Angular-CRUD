import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicineDetails } from '../home/home.component';
import { Medicine } from '../medicine';
import { MedicineService } from '../medicine.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  medicineForm  = new FormGroup({
    name: new FormControl("",Validators.required  ),
    company: new FormControl("",Validators.required),
    expiry_date: new FormControl("",Validators.required),
  })
  errors: any = null;

  constructor(private medicineService: MedicineService, private router: Router) { }

  ngOnInit(): void {
  }
  create() {
    if(this.medicineForm.invalid)
    return

     let medicine = new MedicineDetails( undefined, this.medicineForm.controls.name.value, this.medicineForm.controls.company.value
      , this.medicineForm.controls.expiry_date.value)

     this.medicineService.create(medicine).subscribe(()=>{
      alert('Medicine created successfully!')
       this.router.navigate(["/home"])
     },
      (error) => {
        this.errors = error.statusText;
      }
     )
  }
}
