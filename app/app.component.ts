import {Component, OnInit} from "@angular/core";
import {knownFolders, path, Folder, File} from "file-system";
import {ModalDialogService, ModalDialogOptions, ModalDialogHost} from "nativescript-angular/modal-dialog";
import {ModalDialogParams} from "nativescript-angular/modal-dialog";
import {isAndroid, isIOS} from "platform";
import {Page} from "ui/page";
import {WebView} from "ui/web-view";
import {alert} from "ui/dialogs";
import { GestureEventData } from "ui/gestures";



@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    directives: [ModalDialogHost],
    providers: [ModalDialogService],
})
export class AppComponent implements OnInit {
    public loadfile="https://partners.adobe.com/public/developer/en/xml/AdobeXMLFormsSamples.pdf";
    private calls = 0;
    constructor(private _modalService: ModalDialogService){}

    public loadPdf(args:string){
        switch (args) {
            case "web":
                this.loadfromURL();
                break;
            case "file":
                this.loadfromfile();
                break;
            default:
                break;
        }
    }

    ngOnInit() {
        alert("--Double Tap - to open on fullscreen--   --Long Press - to close fullscreen--");
    }

    public loadfromfile(){
        var documents = knownFolders.documents();
        var file:File = <File>documents.getFile("app/files/pdf.pdf");
        console.log(file.path);
        this.loadfile = file.path;
    }

    public loadfromURL(){
        this.loadfile = "https://partners.adobe.com/public/developer/en/xml/AdobeXMLFormsSamples.pdf";
    }
    public submit(args:string){
        this.loadfile = args;
    }

    public createModelView(src:string) {
        console.log("create modal view");
        console.log("source "+src )
        var that = this;
        var options: ModalDialogOptions = {context:src,fullscreen: false};

        this._modalService.showModal(PDFFullScreenComponent, options)
            .then((result: string) => {
                console.log("result "+result);
                this.calls=0;
            })
    }
}


@Component({
    selector: 'modal-content',
    template: `
    <StackLayout>
        <PDFView (longPress)="close()" [src]="source"></PDFView>
    </StackLayout>
    `
})
export class PDFFullScreenComponent implements OnInit{
    public source="";
    constructor(private params: ModalDialogParams, private page: Page) {
       console.log("mv "+this.params.context);
    }
    ngOnInit()
    {
         
        this.source = this.params.context;
    }

     public close() {
             this.params.closeCallback("fullscreen closed");
     }
}