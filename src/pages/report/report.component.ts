import {Component} from '@angular/core';
import {NavParams, Platform, AlertController} from "ionic-angular";

declare var google;
declare var firebase;

@Component({
    selector: 'report',
    templateUrl: "./report.html"
})
export class Report {
    data:any;
    keysData:any;
    platform:any;
    map:any;
    database = firebase.database();
    showAlert  = false;
    constructor(
        private navParams: NavParams,
        platform: Platform,
        private alertCtrl:AlertController,
    ) {
        this.platform = platform;
        this.data = this.navParams.get('data');
        this.keysData = Object.keys(this.data)
        console.log("get data",this.keysData,this.navParams.get('lat'),this.navParams.get('lng'));


        let that = this;
        let starCountRef = firebase.database().ref('approve/');
        starCountRef.on('value', function(snapshot) {
            console.log("Your mechanic is on the way",snapshot.val());
            if(snapshot.val())
                that.showOkDialog1("ALert!!","Your mechanic is on the way");
        });


    }



    ngAfterViewInit() {
        this.initializeMap(
            {
                coords:{
                    latitude:this.navParams.get('lat'),
                    longitude:this.navParams.get('lng')
                }
            }
        );
    }



    initializeMap(pos) {
        this.platform.ready().then(() => {
            let minZoomLevel = 15;

            this.map = new google.maps.Map(document.getElementById('map_canvas3'), {
                zoom: minZoomLevel,
                center: new google.maps.LatLng(pos.coords.latitude ,pos.coords.longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                draggable: false
            });

            let position = new google.maps.LatLng(pos.coords.latitude ,pos.coords.longitude);
            let markerImage = new google.maps.MarkerImage('assets/img/sports-car.png',
                new google.maps.Size(30, 30),
                new google.maps.Point(0, 0),
                new google.maps.Point(15, 15));
            let dogwalkMarker =
                new google.maps.Marker(
                    {
                        position: position,
                        title: "Current location",
                        icon: markerImage
                    }
                );
            dogwalkMarker.setMap(this.map);

        });


    }

    hitNotification() {
        firebase.database().ref('users/').set({
            data:this.navParams.get('data'),
            userDetail:{
                "userName":"Taha Azhar",
                "Car":"Toyota Corolla",
                "Model":"2007",
                "Contact Info":"Email@gmail.com",
                "Cell":"0322-2200004"
            }
        });
        let that = this;
        this.showOkDialog('Alert !!',"your request has been submitted to nearest mechanic you will get notified soon",
            ()=>{
                console.log("OK");
                that.showAlert = true;
            });
    }


    showOkDialog(title: string, message: string, okHandler?) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        okHandler();
                    }
                }

            ]
        });



        alert.present();
    }


    showOkDialog1(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [
                {
                    text: 'OK',

                }

            ]
        });
        alert.present();
    }

}
