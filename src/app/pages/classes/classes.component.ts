import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CrudService } from "../../core/crud.service";

@Component({
  selector: "app-classes",
  templateUrl: "./classes.component.html",
  styleUrls: ["./classes.component.css"]
})
export class ClassesComponent implements OnInit {
  allClasses: Array<any> = [];
  allTeachers: Array<any> = [];
  title: string = "";
  date: Date = null;
  videoId: string = "";
  teacher: string = "0";
  constructor(public crud: CrudService) {}

  ngOnInit() {
    this.crud.read("classes").subscribe(ref => {
      this.allClasses = ref.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });
    });
    this.crud.read("teachers").subscribe(ref => {
      this.allTeachers = ref.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });
    });
  }

  addCourse() {
    if (
      this.title === "" ||
      this.teacher === "0" ||
      this.date === null ||
      this.videoId === ""
    ) {
      return alert("Please fill all of the fields");
    }
    let data = {
      date: new Date(this.date),
      videoId: this.videoId,
      videoLink: "https://youtu.be/" + this.videoId,
      embedLink: "https://www.youtube.com/embed/" + this.videoId,
      title: this.title,
      teacher: this.teacher
    };
    this.crud.create("classes", data).then(resp => {
      if (resp) {
        this.date = null;
        this.videoId = "";
      }
    });
  }
}
