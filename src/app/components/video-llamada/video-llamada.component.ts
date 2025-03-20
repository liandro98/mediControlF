import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import AgoraRTC from 'agora-rtc-sdk';

@Component({
  selector: 'app-video-llamada',
  imports: [CommonModule],
  templateUrl: './video-llamada.component.html',
  styleUrl: './video-llamada.component.css'
})
export class VideoLlamadaComponent {
  private client: any;
  private localStream: any;
  public remoteStreams: any[] = [];

  // Reemplaza con tu App ID de Agora
  private appId: string = '05dad9fe7efd4bb9a84647fa0bdf3e6d';

  // Reemplaza con el nombre del canal y el token (si es necesario)
  private channel: string = 'mediControl';
  private token: string | null = null; // Usa null si no necesitas token

  constructor() {}

  ngOnInit(): void {
    this.initializeAgora();
  }

  ngOnDestroy(): void {
    this.leaveCall();
  }

  initializeAgora(): void {
    // Inicializa el cliente de Agora
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' });

    // Maneja la conexión de un stream remoto
    this.client.on('stream-added', (evt: any) => {
      const remoteStream = evt.stream;
      this.client.subscribe(remoteStream, (err: any) => {
        console.log('Error al suscribirse al stream remoto:', err);
      });
    });

    // Maneja la reproducción de un stream remoto
    this.client.on('stream-subscribed', (evt: any) => {
      const remoteStream = evt.stream;
      this.remoteStreams.push(remoteStream);
      remoteStream.play(`remote-stream-${remoteStream.getId()}`);
    });

    // Maneja la desconexión de un stream remoto
    this.client.on('stream-removed', (evt: any) => {
      const remoteStream = evt.stream;
      this.remoteStreams = this.remoteStreams.filter(
        (stream) => stream.getId() !== remoteStream.getId()
      );
      remoteStream.stop();
    });

    // Inicia la llamada
    this.joinCall();
  }

  async joinCall(): Promise<void> {
    try {
      // Inicializa el cliente con el App ID
      await this.client.init(this.appId);

      // Únete al canal
      const uid = await this.client.join(this.token, this.channel, null, null);

      // Crea y publica el stream local
      this.localStream = AgoraRTC.createStream({
        streamID: uid,
        audio: true,
        video: true,
        screen: false,
      });

      await this.localStream.init();
      await this.client.publish(this.localStream);

      // Reproduce el stream local
      this.localStream.play('local-stream');
    } catch (error) {
      console.error('Error al unirse a la llamada:', error);
    }
  }

  leaveCall(): void {
    if (this.localStream) {
      this.localStream.stop();
      this.localStream.close();
    }

    if (this.client) {
      this.client.leave(() => {
        console.log('Dejaste la llamada.');
        this.remoteStreams.forEach((stream) => stream.stop());
        this.remoteStreams = [];
      });
    }
  }
}
