import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './components/navbar/navbar.component'
import { FooterComponent } from './components/footer/footer.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from 'src/environment/environment';
import { AuthService } from './services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      return auth;
    }),
    provideFirestore(() => {
      const Firestore = getFirestore()
      return Firestore
    }),
    provideFunctions(() => {
      const Functions = getFunctions();
      Functions.region = 'europe-west1';
      return Functions
    }),
    provideStorage(() => {
      const Storage = getStorage()
      return Storage
    }),
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
