import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material';
import {MemberService} from '../services/member.service';


export const initPageSize = '10';
export const initPageIndex = '0';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  constructor(private memberService: MemberService) {
  }

  displayedColumns: string[] = ['firstName', 'lastName', 'state', 'city', 'edit', 'delete'];
  options = [
    {value: 'firstName', viewValue: 'First Name'},
    {value: 'lastName', viewValue: 'Last Name'},
    {value: 'state', viewValue: 'State'},
    {value: 'city', viewValue: 'City'}
  ];
  dataSource;
  totalElements;
  selectedOption = this.options[0].value;
  selectedOptionValue;
  filterValue;
  selectedFilterValue;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.initData();
  }

  onDelete(id) {
    this.memberService.deleteMember(id).subscribe(data => {
      console.log(data);
      this.initData();
    }, err => {
      console.log(err.message);
    });
  }

  applyFilter(searchValue: string) {
    this.selectedFilterValue = searchValue;
    this.selectedOptionValue = this.selectedOption;
    this.memberService.getMembers('0', this.paginator.pageSize.toString(), this.selectedOption, this.selectedFilterValue).subscribe( data => {
      if (!data) {
        this.dataSource.data = [];
        this.totalElements = 0;
        this.paginator.pageIndex = 0;
      } else {
        this.dataSource.data = data.content;
        this.totalElements = data.totalElements;
        this.paginator.pageIndex = 0;
      }
    }, error => {
      console.log(error.message);
      console.log(error.status);
    });
  }

  onPageChange() {
    this.memberService.getMembers(this.paginator.pageIndex.toString(), this.paginator.pageSize.toString(), this.selectedOptionValue, this.selectedFilterValue).subscribe(data => {
      this.setData(data);
    }, error => {
      console.log(error.message);
      console.log(error.status);
    });
  }

  setData(data) {
    if (!data) {
      console.log('Data not found on requested page');
    } else {
      this.dataSource.data = data.content;
      this.totalElements = data.totalElements;
    }
  }

  initData() {
    this.memberService.getMembers(initPageIndex, initPageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;

      this.totalElements = data.totalElements;
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = 10;
      this.filterValue = '';
      this.selectedFilterValue = '';
      this.selectedOptionValue = this.selectedOption;
    }, error => {
      console.log(error.message);
      console.log(error.status);
    });
  }


}
