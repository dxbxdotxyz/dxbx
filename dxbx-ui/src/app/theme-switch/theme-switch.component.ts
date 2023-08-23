/* dxbx-ui/src/app/theme-switch/theme-switch.component.html */

import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import{LocalstorageService} from '../localstorage.service';
import { SharengdataService } from '../sharengdata.service';




@Component({
    selector: 'app-theme-switch',
    templateUrl: './theme-switch.component.html',
    styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent {

    private static readonly DARK_THEME_CLASS = 'dark-theme';
    private static readonly DARK_THEME_LIGHT = 'light';
    private static readonly DARK_THEME_DARK = 'dark';
    
    public theme: string;


    
    constructor(private mypersistent:LocalstorageService, @Inject(DOCUMENT) private document: Document ,private myshareddata : SharengdataService) {
        if (this.mypersistent.get('maintheme')) {
            this.mypersistent.get('maintheme') === 'dark' ? this.selectDarkTheme() : this.selectLightTheme();
            

        }else{
            this.mypersistent.get('maintheme') === 'dark';
            this.mypersistent.set('maintheme', 'dark');
            this.selectDarkTheme();
        }
        this.theme = this.mypersistent.get('maintheme');
    }

    public selectDarkTheme(): void {
        this.document.documentElement.classList.add(ThemeSwitchComponent.DARK_THEME_CLASS);
        this.theme = ThemeSwitchComponent.DARK_THEME_DARK;
        this.mypersistent.set('maintheme', this.theme  );
        this.myshareddata.setMainTheme('dark');
    }

    public selectLightTheme(): void {
        this.document.documentElement.classList.remove(ThemeSwitchComponent.DARK_THEME_CLASS);
        this.theme = ThemeSwitchComponent.DARK_THEME_LIGHT;
        this.mypersistent.set('maintheme', this.theme  );
        this.myshareddata.setMainTheme('light');
    }
}