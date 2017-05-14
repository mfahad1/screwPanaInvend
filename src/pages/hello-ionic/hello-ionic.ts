import {Component} from '@angular/core';
import {Platform,  NavController} from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import {askProblem} from '../askProblem/askProblem.component'
declare var google;

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  platform:any;
  map:any;
  currentPosition:any;


  constructor(
      platform: Platform,
      geolocation: Geolocation,
      public navCtrl: NavController
  ) {
    this.platform = platform;
    let options = { enableHighAccuracy: true };
    // geolocation.getCurrentPosition().then(pos => {
    //   alert("getting location");
    //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
    //   this.position = pos;
    // }).catch(err =>{alert(err.stringify())});;

    this.initializeMap({
      coords:{
        latitude:24.88271,
        longitude:67.06434
      }
    });

  }

  ngAfterViewInit() {
    let searchOptions = {
      types: [],
      componentRestrictions: {country: "pk"}
    }
    let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
    let autocomplete1 = new google.maps.places.Autocomplete(nativeHomeInputBox, searchOptions);
    let that =this;
    google.maps.event.addListener(autocomplete1, 'place_changed', function() {
      console.log("FROM CHANGED!",autocomplete1.getPlace().geometry.location.lat(),autocomplete1.getPlace().geometry.location.lng());
      that.initializeMap({
        coords:{
          latitude:autocomplete1.getPlace().geometry.location.lat(),
          longitude:autocomplete1.getPlace().geometry.location.lng()
        }
      })
    })
  }

  ionViewDidLoad(){
    // this.initializeMap();
  }

  initializeMap(pos) {
    this.currentPosition = pos;
    this.platform.ready().then(() => {
      let minZoomLevel = 15;

      this.map = new google.maps.Map(document.getElementById('map_canvas'), {
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

  goto(){
    this.navCtrl.push(askProblem,{
      lat:this.currentPosition.coords.latitude,
      lng:this.currentPosition.coords.longitude
    });
  }


}
