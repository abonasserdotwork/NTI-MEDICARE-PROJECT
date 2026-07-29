import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent implements OnInit {

  activeTab: string = 'account';
  isNotificationMenuOpen: boolean = false;

  tabs = [
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'security', label: 'Security' }
  ];

  countries: string[] = [
    'Egypt',
    'Saudi Arabia',
    'United Arab Emirates',
    'Kuwait',
    'Qatar',
    'United States',
    'United Kingdom'
  ];

  notificationsList = [
    { title: 'System Alert', desc: 'Welcome back to Medicare app' },
    { title: 'Medication Reminder', desc: 'Time to take Panadol Extra (1 Dose)' },
    { title: 'Doctor Update', desc: 'Dr. Ahmed confirmed your appointment' }
  ];

  settings = {
    notifications: {
      medicationReminders: true,
      duplicateDetectionAlerts: true,
      appointmentUpdates: true,
      weeklyAdherenceSummary: true
    },
    notificationsChannel: {
      soundAlerts: true,
      emailNotifications: false
    },
    privacy: {
      shareHistoryWithDoctors: true,
      anonymousAnalytics: false
    },
    security: {
      twoFactorAuth: false,
      appLockScreen: true
    },
    region: {
      country: 'Egypt'
    }
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  get latestNotifications() {
    return this.notificationsList.slice(-2);
  }

  toggleNotificationMenu() {
    this.isNotificationMenuOpen = !this.isNotificationMenuOpen;
  }

  onSettingChange() {
    console.log('Updated Settings:', this.settings);
  }

  terminateSession() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.router.navigate(['/home']);

      return 1;
    } else if (sessionStorage.getItem('user')) {
      sessionStorage.removeItem('user');
      this.router.navigate(['/home']);

      return 1;
    } else {
      return 0;
    }
  }

  clearMemoryStorage(userId: number) {
    const deletedItems = [`categories_${userId}`, `emergencyContacts_${userId}`, `history_${userId}`, `medicines_${userId}`];
    for (let item of deletedItems) {
      if (localStorage.getItem(item)) {
        localStorage.removeItem(item)
      }
    }
  }

  confirmDeleteAccount() {
    const isConfirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (isConfirmed) {
      const user = this.userService.getCurrentUser();
      const users = this.userService.getUsers();
      if (user) {
        const userIndex = users.findIndex((u) => u.id === user.id);
        users.splice(userIndex, 1);
        this.clearMemoryStorage(user.id);
        this.terminateSession();
      }
    }
  }

}