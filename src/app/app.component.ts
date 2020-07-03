import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import { InfiniteCalendarComponent, InfiniteCalendarEvent, ExtDateWithEvent } from 'ng-infinite-calendar';
import { ExtDate } from 'extdate';
// import { BackendService } from './backend.service';
// import { privateEncrypt } from 'crypto';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentChecked {

  temp = [];
  index = 0;


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
      }
    ]
  };

  events: InfiniteCalendarEvent[] = [];
  selected: ExtDateWithEvent;
  hovered: ExtDateWithEvent;



  ngOnInit() {
        this.data.events.forEach(element => {
          const body = '';
          const data = {};
          const title = element['name'];
          const startDate = element['start'].split('-');
          const beginAt = new ExtDate(Number(startDate[0]), Number(startDate[1]), Number(startDate[2]), 0, 0, 0);
          const endDate = element['end'].split('-');
          const endAt = new ExtDate(Number(endDate[0]), Number(endDate[1]), Number(endDate[2]), 0, 0, 0);
          this.temp.push({ title, body, beginAt, endAt, data });
    });
    this.events = this.temp;
  }

  ngAfterViewInit(): void {
    // tslint:disable-next-line:max-line-length
    $('.event').parent().parent().css({ 'background-color': 'rgb(3, 155, 229)', 'border': '2px solid white', 'border-radius': '10px', 'box-sizing': 'initial' });
    $('.event').css({ 'color': 'white' });
  }

  ngAfterContentChecked(): void {
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
