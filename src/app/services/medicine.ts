import { Injectable } from '@angular/core';

// injectable root make this fill available for the whole project can use it 

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  medicines = [
    {
      name: 'Amoxicillin',
      dose: '500mg',
      category: 'Antibiotics',
      status: 'Active',
      dosage: '1 capsule',
      frequency: '3x daily',
      nextDose: '2:00 PM'
    },
    {
      name: 'Metformin',
      dose: '850mg',
      category: 'Diabetes Care',
      status: 'Due Soon',
      dosage: '1 tablet',
      frequency: '2x daily',
      nextDose: '6:00 PM'
    }
  ];

  getMedicines() {
    return this.medicines;
  }

  addMedicine(newMed: any) {
    this.medicines.unshift(newMed);
  }
}