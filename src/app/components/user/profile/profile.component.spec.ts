import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenStorageService } from '../_services/token-storage.service';

import { ProfileComponent } from './profile.component';
class MockTokenService {
  getUser(){return {id: 1,
    username: "user",
    email: "user@mail.com",
    roles: [
        "ROLE_USER"
    ],
    tokenType: "Bearer",
    accessToken: "token.for.the-logged_user_from_springboot"}}
}
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let currentUser: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [
        {provide: TokenStorageService, useClass: MockTokenService}
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the logged user on ngOnInit', () => {
    
    component.ngOnInit()
      expect(component.currentUser).toEqual({id: 1,
        username: "user",
        email: "user@mail.com",
        roles: [
            "ROLE_USER"
        ],
        tokenType: "Bearer",
        accessToken: "token.for.the-logged_user_from_springboot"})
    });
});
