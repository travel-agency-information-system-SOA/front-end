import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'xp-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit{
  confirmationMessage: string;

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    const confirmationToken = this.route.snapshot.queryParams['token'];
    const confirmationUrl = `user/confirm-account?token=${confirmationToken}`;

    this.authService.confirmRegistration(confirmationUrl).subscribe(result => {
      this.confirmationMessage = 'Mrk steifane sineeeee';
      console.log(result);
    });
  }
}
