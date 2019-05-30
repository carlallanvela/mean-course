import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredValue = '';
  newPost = 'NO CONTENT';
  // newPost2 = '';
  // newPost3 = '';

  onAddPost() {
    this.newPost = this.enteredValue;
  }

  // onAddPost2() {
  //   this.newPost2 = 'THIS IS A NEW POST 2';
  // }

  // onAddPost3(postInput : HTMLTextAreaElement) {
  //   this.newPost3 = postInput.value;
  // }
}
