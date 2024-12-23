import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// set the default language for the project
document.documentElement.lang = 'en';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
