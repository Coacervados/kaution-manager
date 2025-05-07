import { Exception } from '@adonisjs/core/exceptions'

export default class ApiErrorException extends Exception {
  constructor(message: string, status: number) {
    super(message, { status })
  }
}

export class ValidationErr extends ApiErrorException {
  constructor(message: string) {
    super(message, 400)
  }
}

export class UnauthorizedErr extends ApiErrorException {
  constructor(message: string) {
    super(message, 401)
  }
}

export class ConflictError extends ApiErrorException {
  constructor(message: string) {
    super(message, 409)
  }
}

export class NotFoundErr extends ApiErrorException {
  constructor(message: string) {
    super(message, 404)
  }
}

export class DatabaseError extends ApiErrorException {
  constructor(message: string = 'Database error') {
    super(message, 500)
  }
}
