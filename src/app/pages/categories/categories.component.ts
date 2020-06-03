import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CrudService } from "../../core/crud.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  allCategories: Array<any> = [];
  name: string = "";
  constructor(public crud: CrudService) {}

  ngOnInit() {
    this.crud.read("categories").subscribe(ref => {
      this.allCategories = ref.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });
    });
  }

  addCategory() {
    if (this.name === "" ) {
      return alert("Please fill all of the fields");
    }
    let data = {
      name: this.name,
      date: new Date()
    };
    this.crud.create("categories", data).then(resp => {
      if (resp) {
        this.name = null;
      }
    });
  }
}
