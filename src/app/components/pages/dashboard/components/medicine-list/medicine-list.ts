import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MedicineService } from '../../../../../services/medicine';
import { NotificationService } from '../../../../../services/notification';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medicine-list',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './medicine-list.html',
  styleUrl: './medicine-list.css',
})
export class MedicineListComponent {
  // medicineService injected here to use it 
  private medicineService = inject(MedicineService);
  private notificationService = inject(NotificationService);

  get categories() {
    return this.medicineService.getCategories();
  }

  get medicines(): any[] {
    return this.medicineService.getMedicines();
  }

  get todayDate(): string {
    return new Date().toDateString();
  }

  getDailyTarget(frequency: string): number {
    if (!frequency) return 1;
    if (frequency.includes('2x')) return 2;
    if (frequency.includes('3x')) return 3;
    return 1;
  }

  calculateNextDose(frequency: string): string {
    const hoursToAdd = frequency?.includes('3x') ? 8 : frequency?.includes('2x') ? 12 : 24;
    const nextTime = new Date(Date.now() + hoursToAdd * 60 * 60 * 1000);
    
    let hours = nextTime.getHours();
    const minutes = nextTime.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  }

  markAsTaken(med: any) {
    // if (!med) return;

    const today = new Date().toDateString();

    // counter = 0 in new day 
    if (med.lastTakenDate !== today) {
      med.dosesTakenToday = 0;
      med.lastTakenDate = today;
    }

    // counter ++
    med.dosesTakenToday = (med.dosesTakenToday || 0) + 1;

    // next dose 
    med.nextDose = this.calculateNextDose(med.frequency);

    // record in history
    this.medicineService.logToHistory(med, 'Taken');
    this.notificationService.addNotification({
  id: Date.now(),
  title: `${med.name} marked as taken`,
  time: 'Just now',
  type: 'reminder',
  read: false
});

    const currentMeds = this.medicineService.getMedicines();
    const index = currentMeds.findIndex(m => m.name === med.name);
    if (index !== -1) {
      currentMeds[index] = med;
      const user = this.medicineService['userService'].getCurrentUser();
      if (user) {
        localStorage.setItem(`medicines_${user.id}`, JSON.stringify(currentMeds));
      }
    }
  }

  markAsMissed(med: any) {
    if (!med) return;
    this.medicineService.logToHistory(med, 'Missed');

    this.notificationService.addNotification({
  id: Date.now(),
  title: `${med.name} marked as taken`,
  time: 'Just now',
  type: 'reminder',
  read: false
   });
  }

  selectedCategory: string = 'All';
  selectedStatus: string = 'All';
  selectedFrequency: string = 'All';
  searchQuery: string = '';
  selectedMedicine: any = null;

  getMedicineStatus(med: any): string {
  const target = this.getDailyTarget(med.frequency);
  const taken = med.dosesTakenToday || 0;

  if (taken >= target) {
    return 'Completed';
  }
  return med.status || 'Active';
}

  skipDose(med: any) {
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


