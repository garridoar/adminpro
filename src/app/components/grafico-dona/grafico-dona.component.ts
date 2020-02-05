import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html'
})
export class GraficoDonaComponent implements OnInit {

  @Input() labels: any;
  @Input() data: any;
  @Input() chartType: any;

  constructor() { }

  ngOnInit() { }

}
