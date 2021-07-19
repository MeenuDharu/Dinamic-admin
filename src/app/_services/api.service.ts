import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  ADMIN_LOGIN(x:any) { return this.http.post<any>(environment.ws_url+'/admin/auth/login', x); }

  USER_LIST() {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.get<any>(environment.ws_url+'/admin/user/list', httpOptions);
  }

  RESTAURANT_LIST() {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.get<any>(environment.ws_url+'/admin/restaurant/list', httpOptions);
  }
  POS_RESTAURANT_LIST()
  {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any>('https://web.dinamic.io/api/detail/list/company');
  }

  ADD_RESTAURANT(x:any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/restaurant/add', x, httpOptions);
  }
  UPDATE_RESTAURANT(x:any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/restaurant/update', x, httpOptions);
  }
  DELETE_RESTAURANT(x:any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/restaurant/delete', x, httpOptions);
  }

  ADD_THEME (x: any) {
    // let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    let httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+ '/admin/restaurant/addTheme', x, httpOptions);
  }

  ADD_HOMEPAGE_THEME (x: any) {
    let httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem('admin_token') }) };
    return this.http.post<any>(environment.ws_url+ '/admin/restaurant/addHomePageTheme', x, httpOptions);
  }

  ADD_QUICKHELP_THEME (x: any) {
    let httpOptions = { headers: new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('admin_token') }) };
    return this.http.post<any>(environment.ws_url+'/admin/restaurant/addQuickHelp', x, httpOptions);
  }

  ADD_BROKENIMAGES_THEME (x: any) {
    let httpOptions = { headers: new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('admin_token') }) };
    return this.http.post<any>(environment.ws_url + '/admin/restaurant/addBrokenImage', x, httpOptions);
  }

  THEME_LIST(x: any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+ '/admin/restaurant/getTheme', x, httpOptions);
  }

  BRANCH_LIST(x:any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/branch/list', x, httpOptions);
  }
  POS_BRANCH_LIST(x:any) {
   // let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
   //return this.http.post<any>(environment.ws_url+'/admin/branch/list', x, httpOptions);
   //https://web.dinamic.io/api/detail/list/branch/companyId
   console.log("x................", x)
    return this.http.get<any>('https://web.dinamic.io/api/detail/list/branch/'+x.pos_restaurant_id);
  }
  ADD_BRANCH(x:any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/branch/add', x, httpOptions);
  }
  UPDATE_BRANCH(x:any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/branch/update', x, httpOptions);
  }
  DELETE_BRANCH(x: any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/branch/delete', x, httpOptions);
  }

  UPDATE_GATEWAY(x: any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+' /admin/restaurant/paymentgateway/add', x, httpOptions);
  }
  POS_FLOOR_LIST(x:any) {   
    console.log("x................", x)
    return this.http.get<any>('https://web.dinamic.io/api/detail/list/floors/'+x.pos_branch_id);
   }
   POS_TABLE_LIST(x:any) {

    console.log("x................", x);    
     return this.http.get<any>('https://web.dinamic.io/api/detail/list/tables/'+x.pos_floor_id);
   }
  TABLE_LIST(x:any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/table/list', x, httpOptions);
  }
  ADD_TABLE(x:any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/table/add', x, httpOptions);
  }
  UPDATE_TABLE(x:any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/table/update', x, httpOptions);
  }
  UPDATE_TABLESTATUS(x:any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/table/updatestatus', x, httpOptions);
  }
  DELETE_TABLE(x:any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/table/delete', x, httpOptions);
  }
  VALET_TOKEN_LIST(x: any) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/restaurant/valet/token/list', x, httpOptions);
  }
 
  ADD_VALET_TOKEN(x: any) { 
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("admin_token") }) };
    return this.http.post<any>(environment.ws_url+'/admin/restaurant/valet/token/add',x, httpOptions);
   }
  UPDATE_VALET_TOKEN(x: any) { return this.http.post<any>(environment.ws_url+'/restaurant/valet/token/update', x); }
  DELETE_VALET_TOKEN(x: any) { return this.http.post<any>(environment.ws_url+'/restaurant/valet/token/delete', x); }

  VALET_USER_LIST(x: any) { return this.http.post<any>(environment.ws_url+'/restaurant/valet/user/list', x); }
  ADD_VALET_USER(x: any) { return this.http.post<any>(environment.ws_url+'/restaurant/valet/user/add', x); }
  DELETE_VALET_USER(x: any) { return this.http.post<any>(environment.ws_url+'/restaurant/valet/user/delete', x); }
  VALET_USER_RESET_PWD(x: any) { return this.http.post<any>(environment.ws_url+'/restaurant/valet/user/reset_password', x); }
  
}
