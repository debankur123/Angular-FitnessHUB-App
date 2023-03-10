import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../models/user.model';
import { ApiServiceService } from '../Services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  public packages : string[] = ['Monthly','Quarterly','Yearly'];
  public genders  : string[] = ['Male','Female','Others'];
  public importantLists : string[] = [
    'Toxic Fat Reduction',
    'Energy and Endurance',
    'Building Lean Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness'
  ];
  public registerForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  constructor
  (
    private fb : FormBuilder,
    private api : ApiServiceService,
    private toast : NgToastService,
    private activatedRoute : ActivatedRoute,
    private router : Router
  )
  { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      email : ['',Validators.required],
      mobile : ['',Validators.required],
      weight : ['',Validators.required],
      height : ['',Validators.required],
      bmi : [''],
      bmiResult : [''],
      gender : ['',Validators.required],
      requiredTrainer : ['',Validators.required],
      package : ['',Validators.required],
      important : ['',Validators.required],
      beenGymBefore : ['',Validators.required],
      enquiryDate : ['',Validators.required]
    });
    this.registerForm.controls['height'].valueChanges.subscribe(res =>{
      this.calculateBmi(res);
    })

    this.activatedRoute.params.subscribe(val =>{
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredUserDetails(this.userIdToUpdate)
      .subscribe(res=>{
        this.isUpdateActive = true;
        this.fillFormForUpdate(res);
      })
    })
  }

  calculateBmi(heightValue : number){
    debugger
    const weight = this.registerForm.value.weight; // get weight from the form
    const height = heightValue;
    //const height = this.registerForm.value.height / 100
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case (bmi<18.5):
        this.registerForm.controls['bmiResult'].patchValue('UnderWeight')
        //this.registerForm.value.bmiResult = 'UnderWeight'
        break;
      case (bmi >= 18.5 && bmi <=25):
        this.registerForm.controls['bmiResult'].patchValue('Normal')
        //this.registerForm.value.bmiResult = 'Normal'
        break;
      case (bmi >=25 && bmi <30):
        this.registerForm.controls['bmiResult'].patchValue('OverWeight')
        //this.registerForm.value.bmiResult = 'OverWeight'
        break;
      default:
        this.registerForm.controls['bmiResult'].patchValue('Obese')
        //this.registerForm.value.bmiResult = 'Obese'
        break;
    }
  }

  submit(){
    this.api.submitRegistration(this.registerForm.value)
    .subscribe(res=>{
      this.toast.success(
        {
          detail : "Success",
          summary : "Enquiry Added",
          duration : 3000
        }
      );
      this.registerForm.reset();
    })
  }

  update(){
    this.api.updateRegisteredUser(this.registerForm.value,this.userIdToUpdate)
    .subscribe(res=>{
      this.toast.success(
        {
          detail : "Success",
          summary : "Enquiry Updated",
          duration : 3000
        }
      );
      this.registerForm.reset();
      this.router.navigate(['/list'])
    })
  }

  fillFormForUpdate(user : User){
    this.registerForm.setValue({
      firstName : user.firstName,
      lastName : user.lastName,
      email : user.email,
      mobile : user.mobile,
      weight : user.weight,
      height : user.height,
      bmi : user.bmi,
      bmiResult : user.bmiResult,
      gender : user.gender,
      requiredTrainer : user.requiredTrainer,
      package : user.package,
      important : user.important,
      beenGymBefore : user.beenGymBefore,
      enquiryDate : user.enquiryDate
    })
  }
}
