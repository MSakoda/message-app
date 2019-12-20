import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostsComponent } from './components/posts/posts.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { PostComponent } from './components/posts/post/post.component';
import { AddMessageComponent } from './components/messages/add-message/add-message.component';
import { MessageListComponent } from './components/messages/message-list/message-list.component';
import { MessageComponent } from './components/messages/message/message.component';
import { CommentListComponent } from './components/comments/comment-list/comment-list.component';
import { AddCommentComponent } from './components/comments/add-comment/add-comment.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { LandingComponent } from './components/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CreateUserComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    PostsComponent,
    NewPostComponent,
    PostComponent,
    AddMessageComponent,
    MessageListComponent,
    MessageComponent,
    CommentListComponent,
    AddCommentComponent,
    CommentComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
