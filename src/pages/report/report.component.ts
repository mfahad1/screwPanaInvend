import {Component} from '@angular/core';
import {NavParams, Platform} from "ionic-angular";

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
    constructor(
        private navParams: NavParams,
        platform: Platform,
    ) {
        this.platform = platform;
        this.data = this.navParams.get('data');
        this.keysData = Object.keys(this.data,)
        console.log("get data",this.keysData,this.navParams.get('lat'),this.navParams.get('lng'));



        var starCountRef = firebase.database().ref('users/');
        starCountRef.on('value', function(snapshot) {
            alert(snapshot);
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
                mapTypeId: google.maps.MapTypeId.ROADMAP
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
            dummy:"here heree222"
        });

        alert("your request has been submitted to nearest mechanic you will get notified soon");
    }
}
