import { Injectable } from '@angular/core';
import { Http, Response , RequestOptions , Headers} from '@angular/http';
import { ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataRequestService {

  public authToken : string;
  constructor (private http: Http) {}

  public get(url:string , authorizationHeader : boolean ){

    if(authorizationHeader){

      let headers:Headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.authToken}`);
      let options = new RequestOptions({ headers: headers });

      return this.http.get(url , options)
                      .map(this.extractData)
                      .catch(this.handleError);
    }else{

      return this.http.get(url)
                      .map(this.extractData)
                      .catch(this.handleError);
    }

  }

  public getDownload(url:string , authorizationHeader : boolean ){

    return this.http.get(url , { responseType: ResponseContentType.Blob })
                    .map(this.extractDataDownload)
                    .catch(this.handleError);
  }

  public setToken(token){this.authToken = token}

  public post(url:string , data:any){
    let header = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: header });
    return this.http.post(url, data, options)
                 .map(this.extractData)
                 .catch(this.handleError);
  }

  public postContent(url:string , content:any , multiPart : boolean = false){
    let header = new Headers();

    let options = new RequestOptions({ headers: header });

    return this.http.post(url, content, options)
                 .map(this.extractData)
                 .catch(this.handleError);
  }

  private extractData(res: Response) {
    return  res.json() || { };
  }

  private extractDataDownload(res: any) {
    return  res || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
