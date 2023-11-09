import passport from '@fastify/passport';
import { FastifyRequest } from 'fastify';

export abstract class PassportSerializer {
  abstract serializeUser(user: any, request: FastifyRequest): any;
  abstract deserializeUser(payload: any, request: FastifyRequest): any;

  constructor() {
    const passportInstance = this.getPassportInstance();

    passportInstance.registerUserSerializer(async (user, request: FastifyRequest) => this.serializeUser(user, request));
    passportInstance.registerUserDeserializer(async (payload, request: FastifyRequest) => this.deserializeUser(payload, request));
  }

  getPassportInstance() {
    return passport;
  }
}
