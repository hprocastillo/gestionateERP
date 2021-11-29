import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Request} from "../interfaces/request";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  requestsCollection: AngularFirestoreCollection<Request>;

  constructor(private readonly afs: AngularFirestore) {
    this.requestsCollection = afs.collection<Request>('requests', ref => ref.orderBy('createdAt', 'desc'));
  }

  getRequestById(id: string) {
    return this.afs.collection<Request>('requests').doc(id).valueChanges();
  }

  getRequestsByJoin(companyId: string) {
    return this.afs.collection<Request>('requests', ref => ref
      .where('companyId', '==', companyId)
      .where('requestType', '==', 'JOIN')
      .where('active', '==', true)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Request;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getRequestsHistoricalJoin(companyId: string) {
    return this.afs.collection<Request>('requests', ref => ref
      .where('companyId', '==', companyId)
      .where('requestType', '==', 'JOIN')
      .where('active', '==', false)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Request;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getRequestsByEmail(email: string) {
    return this.afs.collection<Request>('requests', ref => ref.where('userEmail', '==', email))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Request;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getRequestsByUserId(userId: string) {
    return this.afs.collection<Request>('requests', ref => ref.where('createdBy', '==', userId))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Request;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }


  saveRequest(request: Request, requestId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = requestId || this.afs.createId();
        const data = {id, ...request};
        const result = await this.requestsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  updateRequest(request: Request, requestId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = requestId;
        const data = {id, ...request};
        const result = await this.requestsCollection.doc(id).update(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  deleteRequest(requestId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.requestsCollection.doc(requestId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
