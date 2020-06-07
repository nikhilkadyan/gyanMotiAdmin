import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CrudService } from "../../core/crud.service";

@Component({
  selector: "app-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.css"]
})
export class TextComponent implements OnInit {
  allText: Array<any> = [];
  title: string = "";
  body: string = "";
  date: Date = null;
  constructor(public crud: CrudService) {}
  ngOnInit() {
    this.crud.read("text").subscribe(ref => {
      this.allText = ref.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });
    });
  }

  addText() {
    if (
      this.title === "" ||
      this.body === "" ||
      this.date === null
    ) {
      return alert("Please fill all of the fields");
    }
    let data = {
      title: this.title,
      body: this.body,
      date: new Date(this.date)
    };
    this.crud.create("text", data).then(resp => {
      if (resp) {
        this.title = '';
        this.body = '';
        this.date = null;
      }
    });
  }
}
