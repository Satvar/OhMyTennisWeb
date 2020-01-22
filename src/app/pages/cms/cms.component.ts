import { Component, OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { AppComponent } from "../../app.component";
/* [ Spinner ] */
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from "@angular/platform-browser";
//import { interval } from "rxjs";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/observable/timer";

@Component({
  selector: "app-cms",
  templateUrl: "./cms.component.html",
  styleUrls: ["./cms.component.scss"]
})
export class CmsComponent extends AppComponent implements OnInit, OnDestroy {
  public response = {
    menu_name: "",
    endpoint: "",
    seo_keyword: "",
    description: "",
    photo: "",
    details: "",
    created_date: ""
  };
  //private timerObserver: Subscription;
  alive = true;
  public myFile: any;
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }

  getIndividualCmsPage() {
    this.spinner.show();
    const endpoint: string = this.activatedRoute.snapshot.paramMap.get(
      "endpoint"
    );
    const id: string = this.activatedRoute.snapshot.paramMap.get("cmsId");
    //console.log(endpoint, id);
    if (endpoint && id) {
      this.appService
        .getAll("/admin/cms/getCmsData/" + endpoint + "/" + id)
        .subscribe(res => {
          this.response = (res as any).data.cms_list[0];
          this.myFile = this.transform(this.response["photo"]);
          this.response.photo = this.myFile;
          // if (!this.alive) {
          //   window.scrollTo(500, 500);
          // }
          //event.preventDefault();
          console.log(this.myFile);
        });
    }
    //window.location.reload();
  }

  ngOnInit() {
    // interval(1000).subscribe(x => {
    //   this.getIndividualCmsPage();
    // });
    console.log("sdfsadf", this.alive);
    if (this.alive) {
      Observable.timer(0, 2000) // only fires when component is alive
        .subscribe(() => {
          this.getIndividualCmsPage();
          this.spinner.hide();
          //this.alive = false;
        });
    }

    //let timer = Observable.timer(0, 500);
    //this.timerObserver = timer.subscribe(() => this.getIndividualCmsPage());
  }

  ngOnDestroy() {
    //this.timerObserver.unsubscribe();
    this.alive = false;
  }

  transform(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  /* [ Banner Image ] */
  // bannerImage() {
  //   this.bannerImageSources.push({
  //     url: "./assets/images/cours-particuliers-de-tennis.jpg"
  //   });
  // }
}
