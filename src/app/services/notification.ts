import { Injectable } from '@angular/core';

export type NotificationType = 'reminder' | 'appointment' | 'alert' | 'missed';

export interface AppNotification {
  id: number;
  title: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private storageKey = 'notifications';

  private notifications: AppNotification[] = [];

  constructor() {
    const savedNotifications = localStorage.getItem(this.storageKey);

    if (savedNotifications) {
      this.notifications = JSON.parse(savedNotifications);
    } else {
      this.notifications = [
        {
          id: 1,
          title: 'Medicine Reminder',
          time: '10 minutes ago',
          type: 'reminder',
          read: false
        }
      ];

      this.saveNotifications();
    }
  }

  private saveNotifications(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.notifications));
  }

  getNotifications(): AppNotification[] {
    return this.notifications;
  }

  addNotification(notification: AppNotification): void {
    this.notifications.unshift(notification);
    this.saveNotifications();
  }

  markAsRead(id: number): void {
    const notification = this.notifications.find(item => item.id === id);

    if (notification) {
      notification.read = true;
      this.saveNotifications();
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      notification.read = true;
    });

    this.saveNotifications();
  }

  deleteNotification(id: number): void {
    this.notifications = this.notifications.filter(
      notification => notification.id !== id
    );

    this.saveNotifications();
  }

  clearAll(): void {
    this.notifications = [];
    this.saveNotifications();
  }

  getUnreadCount(): number {
    return this.notifications.filter(
      notification => !notification.read
    ).length;
  }
}