import {Component} from '@angular/core';
import {NavParams, Platform, NavController} from "ionic-angular";
import {Report} from '../report/report.component'
declare var google;

@Component({
    selector: 'Ask-problem',
    templateUrl: "./askProblem.html",
})
export class askProblem {

    map:any;
    data: any= [];
    selectedOptions:any = {
        'Flat Tire':[],
        'Out of Fuel':[],
        'Broken':[],
        'Car Overheating':[],
        'Car Starting Issues':[],
        'Others':[]
    };
    constructor(
        private navParams: NavParams,
        private platform: Platform,
        public navCtrl: NavController
    ){
        console.log(this.navParams.get('lat') );
        console.log(this.navParams.get('lng') );



        this.data.push({
                title: 'Flat Tire',
                details: [{text:'No spare Wheel',show:false},{text:'No Jack or Tools',show:false}],

                icon: 'md-arrow-round-forward',
                showDetails: false
            },
            {
                title: 'Out of Fuel',
                details:[{text:'Car On Petrol (tick means yes otherwise no)',show:false}] ,
                icon: 'md-arrow-round-forward',
                showDetails: false
            },
            {
                title: 'Broken',
                details: [{text:'Broken clutch wire',show:false},{text:'Fan belt Broken',show:false}] ,
                icon: 'md-arrow-round-forward',
                showDetails: false
            },
            {
                title: 'Car Overheating',
                details:[{text:'Fan working?',show:false},{text:'Coolant  present',show:false}],
                icon: 'md-arrow-round-forward',
                showDetails: false
            },
            {
                title: 'Car Starting Issues',
                details: [{text:' Self Working',show:false}],
                icon: 'md-arrow-round-forward',
                showDetails: false
            },
            {
                title: 'Others',
                details: [{text:' Fuse Blown',show:false},{text:'Dead Battery',show:false}],
                icon: 'md-arrow-round-forward',
                showDetails: false
            }
        );


    }



    ngAfterViewInit(){

        this.initializeMap({
            coords:{
                latitude:this.navParams.get('lat'),
                longitude:this.navParams.get('lng')
            }
        });
    }

    initializeMap(pos) {
        this.platform.ready().then(() => {
            let minZoomLevel = 15;

            this.map = new google.maps.Map(document.getElementById('map_canvas2'), {
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

    toggleDetails(data) {


        if (data.showDetails) {
            data.showDetails = false;
            data.icon = 'md-arrow-round-forward';

        } else {
            data.showDetails = true;
            data.icon = 'md-arrow-round-down';

        }
    }

    addSubList(subList,title){
        // console.log("here",subList);

        this.selectedOptions[title].push(subList);
        subList.show = !subList.show;

        console.log(this.selectedOptions);
    }

    submitData(){
        let selected ={};
        let keys =Object.keys(this.selectedOptions).filter(opt => {
                if (this.selectedOptions[opt].length > 0)
                {
                    return this.selectedOptions[opt]
                }
            }
        );

        keys.forEach(key=>{
            selected[key] = []
        });

        keys.forEach(key=>{

            console.log("yoyo",this.selectedOptions[key]);
            this.selectedOptions[key].forEach(data=>{
                selected[key].push(data.text);
            })

                // Object.keys(this.selectedOptions[key]).filter(opt => {
                //
                //     if (opt['show'])
                //         {
                //             console.log("hahah",opt);
                //             selected[key].push(opt['text']);
                //         }
                //     }
                // )


        });

        this.navCtrl.push(Report,{
            data:selected,
            lat:this.navParams.get('lat'),
            lng:this.navParams.get('lng')
        });
        console.log(selected);
    }

}
