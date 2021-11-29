import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Route {
  id?: string;
  description: string;
  originCity: string;
  originAddress: string;
  originLocation: string;
  destinationCity: string;
  destinationAddress: string;
  destinationLocation: string;
  timeOfArrival: number;
  status: boolean;

  companyId: string; //from companies collection

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}

export interface Cities {
  id?: string;
  name: string;
  coordinatesUrl?: string;

  companyId: string; //from companies collection

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}

export interface Trip {
  id?: string;
  startDate: Timestamp;
  endDate: Timestamp;
  timeOnRoute: number;
  initialMileage: number;
  finalMileage: number;
  traveledMileage: number;
  observations: string;
  photoUrl: string;
  status: boolean;

  checklistId: string; //from checklist collection
  routeId: string; //from route collection
  employeeId: string; //from employee collection
  companyId: string; //from companies collection
  vehicleId: string; // from vehicles collection

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}

