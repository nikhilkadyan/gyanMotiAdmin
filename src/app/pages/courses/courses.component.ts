import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CrudService } from "../../core/crud.service";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"]
})
export class CoursesComponent implements OnInit {
  allCourses: Array<any> = [];
  allCategories: Array<any> = [];
  title: string = "";
  date: Date = null;
  videoId: string = "";
  category: string = "0";
  constructor(public crud: CrudService) {}

  ngOnInit() {
    this.crud.read("courses").subscribe(ref => {
      this.allCourses = ref.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });
    });
    this.crud.read("categories").subscribe(ref => {
      this.allCategories = ref.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });
    });
  }

  addCourse() {
    if (
      this.date === null ||
      this.videoId === "" ||
      this.category === "0" ||
      this.title === ''
    ) {
      return alert("Please fill all of the fields");
    }
    let data = {
      date: new Date(this.date),
      videoId: this.videoId,
      videoLink: "https://youtu.be/" + this.videoId,
      embedLink: "https://www.youtube.com/embed/" + this.videoId,
      title: this.title,
      category: this.category
    };
    this.crud.create("courses", data).then(resp => {
      if (resp) {
        this.date = null;
        this.videoId = "";
      }
    });
  }
}
