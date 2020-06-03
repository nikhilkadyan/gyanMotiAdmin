import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Injectable()
export class CrudService {
  constructor(
    public firestore: AngularFirestore,
    public sanitizer: DomSanitizer
  ) {}

  public create(endPoint, data) {
    return this.firestore
      .collection(endPoint)
      .add(data)
      .catch(err => {
        console.log(err);
        alert(err);
      });
  }

  public read(endPoint) {
    return this.firestore.collection(endPoint, ref => ref.orderBy('date','desc')).snapshotChanges();
  }

  public update(endPoint, data) {
    return this.firestore
      .collection(endPoint)
      .doc(data.id)
      .set(data, { merge: true })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  }

  public detele(endPoint, id) {
    let confirmed = confirm("Are your sure ?");
    if (confirmed) {
      return this.firestore
        .collection(endPoint)
        .doc(id)
        .delete();
    }
    return true
  }

  // Misc
  public cleanLink(id) {
    let url = "https://www.youtube.com/embed/" + id;
    let cleanUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return cleanUrl;
  }
}
