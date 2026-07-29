import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedicineService } from '../../../services/medicine';
import { NotificationService } from '../../../services/notification';

@Component({
  selector: 'app-create-medicine',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './create-medicine.html',
  styleUrl: './create-medicine.css',
})
export class CreateMedicine {
  
  // medicineService injected here to use it
  medicineService = inject(MedicineService);
  notificationService = inject(NotificationService);
  private router = inject(Router);

  // جلب الأقسام من الـ Service لعرضها في الـ dropdown
  get categories() {
    return this.medicineService.getCategories();
  }

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

      this.notificationService.addNotification({
      id: Date.now(),
      title: `Time to take ${this.newMedicine.name} ${this.newMedicine.dose}`,
      time: 'Just now',
      type: 'reminder',
      read: false
    });

    this.router.navigate(['/medicines']);

  }


}