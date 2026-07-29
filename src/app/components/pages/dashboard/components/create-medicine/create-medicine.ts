import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedicineService } from '../../../../../services/medicine';

@Component({
  selector: 'app-create-medicine',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './create-medicine.html',
  styleUrl: './create-medicine.css',
})
export class CreateMedicine {

  // medicineService injected here to use it
  medicineService = inject(MedicineService);
  private router = inject(Router);

  // جلب الأقسام من الـ Service لعرضها في الـ dropdown
  get categories() {
    return this.medicineService.getCategories();
  }

  newMedicine = {
    name: '',
    dose: '',
    category: '',
    status: 'Active', // Default status for a newly added medicine
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    reminderTime: '',
    prescribedBy: '',
    info: ''
  };

  // نحسب الميعاد القادم للجرعة عشان يظهر في الـ preview لحظياً
  get nextDoseDisplay(): string {
    if (!this.newMedicine.reminderTime) return 'Not set';
    return this.formatTime(this.newMedicine.reminderTime);
  }

  saveMedicine() {
    // Add calculated nextDose before saving
    const medicineToSave = {
      ...this.newMedicine,
      nextDose: this.nextDoseDisplay
    };

    this.medicineService.addMedicine(medicineToSave);
    this.router.navigate(['/medicines']);
  }

  // دالة لتحويل وقت 24 ساعة (مثال 14:00) إلى 12 ساعة (2:00 PM)
  private formatTime(time24: string): string {
    const [hours, minutes] = time24.split(':');
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${minutes} ${ampm}`;
  }

}