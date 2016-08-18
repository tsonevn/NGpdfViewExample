import {Component} from "@angular/core";
import {knownFolders, path, Folder, File} from "file-system";
import {isAndroid, isIOS} from "platform";
import {Page} from "ui/page";
import {WebView} from "ui/web-view"


@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public loadfile="";
    constructor(){}

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
}
