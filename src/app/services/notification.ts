import { Injectable } from '@angular/core';
export interface Notification {
  id: number;
  title: string;
  time: string;
  type: 'reminder' | 'alert' | 'appointment' | 'missed';
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: Notification[] = [];

  getNotifications() {
    return this.notifications;
  }

  addNotification(notification: Notification) {
    this.notifications.unshift(notification);
  }
}