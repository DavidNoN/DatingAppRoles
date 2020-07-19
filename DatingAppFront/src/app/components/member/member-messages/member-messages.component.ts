import { Message } from './../../../models/message';
import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from '../../../services/alertify.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss'],
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap((messages: any) => {
          for (const message of messages) {
            if (
              message.isRead === false &&
              message.recipientId === currentUserId
            ) {
              this.userService.markAsRead(currentUserId, message.id);
            }
          }
        })
      )
      .subscribe(
        messages => {
          this.messages = messages;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  sendMessage(): void {
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(
        (message: Message) => {
          this.messages.push(message);
          this.newMessage.content = '';
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
