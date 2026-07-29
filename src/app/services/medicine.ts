import { Injectable } from '@angular/core';

// injectable root make this fill available for the whole project can use it

export interface Category {
  name: string;
  count: number;
}

export interface HistoryRecord {
  medicine: string;
  category: string;
  scheduled: string;   
  date: Date;         
  status: 'Taken' | 'Missed' | 'Skipped';
}

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  // -------- الأقسام (Categories) --------
  categories: Category[] = [];

  getCategories() { return this.categories; }
  addCategory(name: string) { this.categories.push({ name, count: 0 }); }
  editCategory(index: number, newName: string) { this.categories[index].name = newName; }
  deleteCategory(index: number) { this.categories.splice(index, 1); }

  // -------- الأدوية (Medicines) --------
  medicines: any[] = [];

  getMedicines() { return this.medicines; }

  addMedicine(newMed: any) {
    this.medicines.unshift(newMed);
    
    const category = this.categories.find(c => c.name === newMed.category);
    if (category) category.count++;
  }

  
  logToHistory(med: any, status: 'Taken' | 'Missed' | 'Skipped') {
    const now = new Date();
    this.history.unshift({
      medicine: `${med.name} ${med.dose || ''}`.trim(),
      category: med.category,
      scheduled: this.formatDate(now),
      date: now,
      status: status
    });
  }

  // -------- السجل (History) --------
 
  history: HistoryRecord[] = [];

  getHistory() { return this.history; }

  private formatDate(date: Date): string {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} · ${hour}:${m} ${ampm}`;
  }
}