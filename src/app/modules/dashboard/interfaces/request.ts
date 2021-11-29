import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Request {
  id?: string;
  message: string;
  userDisplayName: string;
  userEmail: string;
  active: boolean;
  status: string;

  companyId: string; //from companies collection
  requestType: string;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
