import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(public auth: AuthService, public router: Router) {
    this.auth.user$.subscribe(ref => {
      if (!ref) {
        this.router.navigate(["/"]);
      }
    });
  }

  ngOnInit() {}
}
