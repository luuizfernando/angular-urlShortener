import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { UrlShortenerFormComponent } from './components/url-shortener-form/url-shortener-form';
import { UrlResultComponent } from './components/url-result/url-result';
import { UrlListComponent } from './components/url-list/url-list';

@NgModule({
  declarations: [],
  imports: [
    App,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    UrlShortenerFormComponent,
    UrlResultComponent,
    UrlListComponent
],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
})
export class AppModule { }
