/* This file should NOT be modified.
Use ./core/core.module.ts to provide singleton services.
Use ./shared/shared.module.ts to declare and export directives, pipes, modules, and components used by other components.
Otherwise, use a feature module's component.ts file to apply specific presentation and logic for that feature. */
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        HttpClientModule,
        FormsModule,
        LayoutModule,
        AppRoutingModule,
        SharedModule,
        BrowserAnimationsModule,
        AuthModule.forRoot({
            domain: 'dev-9mygfkuu.us.auth0.com',
            clientId: 'j1mD1dkve4u5w5PHu2UKO9tqYSq0DtWl',
            // Request this audience at user authentication time
            audience: 'https://dev-9mygfkuu.us.auth0.com/api/v2/',

            // Request this scope at user authentication time
            scope: 'read:current_user',
            // The AuthHttpInterceptor configuration
            httpInterceptor: {
                allowedList: [
                    {
                        uri: 'https://t4pj9pn0p3.execute-api.us-east-2.amazonaws.com/dev/*',
                    },
                ]
            }
        }),
    ],
    declarations: [
        AppComponent
    ],
    providers: [CoreModule, { provide: APP_BASE_HREF, useValue: '/' }, { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {

}
