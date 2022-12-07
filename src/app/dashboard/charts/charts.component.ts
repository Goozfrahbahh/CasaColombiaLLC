import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import * as shape from 'd3-shape';

@Component({
  selector: "chartdash",
  templateUrl: "./charts.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent implements OnInit {
  color: Color = {
    name: "custom",
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ["#25b2e3", "#D35400", "#2ECC71", "#F1C40F", "#4C5D6E", "#AF4AAA"],
  };

  data = [
    {
      name: "Take-out",
      series: [
        {
          value: 45,
          name: new Date(2022, 9, 25),
        },
        {
          value: 20,
          name: new Date(2022, 9, 26),
        },
        {
          value: 44,
          name: new Date(2022, 9, 27),
        },
        {
          value: 15,
          name: new Date(2022, 9, 28),
        },
        {
          value: 40,
          name: new Date(2022, 9, 29),
        },
        {
          value: 20,
          name: new Date(2022, 9, 30),
        },
        {
          value: 55,
          name: new Date(2022, 9, 31),
        },
      ],
    },
    {
      name: "Take-out Fee's",
      series: [
        {
          value: 50,
          name: new Date(2022, 9, 25),
        },
        {
          value: 25,
          name: new Date(2022, 9, 26),
        },
        {
          value: 50,
          name: new Date(2022, 9, 27),
        },
        {
          value: 20,
          name: new Date(2022, 9, 28),
        },
        {
          value: 50,
          name: new Date(2022, 9, 29),
        },
        {
          value: 25,
          name: new Date(2022, 9, 30),
        },
        {
          value: 60,
          name: new Date(2022, 9, 31),
        },
      ],
    },
  ];
  single2 = [
    {
      name: "Bistec Chico",
      value: 145,
    },
    {
      name: "Lomo de Res A La Parilla",
      value: 198,
    },
    {
      name: "Bistec Grande",
      value: 154,
    },
    {
      name: "Pechuga De Pollo",
      value: 175,
    },
    {
      name: "Salmon Y Limon En Matequilla",
      value: 124,
    },
    {
      name: "Pescado Frito",
      value: 185,
    },
  ];
  single = [
    {
      name: "Take-out",
      value: 145,
    },
    {
      name: "Take-out Fee's",
      value: 198,
    },
    {
      name: "Dine-in",
      value: 154,
    },
    {
      name: "Food Cost - Vegetables",
      value: 175,
    },
    {
      name: "Food Cost - Meat",
      value: 219,
    },
    {
      name: "Food Cost - Extra",
      value: 111,
    },
    {
      name: "Amentities Cost",
      value: 90,
    },
  ];

  /** NgX Charts Component:
   *      Options
   */

  // -graph appearance options
  showGridlines: boolean = true;
  showLegend: boolean = false;
  showReferenceLines: boolean = true;
  animation: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel = false;
  showYAxisLabel = true;
  showLabels: boolean = true;
  autoScale = true;
  yAxisLabel = "Sale's";

  //graph color options
  gradient: boolean = true;
  scheme: string | Color;
  bandColor = "vivid";
  cardColor = "rgba(255, 255, 255, .01)";
  textColor = "#536571";

  // -graph options for plug-ins and add-ons
  timeline = true;
  explodeSlices: boolean = true;
  isdoughnut: boolean = true;
  isdough: boolean = false;
  legend: boolean = true;
  legendPosition = LegendPosition.Below;
  innerpadding = "9%";

  //Extra-Labels polar chart
  yPolarLabel = "Amount";
  xPolarLabel = "Date";

  super: Color;

  A = shape.curveBasisClosed;
  B = shape.curveCatmullRomClosed;
  C = shape.curveLinearClosed;
  D = shape.curveCardinalClosed;

  constructor() {
    this.scheme = this.color;
  }
  tension: any;
  curve = this.A;
  ngOnInit(): void {}
  onSelect(event: any) {
    console.log(event);
  }
  toggle() {
    switch (this.isdoughnut) {
      case false:
        this.isdoughnut = true;
        console.log(true);
        break;
      case true:
        this.isdoughnut = false;
        console.log(false);
        break;
    }
  }

  toggleP() {
    switch (this.curve) {
      case this.A:
        this.B.alpha(0.5);
        this.curve = this.B;
        break;
      case this.B:
        this.curve = this.C;
        break;
      case this.C:
        this.D.tension(0.5);
        this.curve = this.D;
        break;
      case this.D:
        this.curve = this.A;
        break;
    }
  }
}

// dateTickFormatting(val: any): String {
//   val = new Date(val);
//     if (val instanceof Date) {
//       var options = { month: 'long' };
//       //return (<Date>val).toLocaleString('de-DE', options);
//       return (<Date>val).toLocaleString('en-US',{ month: 'long', day: '2-digit' });
//     }
//     return val;
// }

/**
 * ngOnInit(): void {
 * this.inventoryService.getItemDaily(this.itemId)
 *  .subscribe(data => console.log(data);
 *    this.single = data.map(datum => ({ name: datum.name, address: datum.dailyTotal}));
 *  });
 * }
 */
