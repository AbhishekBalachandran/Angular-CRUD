import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineDetails } from '../home/home.component';
import { MedicineService } from '../medicine.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  medicineForm  = new FormGroup({
    name: new FormControl("",Validators.required  ),
    company: new FormControl("",Validators.required),
    expiry_date: new FormControl("",Validators.required),
  })
  selectedMedicine: MedicineDetails;
  errors: any = null;

  constructor(private medicineService: MedicineService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'] 
    this.medicineService.readById(id).subscribe((response: MedicineDetails)=>{
      this.selectedMedicine = response
      this.medicineForm.controls.name.setValue(this.selectedMedicine.name), 
      this.medicineForm.controls.company.setValue(this.selectedMedicine.company), 
      this.medicineForm.controls.expiry_date.setValue(this.selectedMedicine.expiry_date)
    },
      (error) => {
        this.errors = error.statusText;
      } 
    )
  }

  update() {
    let id = this.activatedRoute.snapshot.params['id']
    this.selectedMedicine.name = this.medicineForm.controls.name.value
    this.selectedMedicine.company =  this.medicineForm.controls.company.value
    this.selectedMedicine.expiry_date = this.medicineForm.controls.expiry_date.value
    
    this.medicineService.update(id,this.selectedMedicine).subscribe((response) => {
      alert('Medicine updated successfully!')
      this.router.navigate(['/home'])
    },
    (error) => {
      this.errors = error.statusText;
    }
    )
  }
}
