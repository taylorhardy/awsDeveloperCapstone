import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/core/data/data.service';
import { AuthService } from '@auth0/auth0-angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ToastrService } from 'src/app/core/toastr/toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService, public auth: AuthService, private toastrService: ToastrService) { }

  public records: Observable<{}[]>;
  public deleteSubscription: Subscription;

  public ngOnInit(): void {
    this.records = this.dataService.getRecords();
  };

  public delete(id: string): void {
    this.deleteSubscription = this.dataService.deleteRecord(id).subscribe(data => {
      this.toastrService.success("Project Deleted!");
      this.records = this.dataService.getRecords();
    }, error => {
      this.toastrService.error(error);
      console.error(error);
    });
  };
}
