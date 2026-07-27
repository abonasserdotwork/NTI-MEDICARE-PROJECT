import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Category {
  name: string;
  count: number;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class CategoriesComponent {

  categories: Category[] = [];
  
  
  searchQuery = '';

  showForm = false;
  isEditing = false;
  editingIndex = -1;

  
  categoryName = '';

  
  get filteredCategories() {
    if (!this.searchQuery) {
      return this.categories;
    }
    return this.categories.filter(c => c.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }


  openAddForm() {
    this.showForm = true;
    this.isEditing = false;
    this.categoryName = '';
  }

  
  openEditForm(index: number) {
    this.showForm = true;
    this.isEditing = true;
    this.editingIndex = index;
    
    const category = this.filteredCategories[index];
    this.categoryName = category.name;
  }

  
  closeForm() {
    this.showForm = false;
  }

  saveCategory() {
    if (!this.categoryName) {
      alert('Please fill in the category name.');
      return;
    }

    if (this.isEditing) {
      const categoryToEdit = this.filteredCategories[this.editingIndex];
      const realIndex = this.categories.indexOf(categoryToEdit);
      this.categories[realIndex].name = this.categoryName;
    } else {
      this.categories.push({
        name: this.categoryName,
        count: 0
      });
    }

    this.closeForm();
  }

  deleteCategory(index: number, event: Event) {
    event.stopPropagation(); 
    if(confirm('Are you sure you want to delete?')) {
      const categoryToDelete = this.filteredCategories[index];
      const realIndex = this.categories.indexOf(categoryToDelete);
      this.categories.splice(realIndex, 1);
    }
  }
}
