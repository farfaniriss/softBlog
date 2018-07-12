import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from './post';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private dataSource = new BehaviorSubject(new Post(1, 'Lorem ipsum dolor sit amet', 
  'dfsdfsdf','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu tincidunt mi. Pellentesque nec nisi a sapien vestibulum maximus ac vel felis. Quisque luctus mauris lacus, eget posuere turpis convallis vitae. Pellentesque pretium sollicitudin lorem, eget posuere sapien condimentum sit amet. Vivamus nec nulla velit. Nulla id purus ut purus fermentum lobortis. Nam ac est a erat porttitor efficitur a a sapien. Donec congue eu augue sit amet mollis. Etiam convallis eros elit. Mauris iaculis, eros et pretium porttitor, eros lectus scelerisque tellus, in accumsan mauris ipsum ut purus. Cras at mattis ipsum. Suspendisse potenti. Pellentesque in semper turpis, ac interdum diam. Aliquam ultrices ultrices dolor non suscipit. Sed felis libero, aliquam in sagittis a, mollis in est. Fusce vel risus non neque sollicitudin sollicitudin in pulvinar nulla. Nulla ullamcorper mi purus, at pulvinar augue consectetur quis. Pellentesque lectus purus, consequat vitae auctor at, pellentesque ac leo. Nulla id ipsum a erat accumsan condimentum vel quis leo. Pellentesque lacus risus, finibus et erat at, gravida bibendum purus. Curabitur vel consequat urna. Donec rutrum enim ut libero tempor hendrerit. Proin ipsum purus, aliquet vel fringilla in, molestie quis arcu. Sed vehicula egestas neque, vitae condimentum velit mattis nec. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus  ', 
   'Fashion', '', '04 de Junio, 2018', 'Madrid, España', ''));
  post = this.dataSource.asObservable();

  batch = 1         // size of each query
  finished = false  // boolean when end of database is reached
  private _data = new BehaviorSubject([]);
  data: Observable<Post[]>;

  constructor(public db: AngularFirestore) { }

  updatePostSelection(post: Post){
    this.dataSource.next(post);
  }

  getPosts(batch, lastkey?): Observable<Post[]>{
    return this.db.collection<Post>('/posts', ref => ref.orderBy('id').limit(batch).startAt(lastkey)).valueChanges()
  }

  getPostsInit(){
    const first = this.db.collection<Post>('/posts', ref => {
      return ref
              .orderBy('id')
              .limit(this.batch+1)
    })

    this.mapAndUpdate(first)

    // Create the observable array for consumption in components
    this.data = this._data.asObservable()
        .scan( (acc, val) => { 
          return acc.concat(val)
        })
  }

  getMorePosts(){
    if (this.finished) return

    const cursor = this.getCursor()
    const more = this.db.collection<Post>('/posts', ref => {
      return ref
              .orderBy('id')
              .limit(this.batch+1)
              .startAfter(cursor)
    })

    this.mapAndUpdate(more)
  }

  
  // Determines the doc snapshot to paginate query 
  private getCursor() {
    const current = this._data.value
    if (current.length) {
      return current[current.length - 1].doc 
    }
    return null
  }

  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<any>) {
    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges()
      .do(arr => {
        let values = arr.map(snap => {
          const data = snap.payload.doc.data()
          const doc = snap.payload.doc
          return { ...data, doc }
        })

        // update source with new values, done loading
        this._data.next(values)       

        // no more values, mark done
        if (!values.length) {
          this.finished = true
        }
    })
    .take(1)
    .subscribe()
  }

  getRelatedPosts(category: string): Observable<Post[]>{
    return this.db.collection<Post>('/posts', ref => ref.where("category", "==", category).limit(3)).valueChanges()
  }
}
