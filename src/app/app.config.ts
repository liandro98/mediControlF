import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { importProvidersFrom } from '@angular/core';


// Configuración de Firebase (directamente en app.config.ts)
const firebaseConfig = {
  apiKey: "AIzaSyC1r2mLzYbPcZpladgCrpkB6ORaoZaCp8A",
  authDomain: "medicontrol-7f8f6.firebaseapp.com",
  projectId: "medicontrol-7f8f6",
  storageBucket: "medicontrol-7f8f6.appspot.com",
  messagingSenderId: "558582424363",
  appId: "1:558582424363:web:18b20df9d734ae45abdb6e"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withFetch()),importProvidersFrom(
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  )]
};
