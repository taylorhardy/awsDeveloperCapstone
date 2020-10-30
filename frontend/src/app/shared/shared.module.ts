/* This file CAN be modified.
Import modules, components, directives, and pipes used by other modules below. */
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({

	// Declare directives, pipes, and components here.
	declarations: [],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	// Export ALL modules, components, directives, and pipes here.
	exports: [
		FormsModule,
		ReactiveFormsModule,
		RouterModule
	],
	providers: [],
	entryComponents: []
})
export class SharedModule {

}
