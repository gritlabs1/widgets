import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-ag-grid-crypto-demo',
  standalone: true,
  templateUrl: './ag-grid-crypto-demo.component.html',
  styleUrls: ['./ag-grid-crypto-demo.component.css'],
  imports: [
    CommonModule,
    AgGridModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class AgGridCryptoDemoComponent implements OnInit {
  columnDefs: ColDef[] = [
    {
      headerName: '',
      field: 'image',
      width: 40,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) =>
        `<img src="${params.value}" alt="${params.data.name} icon" width="20" height="20">`,
    },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Symbol', field: 'symbol', filter: 'agSetColumnFilter' },
    {
      headerName: 'Current Price',
      field: 'current_price',
      type: 'numericColumn',
      valueFormatter: this.currencyFormatter,
    },
    {
      headerName: 'Market Cap',
      field: 'market_cap',
      type: 'numericColumn',
      valueFormatter: this.currencyFormatter,
    },
    {
      headerName: 'Rank',
      field: 'market_cap_rank',
      type: 'numericColumn',
    },
    {
      headerName: 'Total Volume',
      field: 'total_volume',
      type: 'numericColumn',
      valueFormatter: this.currencyFormatter,
    },
    {
      headerName: '24h %',
      field: 'price_change_percentage_24h',
      type: 'numericColumn',
      valueFormatter: (p) => (p.value ? p.value.toFixed(2) + '%' : ''),
      tooltipField: 'price_change_percentage_24h',
    },
    {
      headerName: 'High 24h',
      field: 'high_24h',
      type: 'numericColumn',
      valueFormatter: this.currencyFormatter,
    },
    {
      headerName: 'Low 24h',
      field: 'low_24h',
      type: 'numericColumn',
      valueFormatter: this.currencyFormatter,
    },
    {
      headerName: 'Circulating Supply',
      field: 'circulating_supply',
      type: 'numericColumn',
    },
    { headerName: 'Rank Range', field: 'rankRange', rowGroup: true, hide: true },
    { headerName: 'Notes', field: 'notes', editable: true },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
  };

  rowData: any[] = [];
  loading = false;
  error?: string;
  private gridApi?: GridApi;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  reload() {
    this.loadData();
  }

  exportCsv() {
    this.gridApi?.exportDataAsCsv();
  }

  private loadData() {
    this.loading = true;
    this.error = undefined;
    this.http
      .get<any[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
      )
      .subscribe({
        next: (data) => {
          this.rowData = data.map((d) => ({
            ...d,
            rankRange: this.rankRange(d.market_cap_rank),
            notes: '',
          }));
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to load data';
          this.loading = false;
        },
      });
  }

  private rankRange(rank: number): string {
    if (rank <= 10) {
      return 'Top 10';
    }
    if (rank <= 50) {
      return '11-50';
    }
    if (rank <= 100) {
      return '51-100';
    }
    return '100+';
  }

  private currencyFormatter(p: any) {
    return p.value
      ? Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(p.value)
      : '';
  }
}
