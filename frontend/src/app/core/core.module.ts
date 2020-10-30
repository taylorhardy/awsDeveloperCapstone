// This file CAN be modified.
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Title } from '@angular/platform-browser';

// This function ensures that the CoreModule is only imported once.
import { checkCoreModule } from './core-module-import.guard';
import { ToastrService } from './toastr/toastr.service';
import { UserService } from './user/user.service';

// Import ALL global services below.
@NgModule({

	// List the global services here.
	providers: [
		UserService,
		Title,
		ToastrService
	]
})

export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		checkCoreModule(parentModule, 'CoreModule');
	}
}
