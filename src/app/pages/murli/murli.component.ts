import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../../core/crud.service';

@Component({
  selector: 'app-murli',
  templateUrl: './murli.component.html',
  styleUrls: ['./murli.component.css']
})
export class MurliComponent implements OnInit {
  allMurli: Array<any> = []
  date: Date = null;
  videoId: string = "";
  constructor(public crud: CrudService) { }

  ngOnInit() {
   this.crud.read('murli').subscribe(ref => {
      this.allMurli = ref.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        }
      })
    })
  }

  addMurli(){
    if(this.date === null || this.videoId === ''){
      return alert('Please fill all of the fields')
    }
    let data = {
      date: new Date(this.date),
      videoId: this.videoId,
      videoLink: 'https://youtu.be/' + this.videoId,
      embedLink: 'https://www.youtube.com/embed/' + this.videoId
    }
    this.crud.create('murli',data).then(resp => {
      if(resp){
        this.date = null;
        this.videoId = ''
      }
    })
  }

}