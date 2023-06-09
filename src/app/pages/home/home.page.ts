import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SignupPage } from '../signup/signup.page';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NumberInput } from '@angular/cdk/coercion';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {
  activeUser = JSON.parse(localStorage.getItem('activeUser') || '{}');
  users = JSON.parse(localStorage.getItem('users') || '[]');
  selectedUser: number | undefined;
  public columns: any;
  columnsToDisplay = ['id', 'name', 'email', 'password'];
  public dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null =
    null;
  pageSize: NumberInput;
  pageIndex: NumberInput;

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) {
    this.columns = ['id', 'name', 'email', 'password'];
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit() {
    this.activeUser =
      this.route.getCurrentNavigation()?.extras.state?.['activeUser'] ??
      JSON.parse(localStorage.getItem('activeUser') || '{}');
    const usersFromStorage = localStorage.getItem('users');
    this.users = JSON.parse(usersFromStorage!);
    this.dataSource.data = this.users;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.onPageChanged({
      pageIndex: 0,
      pageSize: 5,
      length: this.users.length,
    });
  }

  logout() {
    localStorage.removeItem('activeUser');
    localStorage.removeItem('selectedUser');
    this.route.navigate(['/login']);
  }

  setselectedUser(userId: number) {
    const selectedUser = this.users.find(
      (user: { id: number }) => user.id === userId
    );
    localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    this.route.navigate(['/userdetail'], {
      state: { userId: userId as number },
    });
  }

  async addUser() {
    const modal = await this.modalController.create({
      component: SignupPage,
      componentProps: { isFromHomePage: true },
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  imdb() {
    this.route.navigate(['/imdb']);
  }

  onPageChanged(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource = new MatTableDataSource(
      this.users.slice(startIndex, endIndex)
    );
  }
}
