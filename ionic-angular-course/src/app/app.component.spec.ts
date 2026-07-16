import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { MenuController, ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let statusBarSpy: jasmine.SpyObj<StatusBar>;
  let splashScreenSpy: jasmine.SpyObj<SplashScreen>;
  let platformReadySpy: Promise<void>;
  let platformSpy: jasmine.SpyObj<Platform>;
  let modalControllerSpy: jasmine.SpyObj<ModalController>;
  let menuControllerSpy: jasmine.SpyObj<MenuController>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create', 'dismiss']);
    menuControllerSpy = jasmine.createSpyObj('MenuController', ['close']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: MenuController, useValue: menuControllerSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  // TODO: add more tests!

});
