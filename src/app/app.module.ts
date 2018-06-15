import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from "@angular/flex-layout";
import { TagsComponent } from './tags/tags.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { ScrollingModule } from '@angular/cdk-experimental';
import { PostDetailComponent } from './post-detail/post-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    NavbarComponent,
    TagsComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    FlexLayoutModule,
    ScrollingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
