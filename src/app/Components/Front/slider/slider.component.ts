import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  imageLlist:Array<string>
  actualImage:string
  delayTime:number
  next:number
  changing:boolean
  effectDelayTime:number

  constructor() {
    this.imageLlist = [
      'https://i.imgur.com/cKaoj9u.jpg',
      'https://i.imgur.com/Luw1p7c.jpg',
      'https://i.redd.it/xm7yzeuoaxvx.png',
      'https://www.monstercat.com/img/artist.jpg',
      'https://zippy.gfycat.com/FearfulSinfulAnole.gif'
    ]
    this.delayTime = 3500
    this.effectDelayTime = 1500
    this.next = 4
    this.changing = false
  }

  ngOnInit() { this.slider() }

  slider(){
    let imageLenght = this.imageLlist.length -1
    this.actualImage = this.imageLlist[this.next]
  }

}
