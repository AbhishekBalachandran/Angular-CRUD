import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineDetails } from '../home/home.component';
import { Medicine } from '../medicine';
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  selectedMedicineDetails: MedicineDetails
  errors: any = null;

  constructor(private medicineService: MedicineService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let id: number = this.activateRoute.snapshot.params['id']
    this.medicineService.readById(id).subscribe((response: MedicineDetails)=>{
      this.selectedMedicineDetails = response;
    },
    )
  }

  delete() {
    let id = this.activateRoute.snapshot.params['id']
    this.medicineService.delete(id).subscribe(() => {
      alert('Deleted medicine successfully!')
      this.router.navigate(['/home'])
    },
    (error) => {
      this.errors = error.statusText;
    }
    )
  }

}
