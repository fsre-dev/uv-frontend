import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatSort} from '@angular/material';
import {initPageIndex, initPageSize} from '../member/member.component';
import {MemberService} from '../services/member.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  constructor(private memberService: MemberService) {
  }

  displayedColumns: string[] = ['member', 'sector', 'row', 'seat', 'opponent', 'gameDate', 'reservationDate', 'price', 'edit', 'delete'];
  dataSource;
  totalElements;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.initData();
  }

  onDelete(id) {
    this.memberService.deleteTicket(id).subscribe(data => {
      console.log(data);
      this.initData();
    }, err => {
      console.log(err.message);
    });
  }

  onPageChange() {
    this.memberService.getTickets(this.paginator.pageIndex.toString(), this.paginator.pageSize.toString()).subscribe(data => {
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
    this.memberService.getTickets(initPageIndex, initPageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;

      this.totalElements = data.totalElements;
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = 10;
    }, error => {
      console.log(error.message);
      console.log(error.status);
    });
  }

}
