import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Employee {
  id?: string;
  name: string;
  dni:string;
  email: string;
  photoUrl?: string;
  phone?: string;
  address?: string;

  employeeTypeId?: string; //from employeesTypes collection
  companyId: string; //from companies collection

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}


export interface EmployeeTypes {
  id?: string;
  description: string;

  //permits
  securityModule: boolean;
  employeeModule: boolean;
  logisticsModule: boolean;
  configModule: boolean;

  companyId: string; //from companies collection

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
