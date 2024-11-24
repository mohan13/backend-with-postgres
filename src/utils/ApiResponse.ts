class ApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: number | boolean;
  constructor(statusCode: number, data: any, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
