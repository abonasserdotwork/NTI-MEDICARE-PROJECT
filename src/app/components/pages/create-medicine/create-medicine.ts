import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MedicineService } from '../../../services/medicine';

@Component({
  selector: 'app-create-medicine',
  imports: [RouterLink, FormsModule],
  templateUrl: './create-medicine.html',
  styleUrl: './create-medicine.css',
})
export class CreateMedicine {
  
  // medicineService injected her to use it 
  private medicineService = inject(MedicineService);
  private router = inject(Router);

  newMedicine = {
    name: '',
    dose: '',
    category: '',
    status: 'Active',
    dosage: '',
    frequency: '',
    nextDose: '2:00 PM'
  };

  saveMedicine() {
    this.medicineService.addMedicine({ ...this.newMedicine });
    this.router.navigate(['/medicines']);
  }
}