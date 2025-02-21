import { Component, OnInit } from '@angular/core';
import { GeolocalizacionService } from '../../servicies/geolocalizacion.service';
import * as L from 'leaflet';
@Component({
    selector: 'app-mapa',
    standalone: true,
    imports: [],
    templateUrl: './mapa.component.html',
    styleUrl: './mapa.component.css'
})
export class MapaComponent {
  private map!: L.Map;

  constructor(private geoService: GeolocalizacionService) {}

  ngOnInit(): void {
    this.inicializarMapa();
  }

  private inicializarMapa(): void {
    this.geoService.obtenerUbicacion().then(ubicacion => {
      this.map = L.map('map').setView([ubicacion.lat, ubicacion.lon], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      // Marcar la ubicación del usuario
      L.marker([ubicacion.lat, ubicacion.lon], {
        icon: L.icon({
          iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg',
          iconSize: [20, 20],
        })
      })
      .addTo(this.map)
      .bindPopup('📍 Tu ubicación')
      .openPopup();

      // Buscar tiendas cercanas
      this.geoService.buscarTiendas(ubicacion.lat, ubicacion.lon).subscribe(data => {
        console.log('Tiendas encontradas:', data);

        if (!data.elements || data.elements.length === 0) {
          console.warn('No se encontraron tiendas cercanas.');
          return;
        }

        data.elements.forEach((tienda: any) => {
          if (tienda.lat && tienda.lon) {
            L.marker([tienda.lat, tienda.lon], {
              icon: L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/263/263115.png', // Icono de tienda
                iconSize: [30, 30],
              })
            })
            .addTo(this.map)
            .bindPopup(`🛒 ${tienda.tags.name || 'Tienda'}`);
          }
        });
      });

    }).catch(error => console.error('Error al obtener ubicación:', error));
  }
}
