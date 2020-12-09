import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fleur',
  templateUrl: './fleur.component.html',
  styleUrls: ['./fleur.component.scss']
})
export class FleurComponent implements OnInit {

  @Input() fleurName: string;
  //fleurName: string = 'Pivoine';

  @Input() fleurStatus: string;
  //fleurStatus: string = 'arrosée';

  constructor() { }

  ngOnInit(): void {
  }

  getStatus() {
    return this.fleurStatus;
  }

  getColor() {
    if(this.fleurStatus === 'arrosée') {
      return 'green';
    } else if(this.fleurStatus === 'non arrosée') {
      return 'red';
    }
}


}
