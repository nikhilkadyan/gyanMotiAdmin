import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(public auth: AuthService, public router: Router) {
    this.auth.user$.subscribe(ref => {
      if (ref) {
        this.router.navigate(["/dashboard/murli"]);
      }
    });
  }

  ngOnInit() {}

  login() {
    this.auth.login(this.email, this.password);
  }
}
