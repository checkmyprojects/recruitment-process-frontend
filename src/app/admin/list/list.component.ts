import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-list]',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isEdit: boolean = false;

  @Input() user!: any;

  constructor() { }

  ngOnInit(): void {
  }

  public arrayToString(roles: any[]){
    // let string : String = '';
    let rolesList: any[] = [];
    roles.forEach((role)=>rolesList.push(role.name));
    // roles.forEach((role)=>string+=role.name.toString());
    // console.log(string);
    console.log(rolesList.join(", "));
    return rolesList.join(", ");
  }

  isEditToggle() {
    this.isEdit = !this.isEdit;    
  }

}
