import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizacionService {

  private overpassUrl = 'https://overpass-api.de/api/interpreter';

  constructor(private http: HttpClient) {}

  obtenerUbicacion(): Promise<{ lat: number, lon: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          (error) => reject(error)
        );
      } else {
        reject('Geolocalización no soportada por el navegador');
      }
    });
  }

  buscarTiendas(lat: number, lon: number): Observable<any> {
    // Consulta Overpass para farmacias, supermercados y tiendas en un
    //  radio de 2000m
    const query = `
      [out:json];
      (
        node["shop"="pharmacy"](around:2000,${lat},${lon});
        node["shop"="supermarket"](around:2000,${lat},${lon});
        node["shop"="convenience"](around:2000,${lat},${lon});
      );
      out body;
    `;
    return this.http.get<any>(`${this.overpassUrl}?data=${encodeURIComponent(query)}`);
  }
}
