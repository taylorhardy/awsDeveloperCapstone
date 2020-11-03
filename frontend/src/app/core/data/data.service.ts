import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { catchError, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	public constructor(private http: HttpClient, private errorService: ErrorService) { }

	private apiUrl: string = "https://t4pj9pn0p3.execute-api.us-east-2.amazonaws.com/dev";

	public getRecords(): Observable<any> {
		return this.http.get(`${this.apiUrl}/project`).pipe(
			catchError(this.errorService.httpHandleError)
		);
	};

	public addRecord(form): Observable<any> {
		return this.http.post(`${this.apiUrl}/project`, form).pipe(
			catchError(this.errorService.httpHandleError)
		);
	};

	public editRecord(form): Observable<any> {
		return this.http.post(`${this.apiUrl}/project/${form.projectId}`, form).pipe(
			catchError(this.errorService.httpHandleError)
		);
	};

	public deleteRecord(id: string): Observable<any> {
		return this.http.delete(`${this.apiUrl}/project/${id}`).pipe(
			catchError(this.errorService.httpHandleError)
		);
	};

	public getRecordByID(id: number): Observable<any> {
		return this.http.get(`${this.apiUrl}/project/${id}`).pipe(
			catchError(this.errorService.httpHandleError)
		);
	};

	public getStatuses(): Observable<any> {
		return this.http.get(`${this.apiUrl}/statuses`).pipe(
			catchError(this.errorService.httpHandleError)
		);
	};

	public getAssignees(): Observable<any> {
		return this.http.get(`${this.apiUrl}/assignee`).pipe(
			catchError(this.errorService.httpHandleError)
		);
	};

	public getUploadURL(id: string, fileType: string): Observable<any> {
		return this.http.post(`${this.apiUrl}/project/${id}/attachment`, {fileType: fileType}).pipe(
			catchError(this.errorService.httpHandleError)
		);
	};

	public uploadImage(url: string, file): Observable<any> {
		return this.http.put(`${url}`, file).pipe(
			catchError(this.errorService.httpHandleError)
		);
	};
};
