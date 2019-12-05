import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { retry } from 'rxjs/operators';
import { user } from '../interface/user.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  reactiveForm: any={};
  countryList: user[];
  documentsFor: String[]=["t.i","c.c"];
  flagCss: boolean=true;

  onlyLetter: any= /^[A-Z]+$/i;
  numberPattern: any = /^[0-9]\d+$/;
  emailPattern: any= /\w+@\w+\.+[a-z]/;

  constructor(private countryService:UserService, private formBuilder: FormBuilder) {
    this.reactiveForm=formBuilder.group({
      name:new FormControl("",[Validators.required, Validators.pattern(this.onlyLetter)]),
      document: new FormControl("",[Validators.required]),
      country:new FormControl("",[Validators.required]),
      numberDocument: new FormControl("",[Validators.required, Validators.minLength(6),Validators.maxLength(10),Validators.pattern(this.numberPattern)]),
      phoneNumber:new FormControl("",[Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern(this.numberPattern)]),
      email:new FormControl("",[Validators.required,Validators.pattern(this.emailPattern)]),
      terms: new FormControl(false,[Validators.requiredTrue])
    });
   }

   saveUser(){
     if(this.reactiveForm.valid){
      console.log(this.reactiveForm.value);
     }else{
       console.log("Ocurrio un error", this.reactiveForm.value);
     }
     
   }

  ngOnInit() {
    this.getListCountry();
  }

  getListCountry(){
    this.countryService.getCountry().pipe(retry(3)).subscribe(data=>{
      this.countryList=data;
      console.log(this.countryList);
    });
  }

  get name() { return this.reactiveForm.get('name'); }
  get document(){ return this.reactiveForm.get('document')}
  get country() { return this.reactiveForm.get('country'); }
  get numberDocument(){ return this.reactiveForm.get('numberDocument')}
  get phoneNumber(){ return this.reactiveForm.get('phoneNumber')}
  get email(){ return this.reactiveForm.get('email')}
  get terms(){ return this.reactiveForm.get('terms')}
  
}
