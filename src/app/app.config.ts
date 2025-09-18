import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideSweetAlert2 } from "@sweetalert2/ngx-sweetalert2";
import { errorInterceptor } from './services/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes , withPreloading(PreloadAllModules)), provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),

    provideSweetAlert2({
      // Optional configuration
      fireOnInit: false,
      dismissOnDestroy: true,
    }),
  ]
};
