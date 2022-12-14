import { SocialUser } from '@abacritt/angularx-social-login';
import { TokenResponse } from './../../../contracts/token/TokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../ui/custom-toastr.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_User } from './../../../contracts/users/create_user';
import { User } from './../../../entities/user';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastr: CustomToastrService) { }

  async create(user: User): Promise<Create_User>{
    const observable:Observable<Create_User | User> = this.httpClientService.post<User | Create_User>({
      controller:"users"
    },user);
    return await firstValueFrom(observable) as Create_User;
  }
}


