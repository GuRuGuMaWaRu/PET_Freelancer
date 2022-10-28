enum NotificationType {
  create = "create",
  delete = "delete",
  error = "error",
  fail = "fail",
}

interface IResponseUser {
  name: string;
  email: string;
  token: string;
}

export { NotificationType };
export type {IResponseUser};
