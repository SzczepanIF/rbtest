/* eslint-env jasmine */
import { Component } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/add/operator/map';

import { NextRacesService } from './services';
import { RbHeader } from './components/header/header';
import { RbFooter } from './components/footer/footer';
import { RbIndex } from './components/index/index';
import { NextRaces } from './components/next-races/next-races';

import { RaceTypePipe } from './pipes/race-type-pipe';

describe('RbHeader', () => {

  @Component({
    template: '<header><h1>RaceBets</h1></header>',
    directives: [RbHeader],
    templateUrl: null
  })
  class Parent {}

  it('renders header content properly', () => {

   
      TestBed.configureTestingModule({ declarations: [RbHeader]});

      const fixture = TestBed.createComponent(RbHeader);
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.textContent).toContain('RaceBets');
  });
});

describe('RbFooter', () => {

  it('to have the author notice', () => {

   
      TestBed.configureTestingModule({ declarations: [RbFooter]});

      const fixture = TestBed.createComponent(RbFooter);
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.textContent).toContain('Marcin Szczepanczyk');
  });
});

