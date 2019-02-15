import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl:string = "https://www.googleapis.com/youtube/v3";
  private apiKey:string = "AIzaSyBtWb7X42J0G0PmLi_xN_-oGFY39Om71hs";
  private channelId:string ="UCuaPTYj15JSkETGnEseaFFg"
  private nextPageToken:string = "CAoQAA"
  private playlist:string = "UUuaPTYj15JSkETGnEseaFFg"

  constructor(public _http:HttpClient) {

  }

  getQuery(query: string, params:HttpParams){
     const url= `${this.youtubeUrl}${query}`;
     return this._http.get(url, {params});
  }
  getVideos(){
    let url =`/playlistItems`;
    let params = new HttpParams();
    params = params.set('part','snippet');
    params = params.set('maxResults','10');
    params = params.set('channelId',this.channelId);
    params = params.set('playlistId', this.playlist);
    params= params.set('key', this.apiKey);

    if (this.nextPageToken){
      params= params.set('pageToken', this.nextPageToken);
    }

    return this.getQuery(url, params)
            .pipe(map((data:any)=>{
              console.log(data);

              this.nextPageToken = data['nextPageToken'];
              let videos:any[]= [];
              for (let  video of data['items']) {
                let snippet = video['snippet'];
                videos.push(snippet);
              }
              return videos;

            })
          );
  }
}
