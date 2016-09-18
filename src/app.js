import { NgModule, Component, Input, Attribute } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';

import { RbHeader } from './components/header/header';
import { RbFooter } from './components/footer/footer';
import { RbIndex } from './components/index/index';

import { NextRaces } from './components/next-races/next-races';

@Component({
  selector: 'empty-component',
  template: ''
})

export class EmptyComponent {
}

@Component({
  selector: 'rb-app',
  template: '<rb-header></rb-header><rb-index></rb-index> <div class="var_three_columns"><div class="layout_column"><router-outlet></router-outlet></div></div><rb-footer></rb-footer>'
})

export class RbApp {
}

const routing = RouterModule.forRoot([
  { path: '', component: EmptyComponent},
  { path: 'nextraces', component: NextRaces }
])

@NgModule({
  imports: [
    BrowserModule,
    routing,
    HttpModule
  ],
  declarations: [
    RbApp,
    RbHeader,
    NextRaces,
    RbIndex,
    RbFooter,
    EmptyComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [RbApp],
})
export class AppModule {
}
