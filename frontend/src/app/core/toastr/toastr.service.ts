/*
	Wrapper class for Toastr
*/
import { Injectable } from "@angular/core";

declare let toastr: any;  // keep typescript from complaining about gloabaly declared object

@Injectable()
export class ToastrService {

	/*
		Success Toast
	*/
	public success(msg: string, title?: string): void {
		toastr.options = { "positionClass": "toast-top-right"};  // , timeOut: 20000
		toastr.success(msg, title);
	}

	/*
		Info Toast
	*/
	public info(msg: string, title?: string): void {
		toastr.options = { "positionClass": "toast-top-center" };
		toastr.info(msg, title);
	}

	/*
		Warning Toast
	*/
	public warning(msg: string, title?: string): void {
		toastr.options = { "positionClass": "toast-top-center" };
		toastr.warning(msg, title);
	};

	/*
		Error Toast
	*/
	public error(msg: string, title?: string): void {
		toastr.options = { "positionClass": "toast-top-center" };
		toastr.error(msg, title, {"timeOut": "3000", "closeButton": true});	// override normal time out to 20 seconds
	};
}
