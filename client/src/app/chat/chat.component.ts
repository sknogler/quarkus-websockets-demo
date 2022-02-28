import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from "../../shared/chat.service";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  public userName: string | null;
  public messages: MessageDisplay[] | null;
  public message: string | null;

  constructor(private readonly chatService: ChatService,
              private readonly userService: UserService) {
    this.userName = null;
    this.messages = null;
    this.message = null;
  }

  public ngOnInit(): void {
    this.userName = this.userService.user;
    this.startChat();
  }

  public ngOnDestroy(): void {
    this.chatService.close();
  }

  public sendMessage(): void {
    this.sendMsg(this.message!);
    this.message = null;
  }

  private sendMsg(msg: string): void {
    this.chatService.sendMessage(msg);
  }

  private startChat(): void {
    this.messages = [];
    this.chatService.connect(this.userName!)
      .subscribe(msg => {
        this.messages?.push(new MessageDisplay(msg));
      });
    this.sendMsg(`${this.userName} connected!`);
  }
}

class MessageDisplay {

  public readonly dateTime: Date;

  constructor(public readonly message: string) {
    this.dateTime = new Date();
  }
}
