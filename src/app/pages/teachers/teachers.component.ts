import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CrudService } from "../../core/crud.service";

@Component({
  selector: "app-teachers",
  templateUrl: "./teachers.component.html",
  styleUrls: ["./teachers.component.css"]
})
export class TeachersComponent implements OnInit {
  allTeachers: Array<any> = [];
  name: string = "";
  constructor(public crud: CrudService) {}

  ngOnInit() {
    this.crud.read("teachers").subscribe(ref => {
      this.allTeachers = ref.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });
    });
  }

  addTeacher() {
    if (this.name === "") {
      return alert("Please fill all of the fields");
    }
    let data = {
      name: this.name,
      date: new Date()
    };
    this.crud.create("teachers", data).then(resp => {
      if (resp) {
        this.name = null;
      }
    });
  }
}
