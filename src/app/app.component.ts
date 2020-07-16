import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import { InfiniteCalendarComponent, InfiniteCalendarEvent, ExtDateWithEvent } from 'ng-infinite-calendar';
import { ExtDate } from 'extdate';


import { BackendserviceService } from './Backendservice.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentChecked {

  temp = [];
  index = 0;
showcalnder = true;

  data = {
    'events': [
      {
        'start': '2020-06-10',
        'end': '2020-06-10',
        'name': 'Mumbai',
      },
      {
        'start': '2020-06-12',
        'end': '2020-06-13',
        'name': 'Bangalore'
      },
      {
        'start': '2020-06-15',
        'end': '2020-06-16',
        'name': 'Sewree'
      },

      {
        'start': '2020-07-1',
        'end': '2020-07-6',
        'name': 'Bangalore'
      },
      {
        'start': '2020-07-8',
        'end': '2020-07-9',
        'name': 'Bangalore'

        //         color: "plum"
        // comments: "functionalities"
        // destination: "Port Jermeyview"
        // duration: "1-688-236-8113"
        // id: "1"
        // start: "2021-02-27T13:28:41.229Z"



      }
    ]
  };

  events: InfiniteCalendarEvent[] = [];
  selected: ExtDateWithEvent;
  hovered: ExtDateWithEvent;
  jsonUrl = 'https://5f08a0e6445d080016691afb.mockapi.io/trips';
  dataFromApi: any;

  constructor(private backendservice: BackendserviceService) { }

  ngOnInit() {
    //     this.data.events.forEach(element => {
    //       const body = '';
    //       const data = {};
    //       const title = element['name'];
    //       const startDate = element['start'].split('-');
    //       const beginAt = new ExtDate(Number(startDate[0]), Number(startDate[1]), Number(startDate[2]), 0, 0, 0);
    //       const endDate = element['end'].split('-');
    //       const endAt = new ExtDate(Number(endDate[0]), Number(endDate[1]), Number(endDate[2]), 0, 0, 0);
    //       this.temp.push({ title, body, beginAt, endAt, data });
    // });
    // this.events = this.temp;

    this.jsonToLoad();
  }



  jsonToLoad() {
    this.backendservice.dataJsonLoad(this.jsonUrl).subscribe(
      res => {
        // console.log(res);
        this.dataFromApi = res;
        this.calanderEventBinding();
      }
    );
  }


  calanderEventBinding() {
    this.events = [];
    // $('div').removeClass('event');

    this.dataFromApi.forEach(element => {
      const body = '';
      const data = {};
      const title = element['destination'];
      const id = element['id'];
      const startDate = element['start'].split('-');
      const _sdate = startDate[2].split('T');
      const beginAt = new ExtDate(Number(startDate[0]), Number(startDate[1]), Number(_sdate[0]), 0, 0, 0);
      const _endDate = this.randomIntFromInterval(1, 10);

      //  const day = new Date('2019-06-11');

      const day = new Date(element['start']);
      console.log(day);

      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + _endDate);
      console.log(nextDay);


      // const endDate = element['end'].split('-');
      const endAt = new ExtDate(Number(nextDay.getFullYear()), Number(nextDay.getMonth() + 1), Number(nextDay.getDate()), 0, 0, 0);
      this.temp.push({ title, body, beginAt, endAt, data });
    });

    this.events = this.temp;
    this.temp = [];
    console.log(this.temp);
    debugger;
    this.showcalnder = true;
    this.ngAfterContentChecked();
  }

  myClickFunction(i) {
    console.log(i);
    this.backendservice.deleteRecord(this.jsonUrl + '/' + i).subscribe(
      res => {
        console.log(res);
         alert('Event ' + res.destination + ' deleted successfully');
         this.jsonToLoad();
        //  location.reload();
        this.showcalnder = false;
        // this.dataFromApi = res;
        // this.calanderEventBinding();
        // this.ngOnInit();
      }
    );

  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngAfterViewInit(): void {

    // $('.cell').removeAttr( 'style' );
    // tslint:disable-next-line:max-line-length
    $('.event').parent().parent().css({ 'background-color': 'rgb(3, 155, 229)', 'border': '2px solid white', 'border-radius': '10px', 'box-sizing': 'initial' });
    $('.event').css({ 'color': 'white' });
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
    // $('.cell').removeAttr( 'style' );
    // tslint:disable-next-line:max-line-length
    $('.event').parent().parent().css({ 'background-color': 'rgb(3, 155, 229)', 'border': '2px solid white', 'border-radius': '10px', 'box-sizing': 'initial' });
    $('.event').css({ 'color': 'white' });
  }

  onSelectDate(edwe: ExtDateWithEvent) {
    this.selected = edwe;
  }

  onHoverDate(edwe: ExtDateWithEvent) {
    this.hovered = edwe;
  }
}
