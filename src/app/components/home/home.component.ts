import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/providers/youtube.service';

declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [ ]
})
export class HomeComponent implements OnInit {
  videos:any[]=[];
  videoSel:any;


  constructor(public _yts:YoutubeService) {
    this._yts.getVideos()
      .subscribe((data:any)=>{
        this.videos = data
      });

  }

  ngOnInit() {
  }
  verVideo(video:any){
    this.videoSel = video;
    $('#myModal').modal('show');
  }
  cerrarModal(){
    $('#myModal').modal('hide');
  }
  CargarMas(){
    this._yts.getVideos()
      .subscribe((videos:any)=>{
        this.videos.push.apply(this.videos,videos)
      });

  }

}
