import {Component, OnInit} from '@angular/core';
import {DifficultyLevel, Preferences} from "../model/preferences.model";
import {MarketplaceService} from "../marketplace.service";
import {PagedResults} from "../../../shared/model/paged-results.model";
import {AuthService} from 'src/app/infrastructure/auth/auth.service';
import {User} from "../../../infrastructure/auth/model/user.model";

@Component({
  selector: 'xp-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  user: User;
  preferences: Preferences[] = [];
  selectedPreferences: Preferences;
  shouldEdit: boolean;
  shouldRenderPreferencesForm: boolean = false;
  usersPreferences: Preferences;

  constructor(private service: MarketplaceService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getPreferences();
  }

  getPreferences(): void {
    this.service.getPreferences().subscribe({
      next: (result: PagedResults<Preferences>) => {
        this.preferences = result.results;
      },
      error: (err: any) => {
        console.log(err);
      }
    });

    this.service.getUserPreferences(this.user.id).subscribe({
      next: (result) => {
        this.renderSettingsSucc(result);
      },
      error: (err) => {
        this.renderSettingsUnsucc();
        //console.log(err);
      }
    })
  }

  renderSettingsSucc(p: Preferences) {
    this.usersPreferences = p;
    this.shouldEdit = true;
    this.shouldRenderPreferencesForm = true;
  }

  renderSettingsUnsucc() {
    let test = {
      userId: this.user.id,
      preferredDifficulty: DifficultyLevel.EASY,
      transportationPreferences: [0, 0, 0, 0],
      interestTags: []
    };
    this.usersPreferences = test;
    this.shouldEdit = false;
    this.shouldRenderPreferencesForm = true;
  }

  onEditClicked(preferences: Preferences): void {
    this.getPreferences();
    this.shouldRenderPreferencesForm = true;
    this.shouldEdit = true;
    this.selectedPreferences = preferences;
  }

  onAddClicked(): void {

    this.shouldRenderPreferencesForm = true;
    this.shouldEdit = false;

    for (const item of this.preferences) {
      if (item.userId == this.user.id) {
        this.shouldRenderPreferencesForm = false;
        this.shouldEdit = true;
      }
    }
  }

  deletePreferences(preferences: Preferences): void {
    this.service.deletePreferences(preferences).subscribe({
        next: () => {
          this.getPreferences();
        }
    })
  }
}
