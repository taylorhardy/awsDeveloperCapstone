import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/data/data.service';
import { AuthService } from '@auth0/auth0-angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService, public auth: AuthService) { }

  public records: Observable<{}[]>;

  public ngOnInit(): void {
    this.records = this.dataService.getRecords();
  };

}
