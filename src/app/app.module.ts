import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule, JsonpModule} from '@angular/http';

import {AgmCoreModule} from '@agm/core';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: ''
        }),
        JsonpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
