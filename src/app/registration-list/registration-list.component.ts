import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { User } from '../models/user.model';
import { ApiServiceService } from '../Services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';




@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {
  public dataSource! :  MatTableDataSource<User>;
  public users! : User[];

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sorting!: MatSort;

  displayedColumns : string[] =[
    'id',
    'firstName',
    'lastName',
    'email',
    'mobile',
    //'weight',
    //'height',
    //'bmi',
    'bmiResult',
    'gender',
    //'requiredTrainer',
    'package',
    //'important',
    //'beenGymBefore',
    'enquiryDate',
    'action'
  ]

  constructor(
    private api : ApiServiceService , 
    private router : Router,
    private confirm : NgConfirmService,
    private toast : NgToastService
  ){}
  ngOnInit(): void {
    this.getAllUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 // GET All users data
  getAllUsers(){
    this.api.getRegisteredUser()
    .subscribe(res =>{
      this.users = res,
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sorting;
    })
  }

  updateUser(id : number) {
    this.router.navigate(['update', id]);
  }

  deleteUser(id : number) {
    this.confirm.showConfirm("Are you sure you want to delete?",() => {
      this.api.deleteRegisteredUser(id)
      .subscribe(res=>{
        this.toast.success(
          {
            detail : "Success",
            summary : "Deleted successfully",
            duration : 3000
          }
        );
        this.getAllUsers();
      })
    },
    ()=>{

    })
  }
}
