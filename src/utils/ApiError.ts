class ApiError extends Error {
  statusCode: number; // Type for HTTP status codes
  data: any; // Optional data payload for additional error details
  success: boolean; // Indicates if the response is successful
  errors: string[]; // Array of error messages or details

  constructor(
    statusCode: any,
    message: "Something went wrong",
    errors: [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
