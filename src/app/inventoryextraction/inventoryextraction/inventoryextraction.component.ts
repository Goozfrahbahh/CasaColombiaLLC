import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, VERSION, ViewChild, ɵɵNgOnChangesFeature } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import {
  map,
  of,
  switchMap,
  Observable,
  BehaviorSubject,
  catchError,
  ReplaySubject,
  Subscription,
} from 'rxjs';
import { ExtractService, csv } from '../services/extraction.service';

@Component({
  selector: 'inventoryextractor',
  templateUrl: './inventoryextraction.component.html',
  styleUrls: ['inventoryextraction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
      trigger('pageAnimations', [
        transition(':enter', [
          query(', div', [
            style({ opacity: 0, transform: 'translateX(+100px)' }),
            stagger(10, [animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))]),
          ]),
        ]),
      ]),
      trigger('filterAnimation', [
        transition(':enter, * => 0, * => -1', []),
        transition(':increment', [
          query(
            ':enter',
            [
              style({ opacity: 0, width: '0px' }),
              stagger(50, [animate('150ms ease-out', style({ opacity: 1, width: '*' }))]),
            ],
            { optional: true }
          ),
        ]),
        transition(':decrement', [
          query(':leave', [stagger(50, [animate('300ms ease-out', style({ opacity: 0, width: '0px' }))])]),
        ]),
      ]),
    ],
})
export class InventoryExtractionComponent implements OnDestroy {
  numberEntered?: number;
  entreeList: (string | number)[][] = [
    ['Aborrajado', 0],
    ['Arepa', 0],
    ['Bunuelos', 0],
    ['Ceviche Peruano', 0],
    ['Coctel de Camarones', 0],
    ['Empanadas', 0],
    ['Morcilla', 0],
    ['Pandebono', 0],
    ['Patacones Rellenos', 0],
    ['Picada Colombiana', 0],
    ['Tequenos', 0],
    ['Sopa de Patacones', 0],
    ['Sopa de Ajiaco', 0],
    ['Ensalada de la Casa', 0],
    ['Ensalada de Tomate y Aguate', 0],
    ['Ensalada de Pollo', 0],
    ['Ensalada de Salmon', 0],
    ['Ensalada de Pescado', 0],
    ['Ensalada de Camarones', 0],
    ['Arroz con Pollo', 0],
    ['Bandeja Paisa', 0],
    ['Bandeja Paisa Tipica Antioquena', 0],
    ['Bistec a Caballo', 0],
    ['Bistec Criollo', 0],
    ['Bistec Encebollado', 0],
    ['Camarones a la Catalana', 0],
    ['Chuleta a la Parrilla', 0],
    ['Chuleta Valluna', 0],
    ['Churrasco', 0],
    ['Lomo de Res', 0],
    ['Pabellon', 0],
    ['Parillada Vegetariana', 0],
    ['Pechuga de Pollo', 0],
    ['Pechuga de Pollo Empanizada', 0],
    ['Pechuga Rellena', 0],
    ['Pescado en Cilantro y Mayonesa', 0],
    ['Pescado Frito', 0],
    ['Plato Vegetariano', 0],
    ['Pollo Empanizado Adultos', 0],
    ['Pollo Guisado', 0],
    ['Ropa Vieja', 0],
    ['Salmon En Limon Y Mantequilla', 0],
    ['Tamal Valluno', 0],
    ['Pollo Empanizado', 0],
    ['Pollo Guisado', 0],
    ['Carne Asada', 0],
    ['Pechuga de Pollo Kids', 0],
    ['Side Chicharron', 0],
    ['Side Chorizo', 0],
    ['Only Bistec Grande', 0],
    ['Only Camarones(6 Count)', 0],
    ['Only Carne Desmechada', 0],
    ['Only Chuleta-a-la-Parilla', 0],
    ['Only Chuleta', 0],
    ['Only Churrasco', 0],
    ['Only Pechuga de Pollo', 0],
    ['Only Pechuga de Pollo Empanizado', 0],
    ['Only Pescado Frito', 0],
    ['Only Pollo Guisado', 0],
    ['Only Salmon', 0],
    ['Only Tilapia', 0],
    ['Only Tamal', 0],
    ['Solo Lomo De Res', 0],
    ['Only Pechuga Rellena', 0],
    ["Chef's Special", 0],
    ['Lechon Asado', 0],
    ['Pechuga de Pollo de Champineones', 0],
    ['Surf and Turf', 0],
    ['Cazuela De Mariscos', 0],
    ['Sancocho De Gallina', 0],
    ['Sudado De Res', 0],
  ];
  name = 'loser';
  hasRun: boolean = false;
  csvFilePath: string = '';
  csvsub1: any;
  headers = [];
  header = true;
  uploadDate: string;
  csvnew: csv[] = [];
  csvnew$: Observable<csv[]>;
  entreeslist: any[] = [];
  csvnew2: any;
  csv$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  replaycsv$: ReplaySubject<any> = new ReplaySubject<any>();

  @ViewChild('fileImportInput', { static: false })
  fileImportInput: ElementRef;
  csv: any[] = [];
  csvcombined$: Observable<csv>;
  selectedTab: any = 'fileInput';

  subscriptions = new Subscription();
  constructor(
    private ngxCsvParser: NgxCsvParser,
    private extractService: ExtractService,
    private cd: ChangeDetectorRef
  ) {}

  k = ['Bistec A Caballo', 'Bandeja Paisa', 'Pabellon'];

  ngOnInit() {}
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  ngDoCheck() {
    this.cd.markForCheck();
  }

  //File input on change listener using ngxparser
  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    const uploadFile = [0];
    const inputNode: any = document.querySelector('#file');
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    //Parse csv and extract relevent Entrees from csv upload   **pipe1: map, catchError -> handleError  **pipe2: switchMap => extractionMethod(service)   **subsccribe
    const csvRecords = this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .pipe(
        map((result) => (result = result)),

        catchError(this.handleError('CsvFileParser.parse', 'Failed to parse Csv file'))
      )
      .pipe(switchMap((result) => of(this.extractService.extractionMethod(result))))
      .subscribe((results) =>
        results.forEach((csv: csv) => {
          for (let i = 0; i < this.entreeList.length; i++) {
            if (this.entreeList[i][0] === csv.entree) {
              console.log(this.entreeList[i][0]);
              this.entreeList[i][1] = Number(this.entreeList[i][1]) + Number(csv.sold);
            }
          }
        })
      );

    this.subscriptions.add(csvRecords);
    this.entreeslist = this.entreeList;
    this.cd.markForCheck();
    this.hasRun = true;
    console.log(this.entreeslist);
  }

  String(item: number) {
    return JSON.stringify(item);
  }
  //Errror Handling for File Input Upload
  private handleError<T>(options: string, results?: any) {
    return (error: any): Observable<T> => {
      console.log(error);

      return of(results as T);
    };
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    console.log(this.selectedTab);
  }
}
