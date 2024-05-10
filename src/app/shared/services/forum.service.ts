import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Forum } from '../models/Forum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  collectionName = 'Forum';

  constructor(private afs: AngularFirestore) {}

  getComments(): Observable<Forum[]> {
    return this.afs
      .collection<Forum>('Forum', (ref) => ref.orderBy('date', 'desc'))
      .valueChanges();
  }

  create(comment: Forum) {
    comment.id = this.afs.createId();
    return this.afs
      .collection<Forum>(this.collectionName)
      .doc(comment.id)
      .set(comment);
  }

  getAll() {
    return this.afs.collection<Forum>(this.collectionName).valueChanges();
  }

  update(comment: Forum) {
    return this.afs
      .collection<Forum>(this.collectionName)
      .doc(comment.id)
      .set(comment);
  }

  delete(id: string) {
    return this.afs.collection<Forum>(this.collectionName).doc(id).delete();
  }
}
