import {Component} from "@angular/core";
import {knownFolders, path, Folder, File} from "file-system";
import {isAndroid} from "platform"


@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public loadfile="";
    constructor(){
        if(isAndroid){
            var documents = knownFolders.documents();
            var file:File = <File>documents.getFile("app/files/pdf.pdf");
            console.log(file.path);
            this.loadfile = file.path;
        }
    }
}
