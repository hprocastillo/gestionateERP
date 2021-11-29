import {Injectable} from '@angular/core';
import {Company, CompanyType} from "../interfaces/company";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companiesCollection: AngularFirestoreCollection<Company>;
  companiesTypesCollection: AngularFirestoreCollection<CompanyType>;

  constructor(private readonly afs: AngularFirestore) {
    this.companiesCollection = afs.collection<Company>('companies', ref => ref.orderBy('name', 'asc'));
    this.companiesTypesCollection = afs.collection<CompanyType>('companiesTypes', ref => ref.orderBy('description', 'asc'));
  }

  //COMPANY SERVICE
  getCompanyByUserId(userId: string) {
    return this.afs.collection<Company>('companies', ref => ref
      .where('createdBy', '==', userId)
      .orderBy('name', 'asc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Company;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  saveCompany(company: Company, companyId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = companyId || this.afs.createId();
        const data = {id, ...company};
        const result = await this.companiesCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  //COMPANIES TYPES SERVICE
  getCompaniesTypes() {
    return this.afs.collection<CompanyType>('companiesTypes', ref => ref
      .orderBy('description', 'asc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CompanyType;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getCompanyTypeById(id: string) {
    return this.afs.collection<CompanyType>('companiesTypes').doc(id).valueChanges();
  }
}
