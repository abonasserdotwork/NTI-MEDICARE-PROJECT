import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/notification';

interface Notification {
  id: number;
  title: string;
  time: string;
  type: 'reminder' | 'alert' | 'appointment' | 'missed';
  read: boolean;
}

@Component({
  selector: 'app-notificationComp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificationComp.html',
  styleUrls: ['./notificationcomp.css']
})
export class NotificationComp {

  selectedFilter = 'All';

  // notifications: Notification[] = [
  //   {
  //     id: 1,
  //     title: 'Time to take Amoxicillin 500mg',
  //     time: '2 minutes ago',
  //     type: 'reminder',
  //     read: false
  //   },
  //   {
  //     id: 2,
  //     title: 'Possible duplicate: "Amoxicillin 500mg" already exists',
  //     time: '45 minutes ago',
  //     type: 'alert',
  //     read: false
  //   },
  //   {
  //     id: 3,
  //     title: 'Dr. Michael Chen confirmed your appointment',
  //     time: '1 hour ago',
  //     type: 'appointment',
  //     read: true
  //   },
  //   {
  //     id: 4,
  //     title: 'Metformin 850mg dose due in 30 minutes',
  //     time: '3 hours ago',
  //     type: 'reminder',
  //     read: true
  //   },
  //   {
  //     id: 5,
  //     title: 'You missed your 9:00 PM dose of Atorvastatin',
  //     time: 'Yesterday',
  //     type: 'missed',
  //     read: true
  //   }
  // ];

  notificationService = inject(NotificationService);

get notifications() {
  return this.notificationService.getNotifications();
}
  get filteredNotifications(): Notification[] {

    if (this.selectedFilter === 'Unread') {
      return this.notifications.filter(notification => !notification.read);
    }

    if (this.selectedFilter === 'Reminders') {
      return this.notifications.filter(notification => notification.type === 'reminder');
    }

    if (this.selectedFilter === 'Appointments') {
      return this.notifications.filter(notification => notification.type === 'appointment');
    }

    return this.notifications;
  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
  }

  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
  }

  markAsRead(notification: Notification): void {
    notification.read = true;
  }
}