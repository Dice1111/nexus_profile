//toast
export class DatabaseOperationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "DatabaseOperationError";
  }
}

export class DomainTypeMappingError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "Domain Mapping Error";
  }
}

export class UniqueConstraintError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "Unique Constraint Error";
  }
}

export class NetworkError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "Network Error";
  }
}

export class NotFoundError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "Not Found Error";
  }
}

export class InputParseError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "Input Parse Error";
  }
}
