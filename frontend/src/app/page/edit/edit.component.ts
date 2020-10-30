import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/core/data/data.service';
import { ToastrService } from 'src/app/core/toastr/toastr.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private dataService: DataService, private route: ActivatedRoute, private toastrService: ToastrService) { }

  public form: FormGroup;
  public submitSubscription: Subscription;
  public routeSubscription: Subscription;
  public dataSubscription: Subscription;

  public statuses: Observable<{}[]>;
  public assignees: Observable<{}[]>;

  public ngOnInit(): void {
    this.statuses = this.dataService.getStatuses();
    this.assignees = this.dataService.getAssignees();

    this.form = this.fb.group({
      projectId: [''],
      projectName: [''],
      assignedTo: [''],
      statusName: [''],
      startDate: [''],
      endDate: [''],
      notes: ['']
    });

    this.populateForm();
  };

  public populateForm(): void {
    this.routeSubscription = this.route.params.subscribe(param => {
      this.dataSubscription = this.dataService.getRecordByID(param.id).subscribe(data =>{
        this.form.patchValue({
          projectId: data.item[0].projectId,
          projectName: data.item[0].projectName,
          assignedTo: data.item[0].assignedTo,
          statusName: data.item[0].statusName,
          startDate: data.item[0].startDate,
          endDate: data.item[0].endDate,
          notes: data.item[0].notes
        });
      }, error => {
        this.toastrService.error(error);
        console.error(error);
      });
    }, error => {
      this.toastrService.error(error);
      console.error(error);
    });
  };

  public submit(): void {
    this.submitSubscription = this.dataService.editRecord(this.form.value).subscribe(data => {
      this.toastrService.success("Project Edited!")
    }, error => {
      this.toastrService.error(error);
      console.error(error);
    });
  };

  public ngOnDestroy(): void {
    if(this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if(this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if(this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
  };

}
