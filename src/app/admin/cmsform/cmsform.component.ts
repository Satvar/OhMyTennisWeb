import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminComponent } from "../../model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import * as $ from "jquery";

@Component({
  selector: "app-cmsform",
  templateUrl: "./cmsform.component.html",
  styleUrls: ["./cmsform.component.scss"]
})
export class CmsformComponent extends AdminComponent implements OnInit {
  name = "ng2-ckeditor";
  ckeConfig: any;
  mycontent: string;
  log: string = "";
  @ViewChild("myckeditor", { static: false }) ckeditor: any;
  //  @ViewChild("myckeditor") ckeditor: any;

  public res = {
    id: "",
    menu_name: "",
    endpoint: "",
    seo_keyword: "",
    description: "",
    photo: "",
    details: ""
    /*photo:
      "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png"*/
  };

  public team_error = false;
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
    this.mycontent = ``;
  }

  ngOnInit() {
    this.getcms();
    var titile = document.getElementsByClassName("brand");
    if (titile) titile[0].innerHTML = "MON COMPTE";

    let formInputItem = document
      .querySelectorAll(".form_devarea")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function(inputElement) {
      inputElement.setAttribute("disabled", "true");
    });

    let textare1 = document.getElementById(
      "exampleFormControlTextarea1"
    ) as HTMLTextAreaElement;
    textare1.setAttribute("disabled", "true");

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.style.display = "inline";
    let elebebtn1 = document.querySelector("#enableBtn1") as HTMLElement;
    elebebtn1.style.display = "none";

    elebebtn.setAttribute("data-toggle", "modal");

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "none";

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "none";
    window.scrollTo(0, 0);
  }

  uriChange($event: any): void {
    var text = this.res.menu_name.replace(/ +/g, " ").trim();
    this.res.endpoint = text.replace(/\s/g, "-").toLowerCase();
    //this.log += new Date() + "<br />";
  }

  enableForm() {
    $("#availabilityDiv :input").prop("readonly", false);
    $("#availabilityDiv :input").prop("required", true);
    $("#endpoint").prop("readonly", true);

    let itransport = document.querySelectorAll(".form-group");
    itransport.forEach(function(checkItem) {
      checkItem.removeAttribute("disabled");
    });

    let formInputItem = document
      .querySelectorAll(".form_devarea")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function(inputElement) {
      inputElement.removeAttribute("disabled");
    });

    let textarea = document.getElementById(
      "exampleFormControlTextarea1"
    ) as HTMLTextAreaElement;
    textarea.removeAttribute("disabled");

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.style.display = "none";

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "inline";

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "inline";
  }

  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }

  onPaste($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />";
  }

  propagateChange = (result, file, type) => {
    this.res.photo = result;
    //this.res.filename = file.name;
  };

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = _event => {
      this.propagateChange(reader.result, file, file.type);
    };
    reader.onerror = function(error) {};
  }

  onSubmit(res) {
    const id = this.activatedRoute.snapshot.queryParamMap.get("id");

    if (id) {
      this.res.id = id;
    }

    this.spinner.show();

    this.appService.create("/admin/cms/add", res).subscribe(response => {
      if (response && response.isSuccess == true) {
        this._showAlertMessage("alert-success", "Mis à jour avec succés");

        if (id) {
          this.updateform();
        } else {
          this.setform();
        }
        this.spinner.hide();
      } else {
        this._showAlertMessage("alert-danger", "Échec de la mise à jour");
        this.spinner.hide();
      }
    });
  }

  // makeEnable() {
  //   $(".form-group :input").prop("readonly", false);
  //   $(".form-group :input").prop("required", true);
  //   $("#email").prop("disabled", true);
  //   $("#submit").prop("readonly", false);
  //   // this.buttonDisabled = false;
  // }

  setform() {
    let formInputItem = document
      .querySelectorAll(".form_devarea")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function(inputElement) {
      inputElement.setAttribute("disabled", "true");
    });

    let textare1 = document.getElementById(
      "exampleFormControlTextarea1"
    ) as HTMLTextAreaElement;
    textare1.setAttribute("disabled", "true");

    // let textare2 = document.getElementById("exampleFormControlTextarea2") as HTMLTextAreaElement;
    // textare2.setAttribute("disabled", "true");

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.style.display = "inline";

    elebebtn.setAttribute("data-toggle", "modal");

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "none";

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "none";
  }

  updateform() {
    let formInputItem = document
      .querySelectorAll(".form_devarea")[0]
      .querySelectorAll("input");
    formInputItem.forEach(function(inputElement) {
      inputElement.setAttribute("disabled", "true");
    });

    let textare1 = document.getElementById(
      "exampleFormControlTextarea1"
    ) as HTMLTextAreaElement;
    textare1.setAttribute("disabled", "true");

    // let textare2 = document.getElementById("exampleFormControlTextarea2") as HTMLTextAreaElement;
    // textare2.setAttribute("disabled", "true");

    let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
    elebebtn.style.display = "none";

    elebebtn.setAttribute("data-toggle", "modal");

    let icancel = document.querySelector("#cancel") as HTMLElement;
    icancel.style.display = "none";

    let Enregistrer = document.querySelector("#Enregistrer") as HTMLElement;
    Enregistrer.style.display = "none";
  }

  // changeListener($event): void {
  //   this.readThis($event.target);
  // }

  // readThis(inputValue: any): void {
  //   var file: File = inputValue.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = _event => {
  //     this.propagateChange(reader.result, file, file.type);
  //   };
  //   reader.onerror = function(error) {};
  // }

  getcms() {
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: "divarea",
      filebrowserUploadUrl: "http://192.168.1.32:3004/admin/cmsfileupload",
      forcePasteAsPlainText: true
    };
    const id = this.activatedRoute.snapshot.queryParamMap.get("id");

    var cms_id = {
      cms_id: id
    };

    this.spinner.show();
    if (id != "") {
      this.appService
        .create("/admin/cms/getCmsValue", cms_id)
        .subscribe((data: any) => {
          if (data.isSuccess == true) {
            this.spinner.hide();
            this.res = data.data.cms_list[0];
            let elebebtn = document.querySelector("#enableBtn") as HTMLElement;
            elebebtn.style.display = "none";
            let elebebtn1 = document.querySelector(
              "#enableBtn1"
            ) as HTMLElement;
            elebebtn1.style.display = "inline";
          } else {
            this.spinner.hide();
          }
        });
    }
  }
}
