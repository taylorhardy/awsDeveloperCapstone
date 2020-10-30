import { NgModule } from '@angular/core';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		FooterComponent,
		HeaderComponent
	],
	exports: [
		FooterComponent,
		HeaderComponent
	]
})

export class LayoutModule {

}
