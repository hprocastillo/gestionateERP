import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Answer, Category, Checklist, Question, Verification} from "../interfaces/checklist";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  //Collections
  checklistsCollection: AngularFirestoreCollection<Checklist>;
  categoriesCollection: AngularFirestoreCollection<Category>;
  questionsCollection: AngularFirestoreCollection<Question>;
  answersCollection: AngularFirestoreCollection<Answer>;
  verificationsCollection: AngularFirestoreCollection<Verification>;


  constructor(private readonly afs: AngularFirestore) {
    this.checklistsCollection = afs.collection<Checklist>('checklists', ref => ref
      .orderBy('createdAt', 'desc'));
    this.categoriesCollection = afs.collection<Category>('categories', ref => ref
      .orderBy('createdAt', 'desc'));
    this.questionsCollection = afs.collection<Question>('questions', ref => ref
      .orderBy('createdAt', 'desc'));
    this.answersCollection = afs.collection<Answer>('answers', ref => ref
      .orderBy('createdAt', 'desc'));
    this.verificationsCollection = afs.collection<Verification>('verifications', ref => ref
      .orderBy('createdAt', 'desc'));
  }

  //CHECKLIST SERVICE//
  getChecklists(companyId: string) {
    return this.afs.collection<Checklist>('checklists', ref => ref
      .where('companyId', '==', companyId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Checklist;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getChecklistsActiveAndPublish(companyId: string) {
    return this.afs.collection<Checklist>('checklists', ref => ref
      .where('companyId', '==', companyId)
      .where('active', '==', true)
      .where('publish', '==', true)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Checklist;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getChecklistsActive(companyId: string) {
    return this.afs.collection<Checklist>('checklists', ref => ref
      .where('companyId', '==', companyId)
      .where('active', '==', true)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Checklist;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getChecklistById(id: string) {
    return this.afs.collection<Checklist>('checklists').doc(id).valueChanges();
  }

  saveChecklist(checklist: Checklist, checklistId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = checklistId || this.afs.createId();
        const data = {id, ...checklist};
        const result = await this.checklistsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  updateChecklist(checklist: Checklist, checklistId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = checklistId;
        const data = {id, ...checklist};
        const result = await this.checklistsCollection.doc(id).update(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  deleteChecklist(id: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.checklistsCollection.doc(id).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }


  //CATEGORY SERVICE//
  getCategories(companyId: string) {
    return this.afs.collection<Category>('categories', ref => ref
      .where('companyId', '==', companyId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getCategoryById(id: string) {
    return this.afs.collection<Category>('categories').doc(id).valueChanges();
  }

  saveCategory(category: Category, categoryId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = categoryId || this.afs.createId();
        const data = {id, ...category};
        const result = await this.categoriesCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  updateCategory(category: Category, categoryId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = categoryId;
        const data = {id, ...category};
        const result = await this.categoriesCollection.doc(id).update(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  deleteCategory(id: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.categoriesCollection.doc(id).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  //QUESTION SERVICE
  getQuestions(companyId: string) {
    return this.afs.collection<Question>('questions', ref => ref
      .where('companyId', '==', companyId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Question;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getQuestionsByChecklist(companyId: string, checklistId: string) {
    return this.afs.collection<Question>('questions', ref => ref
      .where('companyId', '==', companyId)
      .where('checklistId', '==', checklistId)
      .orderBy('categoryId', 'asc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Question;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getQuestionById(id: string) {
    return this.afs.collection<Question>('questions').doc(id).valueChanges();
  }

  saveQuestion(question: Question, questionId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = questionId || this.afs.createId();
        const data = {id, ...question};
        const result = await this.questionsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  updateQuestion(question: Question, questionId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = questionId;
        const data = {id, ...question};
        const result = await this.questionsCollection.doc(id).update(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  deleteQuestion(id: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.questionsCollection.doc(id).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  //ANSWER SERVICE//
  getAnswers(companyId: string, employeeId: string, checklistId: string, categoryId: string, questionId: string) {
    return this.afs.collection<Answer>('answers', ref => ref
      .where('employeeId', '==', employeeId)
      .where('companyId', '==', companyId)
      .where('checklistId', '==', checklistId)
      .where('categoryId', '==', categoryId)
      .where('questionId', '==', questionId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Answer;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getAnswerById(id: string) {
    return this.afs.collection<Answer>('Answers').doc(id).valueChanges();
  }

  saveAnswer(answer: Answer, answerId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = answerId || this.afs.createId();
        const data = {id, ...answer};
        const result = await this.answersCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  updateAnswer(answer: Answer, answerId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = answerId;
        const data = {id, ...answer};
        const result = await this.answersCollection.doc(id).update(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  deleteAnswer(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.answersCollection.doc(id).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  //VERIFICATION SERVICE//
  getVerifications(companyId: string) {
    return this.afs.collection<Verification>('verifications', ref => ref
      .where('companyId', '==', companyId)
      .where('active', '==', true)
      .where('finished', '==', true)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Verification;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getVerificationById(verificationId: string) {
    return this.afs.collection<Verification>('verifications').doc(verificationId).valueChanges();
  }
}
