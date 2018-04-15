import { Component, OnInit } from '@angular/core';
import { Project } from '../../../model/Projects.model'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public category : Array<string>
  public vstList : Array<string>
  public validInfo:boolean
  public readyToUpload:boolean
  public text:string;
  public percentatgeUpload:number
  public state:number
  public previweImageLink:any

  constructor() {
    this.text = "Got A New Track ?"
    this.previweImageLink = "https://i.imgur.com/cKaoj9u.jpg"
    this.state = 1
    this.percentatgeUpload = 0
    this.validInfo = false
    this.readyToUpload = false
    this.category = [
      'HipHop',
      'GlitchHop',
      'Rap',
      'Reggae',
      'Jazz',
      'FutureBass',
      'Trap',
      'House',
      'Soul',
      'Clasic',
      'DrumBass',
      'DrumStep'
    ]

    this.vstList = [
      'Hypersonic',
      'Ravity',
      'Purity',
      'Nexsus',
      'Generic Fl Studio Plugins',
      'Others'
    ]

   }


  getState(){return this.state}
  setText(text){
    this.text = text
  }
  ngOnInit() {
  }

  nextSection(){this.state++}
  previousSection(){this.state--}

  isValid(){
    this.validInfo = true
  }

  getData(){}

  upload(){

  }

}
