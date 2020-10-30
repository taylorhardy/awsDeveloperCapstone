import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/core/data/data.service';
import { ToastrService } from 'src/app/core/toastr/toastr.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private dataService: DataService, private toastrService: ToastrService) { }

  public form: FormGroup;
  public statuses: Observable<{}[]>;
  public assignees: Observable<{}[]>;
  public statusSubscription: Subscription;
  public assigneeSubscription: Subscription;
  public submitSubscription: Subscription;

  public ngOnInit(): void {
    this.statuses= this.dataService.getStatuses();
    this.assignees = this.dataService.getAssignees();

    this.form = this.fb.group({
      projectName: [''],
      assignedTo: [''],
      statusName: [''],
      startDate: [''],
      endDate: [''],
      notes: ['']
    });
  };

  public submit(): void {
    this.submitSubscription = this.dataService.addRecord(this.form.value).subscribe(data => {
      this.toastrService.success("New Project Entered!")
    }, error => {
      this.toastrService.error(error);
      console.error(error);
    });
  };

  public ngOnDestroy(): void {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
  };
}
