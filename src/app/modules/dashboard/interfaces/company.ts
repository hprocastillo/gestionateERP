import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Company {
  id?: string;
  name: string;
  email?: string;
  ruc?: string;
  logoUrl?: string;
  webUrl?: string;
  phone?: string;
  address?: string;

  companyTypeId: string; //from companies Types collection

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}

export interface CompanyType {
  id?: string;
  description: string;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
