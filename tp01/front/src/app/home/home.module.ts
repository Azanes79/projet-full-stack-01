import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../_shared/material/material.module';
import { PostsComponent } from './posts/posts.component';
import { FormsModule } from '@angular/forms';
import { PostDetailComponent } from './post-detail/post-detail.component';


@NgModule({
  declarations: [HomeComponent, PostsComponent, PostDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
