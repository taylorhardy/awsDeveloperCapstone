import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  public file: File;
  public form: FormGroup;
  public submitSubscription: Subscription;
  public routeSubscription: Subscription;
  public dataSubscription: Subscription;

  public statuses: Observable<{}[]>;
  public assignees: Observable<{}[]>;

  public projectId: string;
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
      imageUrl: [''],
      notes: ['']
    });

    this.populateForm();
  };

  public populateForm(): void {
    this.routeSubscription = this.route.params.subscribe(param => {
      this.projectId = param.id;
      this.dataSubscription = this.dataService.getRecordByID(param.id).subscribe(data => {
        this.form.patchValue({
          projectId: data.item[0].projectId,
          projectName: data.item[0].projectName,
          assignedTo: data.item[0].assignedTo,
          statusName: data.item[0].statusName,
          startDate: data.item[0].startDate,
          endDate: data.item[0].endDate,
          imageUrl: data.item[0].imageUrl,
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

  public uploadFileChange(event): void {
    console.log(event.srcElement.files);
    const file = event.srcElement.files;
    this.file = file[0]
    var formData = new FormData();
    let extensionArray = file[0].name.split('.');
    let fileType = extensionArray[extensionArray.length - 1];

    formData.append("file", this.file)
    this.dataService.getUploadURL(this.projectId, fileType).subscribe(data => {
      console.log(data.uploadUrl);
      this.dataService.uploadImage(data.uploadUrl, this.file).subscribe(upload => {
        this.toastrService.success("File Uploaded!");
        this.form.patchValue({
          imageUrl: data.uploadUrl.split('?')[0]
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
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
  };

}
