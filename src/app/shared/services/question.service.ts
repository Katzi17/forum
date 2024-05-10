import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Questions } from '../models/Questions';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  collectionName = 'Questions';

  constructor(private afs: AngularFirestore) {}

  getQuestions(): Observable<Questions[]> {
    return this.afs.collection<Questions>(this.collectionName).valueChanges();
  }

  create(question: Questions) {
    question.questionId = this.afs.createId();
    return this.afs
      .collection<Questions>(this.collectionName)
      .doc(question.questionId)
      .set(question);
  }

  getAll() {
    return this.afs.collection<Questions>(this.collectionName).valueChanges();
  }

  update(question: Questions) {
    return this.afs
      .collection<Questions>(this.collectionName)
      .doc(question.questionId)
      .set(question);
  }

  delete(questionId: string) {
    return this.afs
      .collection<Questions>(this.collectionName)
      .doc(questionId)
      .delete();
  }
}
