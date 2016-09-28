import 'babel-polyfill';
import 'zone.js/dist/zone';
import 'raw-loader/index';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app';

platformBrowserDynamic().bootstrapModule(AppModule);
