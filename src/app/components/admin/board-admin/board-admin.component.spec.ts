import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppUser } from '../../../model/appUser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {HarnessLoader, parallel} from '@angular/cdk/testing';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { ModalUserNewComponent } from '../modal-user-new/modal-user-new.component';
import { Location } from '@angular/common';
import { BoardAdminComponent } from './board-admin.component';

describe('BoardAdminComponent', () => {
  let component: BoardAdminComponent;
  let fixture: ComponentFixture<BoardAdminComponent>;

  let loader: HarnessLoader;
  let content: string;

  let usersList: any[] = [];

  let appUsers:AppUser[] = [];
  
  let appUsersTest:AppUser[] = [];
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ BoardAdminComponent ],
  //     imports: [HttpClientTestingModule, MatDialog,MatSort, MatTableDataSource, MatPaginator, ModalUserComponent, ModalUserNewComponent, Location, HttpTestingController]
  //   })
  //   .compileComponents();
  // });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      declarations: [BoardAdminComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BoardAdminComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(BoardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
