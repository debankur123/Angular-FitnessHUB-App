import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ApiServiceService } from '../Services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public userId !: number;
  userDetails !: User

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiServiceService
  ){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val =>{
      this.userId = val['id'];
      this.fetchUserDetails(this.userId);
    })
  }

  fetchUserDetails(userId : number){
    this.api.getRegisteredUserDetails(userId)
    .subscribe(res=>{
      this.userDetails = res;
      console.log(this.userDetails);
    })
  }

}
