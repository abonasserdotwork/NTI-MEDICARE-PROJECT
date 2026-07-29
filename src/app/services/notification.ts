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

  private notifications: AppNotification[] = [
    {
      id: 1,
      title: 'Medicine Reminder',
      time: '10 minutes ago',
      type: 'reminder',
      read: false
    }
  ];


  getNotifications(): AppNotification[] {
    return this.notifications;
  }


  addNotification(notification: AppNotification): void {
    this.notifications.unshift(notification);
  }


  markAsRead(id: number): void {
    const notification = this.notifications.find(
      item => item.id === id
    );

    if (notification) {
      notification.read = true;
    }
  }


  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
  }


  deleteNotification(id: number): void {
    this.notifications = this.notifications.filter(
      notification => notification.id !== id
    );
  }


  clearAll(): void {
    this.notifications = [];
  }


  getUnreadCount(): number {
    return this.notifications.filter(
      notification => !notification.read
    ).length;
  }

}