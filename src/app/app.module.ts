import { PrimeModules } from './modules/prime.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapsEffects } from './effects/map.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
// import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { reducers } from './reducers';

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    // FormsModule,
    HttpClientModule,
    AppRoutingModule,
    PrimeModules,
    EffectsModule.forRoot([MapsEffects]),
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
