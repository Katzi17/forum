import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { Forum } from '../../shared/models/Forum';
import { ForumService } from '../../shared/services/forum.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  constructor(
    private forumService: ForumService,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  dataSource = this.forumService.getComments();
  currentUser: User | null = null;
  comments: Array<any> = [];
  commentsForm = this.createFormForForumComment({
    username: '',
    comment: '',
    date: new Date(),
    id: '',
  });

  createFormForForumComment(model: Forum) {
    let formGroup = this.fb.group(model);
    formGroup
      .get('comment')
      ?.setValidators([Validators.required, Validators.minLength(10)]);
    return formGroup;
  }

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { message: message },
    });
  }

  deleteForumComment(comment: any) {
    console.log(this.currentUser?.isAdmin);
    if (
      this.currentUser?.isAdmin === true ||
      this.isCurrentUserCommentOwner(comment)
    ) {
      if (confirm('Biztosan törölni szeretnéd ezt a kommentet?')) {
        this.forumService
          .delete(comment.id)
          .then(() => {})
          .catch((error) => {
            this.openDialog('Hiba történt a komment törlése közben!');
          });
      }
    } else {
      this.openDialog('Nincs jogosultságod a komment törléséhez!');
    }
  }

  editForumComment(comment: any) {
    this.commentsForm.patchValue({
      username: comment.username,
      comment: comment.comment,
      date: comment.date,
      id: comment.id,
    });
  }

  saveChanges() {
    if (this.commentsForm.valid) {
      const formValue = this.commentsForm.value;
      const username = this.currentUser?.username;

      if (username) {
        formValue.date = new Date();
        formValue.username = username;

        this.forumService
          .update(formValue as Forum)
          .then(() => {
            this.commentsForm.reset({
              comment: '',
              date: new Date(),
              username: username,
            });
          })
          .catch((error) => {
            console.error('Hiba történt a komment frissítése közben:', error);
          });
      } else {
        console.error(
          'A felhasználó nincs bejelentkezve vagy nincs felhasználónév.'
        );
      }
    }
  }

  isCurrentUserCommentOwner(comment: any): boolean {
    if (this.currentUser?.isAdmin === true) {
      return true;
    }
    return comment.username === this.currentUser?.username;
  }

  ngOnInit() {
    this.forumService.getComments().subscribe((comments) => {
      this.comments = comments;
    });
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        this.userService.getUsernameById(userId).subscribe((username) => {
          this.userService.isAdmin(userId).then((isAdmin) => {
            this.currentUser = {
              id: userId,
              email: user.email || '',
              username: username,
              isAdmin: isAdmin,
            };
          });
        });
      } else {
        this.currentUser = null;
      }
    });
  }

  addForumComment() {
    if (this.commentsForm.valid) {
      const formValue = this.commentsForm.value;
      const username = this.currentUser?.username;

      if (username) {
        formValue.date = new Date();
        formValue.username = username;

        this.forumService
          .create(formValue as Forum)
          .then(() => {
            this.commentsForm.reset({
              comment: '',
              date: new Date(),
              username: username,
            });
          })
          .catch((error) => {
            console.error('Hiba történt a komment létrehozása közben:', error);
          });
      } else {
        console.error(
          'A felhasználó nincs bejelentkezve vagy nincs felhasználónév.'
        );
      }
    }
  }
}
