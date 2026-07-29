import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MedicineService } from '../../../services/medicine';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medicine-list',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './medicine-list.html',
  styleUrl: './medicine-list.css',
})
export class MedicineListComponent implements OnInit {
  // medicineService injected here to use it 
  private medicineService = inject(MedicineService);

  // جلب الأقسام من الـ Service عشان تظهر في الـ Filter ديناميكياً
  get categories() {
    return this.medicineService.getCategories();
  }
  selectedCategory: string = 'All';
  selectedStatus: string = 'All';
  selectedFrequency: string = 'All';
  searchQuery: string = '';
  selectedMedicine: any = null;
  medicines: any[] = [];

  ngOnInit(): void {
    this.medicines = this.medicineService.getMedicines();
  }

  markAsTaken(med: any) {
    med.status = 'Completed';
    // بنسجل في الـ History إن الدواء اتأخد
    this.medicineService.logToHistory(med, 'Taken');
  }

  // ممكن تضيف دالة لتخطي الجرعة
  skipDose(med: any) {
    // مفيش تغيير في الـ status بتاع الدواء نفسه، بس بنسجل إنه Skipped
    this.medicineService.logToHistory(med, 'Skipped');
  }


  openDetails(med: any) {
    this.selectedMedicine = med;
  }

  closeDetails() {
    this.selectedMedicine = null;
  }


  getFilteredMedicines(): any[] {
  return this.medicines.filter(med => {
    const matchesSearch = !this.searchQuery || 
      med.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(this.searchQuery.toLowerCase());

    const matchesCategory = this.selectedCategory === 'All' || med.category.toLowerCase() === this.selectedCategory.toLowerCase();
    const matchesStatus = this.selectedStatus === 'All' || med.status === this.selectedStatus;
    const matchesFrequency = this.selectedFrequency === 'All' || med.frequency === this.selectedFrequency;

    return matchesSearch && matchesCategory && matchesStatus && matchesFrequency;
  });
}

  clearFilters() {
    this.selectedCategory = 'All';
    this.selectedStatus = 'All';
    this.selectedFrequency = 'All';
    this.searchQuery = '';
  }
}


