import { Component } from '@angular/core';
import {UserService} from "../../shared/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public userName: string | null;
  public inProgress: boolean;

  constructor(private readonly userService: UserService,
              private readonly snackBar: MatSnackBar,
              private readonly router: Router) {
    this.userName = null;
    this.inProgress = false;
  }

  public async login(): Promise<void> {
    this.inProgress = true;
    const nameOk = await this.userService.attemptLogin(this.userName!);
    this.inProgress = false;
    if (nameOk){
      const navRes = await this.router.navigateByUrl('chat');
      if (!navRes){
        console.log('Navigation failed');
      }
      return;
    }
    this.userName = null;
    this.snackBar.open('Name already taken!', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
