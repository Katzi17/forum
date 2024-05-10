import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../../shared/services/comment.service';
import { QuestionService } from '../../shared/services/question.service';
import { UserService } from '../../shared/services/user.service';
import { Comment } from '../../shared/models/Comment';
import { Observable } from 'rxjs';
import { Questions } from '../../shared/models/Questions';
import { User } from '../../shared/models/User';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  constructor(
    private router: Router,
    private questionService: QuestionService,
    private commentService: CommentService,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private dialog: MatDialog
  ) {}
  questionObject: any = {};
  questions?: Observable<Questions[]>;
  currentUser: User | null = null;
  comments: Array<any> = [];
  commentsForm = this.createFormForComment({
    username: '',
    comment: '',
    date: new Date(),
    questionId: '',
    id: '',
  });

  createFormForComment(model: Comment) {
    let formGroup = this.fb.group(model);
    formGroup
      .get('comment')
      ?.setValidators([Validators.required, Validators.minLength(10)]);
    return formGroup;
  }

  questionForm = this.createFormForQuestions({
    username: '',
    date: new Date(),
    question: '',
    questionId: '',
    comments: [],
  });

  createFormForQuestions(questionModel: Questions) {
    let formGroup = this.fb.group(questionModel);
    formGroup
      .get('question')
      ?.setValidators([Validators.required, Validators.minLength(10)]);
    return formGroup;
  }

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { message: message },
    });
  }

  loadQuestions(): void {
    const chosenQuestionSelect = document.getElementById(
      'chosenQuestion'
    ) as HTMLSelectElement | null;
    if (chosenQuestionSelect) {
      this.afs
        .collection<Questions>('Questions')
        .valueChanges()
        .subscribe((questions) => {
          console.log(questions);
          questions.forEach((question) => {
            const optionElement = document.createElement('option');
            optionElement.value = question.question;
            optionElement.textContent = question.question;
            chosenQuestionSelect.appendChild(optionElement);
          });
        });
    } else {
      console.error(
        "Az 'chosenQuestion' id-val rendelkező elem nem található."
      );
    }
  }

  deleteComment(comment: any) {
    console.log(this.currentUser?.isAdmin);
    if (
      this.currentUser?.isAdmin === true ||
      this.isCurrentUserCommentOwner(comment)
    ) {
      if (confirm('Biztosan törölni szeretnéd ezt a kommentet?')) {
        this.commentService
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

  editComment(comment: any) {
    this.commentsForm.patchValue({
      username: comment.username,
      comment: comment.comment,
      date: comment.date,
      questionId: comment.questionId,
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

        this.commentService
          .update(formValue as Comment)
          .then(() => {
            this.commentsForm.reset({
              comment: '',
              date: new Date(),
              questionId: this.questionObject.questionId,
              username: username,
            });
            this.router.navigateByUrl('/congratulation');
          })
          .catch((error) => {
            this.openDialog('Hiba történt a komment frissítése közben!');
          });
      }
    } else {
      this.openDialog('A komment legalább 10 karakter hosszúnak kell lennie!');
    }
  }

  isCurrentUserQuestionOwner(): boolean {
    if (this.currentUser?.isAdmin === true) {
      return true;
    }
    return this.questionObject.username === this.currentUser?.username;
  }

  isCurrentUserCommentOwner(comment: any): boolean {
    if (this.currentUser?.isAdmin === true) {
      return true;
    }
    return comment.username === this.currentUser?.username;
  }

  displaySelectedQuestion(): void {
    const chosenQuestionSelect = document.getElementById(
      'chosenQuestion'
    ) as HTMLSelectElement | null;
    if (chosenQuestionSelect && chosenQuestionSelect.value) {
      const selectedQuestion = chosenQuestionSelect.value;
      this.afs
        .collection<Questions>('Questions', (ref) =>
          ref.where('question', '==', selectedQuestion)
        )
        .valueChanges()
        .subscribe((questions) => {
          if (questions.length > 0) {
            const selectedQuestionData = questions[0];
            this.questionObject.question = selectedQuestionData.question;
            this.questionObject.username = selectedQuestionData.username;
            this.questionObject.questionId = selectedQuestionData.questionId;
            this.questionObject.date = selectedQuestionData.date;
            this.questionObject.comments = selectedQuestionData.comments;

            if (selectedQuestionData.questionId) {
              this.afs
                .collection<Comment>('Comments', (ref) =>
                  ref.where('questionId', '==', selectedQuestionData.questionId)
                )
                .valueChanges()
                .subscribe((comments) => {
                  this.questionObject.comments = comments;
                });
            }
          } else {
            console.error('A kiválasztott kérdés adatai nem találhatók.');
          }
        });
    } else {
      this.openDialog('Kérlek válassz ki egy kérdést!');
    }
  }

  deleteQuestion() {
    if (this.isCurrentUserQuestionOwner() || this.currentUser?.isAdmin) {
      if (confirm('Biztosan törölni szeretnéd ezt a kérdést?')) {
        this.questionService
          .delete(this.questionObject.questionId)
          .then(() => {
            this.router.navigateByUrl('/congratulation');
          })
          .catch((error) => {
            this.openDialog('Hiba történt a kérdés törlése közben!');
          });
      }
    } else {
      this.openDialog('Nincs jogosultságod a kérdés törléséhez!');
    }
  }

  saveQuestionChanges() {
    if (this.questionForm.valid) {
      const formValue = this.questionForm.value;
      const username = this.currentUser?.username;

      if (username) {
        formValue.date = new Date();
        formValue.username = username;

        this.questionService
          .update(formValue as unknown as Questions)
          .then(() => {
            this.questionForm.reset({
              question: '',
              date: new Date(),
              username: username,
              comments: null,
            });
            this.router.navigateByUrl('/congratulation');
          })
          .catch((error) => {
            this.openDialog('Hiba történt a kérdés frissítése közben!');
          });
      }
    } else {
      this.openDialog('A kérdés legalább 10 karakter hosszúnak kell lennie!');
    }
  }

  editQuestion() {
    this.questionForm.patchValue({
      username: this.questionObject.username,
      question: this.questionObject.question,
      date: this.questionObject.date,
      questionId: this.questionObject.questionId,
    });
  }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        this.userService.getUsernameById(userId).subscribe((username) => {
          this.userService
            .isAdmin(userId)
            .then((isAdmin) => {
              this.currentUser = {
                id: userId,
                email: user.email || '',
                username: username,
                isAdmin: isAdmin,
              };
              this.questionForm.patchValue({ username: username });
            })
            .catch((error) => {
              console.error(
                'Hiba történt az adminisztrátori státusz lekérdezése során:',
                error
              );
            });
        });
      } else {
        this.currentUser = null;
      }
    });
    this.loadQuestions();
  }

  addComment() {
    if (this.commentsForm.valid) {
      const formValue = this.commentsForm.value;
      const username = this.currentUser?.username;

      if (username) {
        if (
          formValue.comment !== null &&
          formValue.comment !== undefined &&
          formValue.comment.length < 10
        ) {
          this.openDialog(
            'A komment legalább 10 karakter hosszúnak kell lennie!'
          );
        } else if (!this.questionObject.questionId) {
          this.openDialog('Kérlek válassz ki egy kérdést!');
        } else {
          formValue.date = new Date();
          formValue.questionId = this.questionObject.questionId;
          formValue.username = username;
          this.commentService
            .create(formValue as Comment)
            .then(() => {
              this.commentsForm.reset({
                comment: '',
                date: new Date(),
                questionId: this.questionObject.questionId,
                username: username,
              });
              this.openDialog('Siker!');
            })
            .catch((error) => {
              this.openDialog('Hiba történt a komment létrehozása közben!');
            });
        }
      }
    } else {
      this.openDialog('A komment legalább 10 karakter hosszúnak kell lennie!');
    }
  }

  addQuestion() {
    if (this.questionForm.valid) {
      const formValue = this.questionForm.value;
      const username = this.currentUser?.username;

      if (username) {
        formValue.date = new Date();
        formValue.username = username;

        this.questionService
          .create(formValue as unknown as Questions)
          .then(() => {
            this.questionForm.reset({
              question: '',
              date: new Date(),
              username: username,
              comments: null,
            });
            this.router.navigateByUrl('/congratulation');
          })
          .catch((error) => {
            this.openDialog('Hiba történt a kérdés létrehozása közben!');
          });
      }
    } else {
      this.openDialog('A kérdés legalább 10 karakter hosszúnak kell lennie!');
    }
  }
}
