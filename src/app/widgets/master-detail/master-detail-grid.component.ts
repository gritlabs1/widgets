import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-master-detail-grid',
  standalone: true,
  templateUrl: './master-detail-grid.component.html',
  styleUrls: ['./master-detail-grid.component.css'],
  imports: [CommonModule, AgGridModule, MatCardModule, MatProgressSpinnerModule]
})
export class MasterDetailGridComponent implements OnInit {
  userColumnDefs: ColDef[] = [
    { field: 'name' },
    { field: 'username' },
    { field: 'email' },
    { headerName: 'Phone', field: 'phone' },
    {
      headerName: 'Company',
      valueGetter: (p) => p.data?.company?.name
    }
  ];

  postColumnDefs: ColDef[] = [
    { field: 'title', headerName: 'Title' },
    { field: 'body', headerName: 'Body' }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100
  };

  users: any[] = [];
  posts: any[] = [];
  selectedPost?: any;
  loadingUsers = false;
  loadingPosts = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loadingUsers = true;
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => {
          this.users = data;
          this.loadingUsers = false;
        },
        error: () => {
          this.loadingUsers = false;
        }
      });
  }

  onUserSelected(event: any) {
    if (event.node.selected) {
      const userId = event.data.id;
      this.loadPosts(userId);
    }
  }

  loadPosts(userId: number) {
    this.loadingPosts = true;
    this.posts = [];
    this.selectedPost = undefined;
    this.http
      .get<any[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .subscribe({
        next: (data) => {
          this.posts = data;
          this.loadingPosts = false;
        },
        error: () => {
          this.loadingPosts = false;
        }
      });
  }

  onPostSelected(event: any) {
    if (event.node.selected) {
      this.selectedPost = event.data;
    }
  }
}
