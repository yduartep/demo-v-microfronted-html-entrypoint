import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {WelcomeComponent} from './welcome/welcome.component';
import {ContactComponent} from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
