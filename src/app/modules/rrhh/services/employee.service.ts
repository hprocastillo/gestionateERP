import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Employee, EmployeeTypes} from "../interfaces/employee";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeesCollection: AngularFirestoreCollection<Employee>;
  employeesTypesCollection: AngularFirestoreCollection<EmployeeTypes>;

  constructor(private readonly afs: AngularFirestore) {
    this.employeesCollection = afs.collection<Employee>('employees', ref => ref.orderBy('createdAt', 'desc'));
    this.employeesTypesCollection = afs.collection<EmployeeTypes>('employeesTypes', ref => ref.orderBy('createdAt', 'desc'));
  }

  //EMPLOYEE SERVICE
  getEmployees(companyId: string) {
    return this.afs.collection<Employee>('employees', ref => ref
      .where('companyId', '==', companyId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Employee;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getEmployeesByEmployeeType(companyId: any, employeeTypeId: any) {
    return this.afs.collection<Employee>('employees', ref => ref
      .where('companyId', '==', companyId)
      .where('employeeTypeId', '==', employeeTypeId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Employee;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getEmployeeById(id: string) {
    return this.afs.collection<Employee>('employees').doc(id).valueChanges();
  }

  saveEmployee(employee: Employee, employeeId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = employeeId || this.afs.createId();
        const data = {id, ...employee};
        const result = await this.employeesCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  updateEmployee(employee: Employee, employeeId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = employeeId;
        const data = {id, ...employee};
        const result = await this.employeesCollection.doc(id).update(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  deleteEmployee(EmployeeId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.employeesCollection.doc(EmployeeId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }


  //EMPLOYEE TYPE SERVICE
  getEmployeesTypes(companyId: string) {
    return this.afs.collection<EmployeeTypes>('employeesTypes', ref => ref
      .where('companyId', '==', companyId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as EmployeeTypes;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getEmployeesTypesById(id: string) {
    return this.afs.collection<EmployeeTypes>('employeesTypes').doc(id).valueChanges();
  }

  saveEmployeeType(employeeType: EmployeeTypes, employeeTypeId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = employeeTypeId || this.afs.createId();
        const data = {id, ...employeeType};
        const result = await this.employeesTypesCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }


  updateEmployeeType(employeeType: EmployeeTypes, employeeTypeId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = employeeTypeId;
        const data = {id, ...employeeType};
        const result = await this.employeesTypesCollection.doc(id).update(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }


  deleteEmployeeType(employeeTypeId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.employeesTypesCollection.doc(employeeTypeId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }
}
