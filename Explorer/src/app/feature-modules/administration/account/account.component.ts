import { Component, OnInit } from '@angular/core';
import { Account } from '../model/account.model';
import { AdministrationService } from '../administration.service';

@Component({
  selector: 'xp-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  accounts: Account[] = [];
  selectedAccount: Account;

  constructor(private service: AdministrationService) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(): void {
    this.service.getAccounts().subscribe({
      next: (result: Account[]) => {
        this.accounts = result;
      },
      error: () => {
      }
    })
  }

  changeAccountStatus(account: Account): void {
    this.selectedAccount = account;
    this.service.changeAccountStatus(this.selectedAccount).subscribe({
      next: () => {
        this.getAccounts();
      },
      error: () => {
      }
    })
  }


}
