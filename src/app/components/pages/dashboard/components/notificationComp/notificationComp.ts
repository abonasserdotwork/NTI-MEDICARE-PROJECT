import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NotificationService,
  AppNotification
} from '../../../../../services/notification';

@Component({
  selector: 'app-notification-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificationComp.html',
  styleUrls: ['./notificationComp.css']
})
export class NotificationComp implements OnInit {

  notifications: AppNotification[] = [];

  selectedFilter: 'All' | 'Unread' | 'Reminders' | 'Appointments' = 'All';

  constructor(
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notifications = this.notificationService.getNotifications();
  }

  get filteredNotifications(): AppNotification[] {

    switch (this.selectedFilter) {

      case 'Unread':
        return this.notifications.filter(n => !n.read);

      case 'Reminders':
        return this.notifications.filter(n => n.type === 'reminder');

      case 'Appointments':
        return this.notifications.filter(n => n.type === 'appointment');

      default:
        return this.notifications;
    }
  }

  selectFilter(filter: 'All' | 'Unread' | 'Reminders' | 'Appointments'): void {
    this.selectedFilter = filter;
  }

  markAsRead(notification: AppNotification): void {
    this.notificationService.markAsRead(notification.id);
    this.loadNotifications();
  }

  deleteNotification(notification: AppNotification): void {
    this.notificationService.deleteNotification(notification.id);
    this.loadNotifications();
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
    this.loadNotifications();
  }

  clearAll(): void {
    this.notificationService.clearAll();
    this.loadNotifications();
  }
}