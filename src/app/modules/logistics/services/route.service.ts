import {Injectable} from '@angular/core';
import {Cities, Route, Trip} from "../interfaces/route";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  citiesCollection: AngularFirestoreCollection<Cities>;
  routesCollection: AngularFirestoreCollection<Route>;
  tripsCollection: AngularFirestoreCollection<Trip>;

  constructor(private readonly afs: AngularFirestore) {
    this.routesCollection = afs.collection<Route>('routes', ref => ref.orderBy('createdAt', 'desc'));
    this.citiesCollection = afs.collection<Cities>('cities', ref => ref.orderBy('createdAt', 'desc'));
    this.tripsCollection = afs.collection<Trip>('trips', ref => ref.orderBy('createdAt', 'desc'));
  }

  //ROUTES SERVICES
  getRoutes(companyId: string) {
    return this.afs.collection<Route>('routes', ref => ref
      .where('companyId', '==', companyId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Route;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getRouteById(id: string) {
    return this.afs.collection<Route>('routes').doc(id).valueChanges();
  }

  saveRoute(route: Route, routeId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = routeId || this.afs.createId();
        const data = {id, ...route};
        const result = await this.routesCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  updateRoute(route: Route, routeId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = routeId;
        const data = {id, ...route};
        const result = await this.routesCollection.doc(id).update(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  deleteRoute(routeId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.routesCollection.doc(routeId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  //CITIES SERVICES
  getCities(companyId: string) {
    return this.afs.collection<Cities>('cities', ref => ref
      .where('companyId', '==', companyId)
      .orderBy('name', 'asc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Cities;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getCityById(id: string) {
    return this.afs.collection<Cities>('cities').doc(id).valueChanges();
  }

  saveCity(city: Cities, cityId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = cityId || this.afs.createId();
        const data = {id, ...city};
        const result = await this.citiesCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  updateCity(city: Cities, cityId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = cityId;
        const data = {id, ...city};
        const result = await this.citiesCollection.doc(id).update(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  deleteCity(cityId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.citiesCollection.doc(cityId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  //TRIPS SERVICES
  getTripById(id: string) {
    return this.afs.collection<Trip>('trips').doc(id).valueChanges();
  }

  getTrips(companyId: any) {
    return this.afs.collection<Trip>('trips', ref => ref
      .where('companyId', '==', companyId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Trip;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  saveTrip(trip: Trip, tripId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = tripId || this.afs.createId();
        const data = {id, ...trip};
        const result = await this.tripsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  updateTrip(trip: Trip, tripId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = tripId;
        const data = {id, ...trip};
        const result = await this.tripsCollection.doc(id).update(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  deleteTrip(tripId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.tripsCollection.doc(tripId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
