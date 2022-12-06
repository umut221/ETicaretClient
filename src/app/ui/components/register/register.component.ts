import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../../services/ui/custom-toastr.service';
import { Create_User } from './../../../contracts/users/create_user';
import { UserService } from './../../../services/common/models/user.service';
import { User } from './../../../entities/user';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService:UserService, private toastr: CustomToastrService) { }

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameSurname: ["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2)
      ]],
      username: ["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2)
      ]],
      email: ["", [
        Validators.required,
        Validators.email
      ]],
      password: ["",[
        Validators.required,
      ]],
      passwordRepeat:["",[
        Validators.required,
      ]]
    }, {validators: (group: AbstractControl): ValidationErrors | null => {
      let password = group.get("password").value;
      let passwordRepeat = group.get("passwordRepeat").value;
      return password === passwordRepeat ? null : {notSame:true};
    }})
  }

  get component(){
    return this.form.controls;
  }

  submitted: boolean = false;

  async onSubmit(user: User){
    this.submitted = true;

    if(this.form.invalid) 
    return;

    const result: Create_User = await this.userService.create(user);
    if(result.successed) 
      this.toastr.message(result.message, "Info", ToastrMessageType.Success, ToastrPosition.BottomRight);
    else
      this.toastr.message(result.message, "Warning", ToastrMessageType.Error, ToastrPosition.BottomRight);
  }

}
