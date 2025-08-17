import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService { 
  getWelcome(): object {
    const now = new Date();

    return {
      mensaje: '👋 Bienvenido a la API multi-task construida con NestJS',
      fechaHoraUTC: now.toISOString(), // formato estándar
    };
  }
}
