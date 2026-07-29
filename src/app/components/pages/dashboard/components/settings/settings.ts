import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {}

  get latestNotifications() {
    return this.notificationsList.slice(-2);
  }

  toggleNotificationMenu() {
    this.isNotificationMenuOpen = !this.isNotificationMenuOpen;
  }

  onSettingChange() {
    console.log('Updated Settings:', this.settings);
  }

  confirmDeleteAccount() {
    const isConfirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (isConfirmed) {
      alert('Account deleted successfully.');
    }
  }

}