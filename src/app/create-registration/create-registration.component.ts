import { Component } from '@angular/core';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent {
  public packages : string[] = ['Monthly','Quarterly','Yearly'];
  public genders  : string[] = ['Male','Female','Others'];
  public importantLists : string[] = [
    'Toxic Fat Reduction',
    'Energy and Endurance',
    'Building Lean Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness'
  ]
}
