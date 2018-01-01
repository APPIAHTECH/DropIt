import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public category : Array<string>
  public vstList : Array<string>
  public validInfo:boolean
  public readyToUpload:boolean
  public percentatgeUpload:number
  public state:number
  public previweImageLink:any

  constructor() {
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

  ngOnInit() {
  }


  getState(){return this.state}

  nextSection(){this.state++}
  previousSection(){this.state--}

  isValid(){
    this.validInfo = true
  }

  getData(){}

  upload(){

  }


}
