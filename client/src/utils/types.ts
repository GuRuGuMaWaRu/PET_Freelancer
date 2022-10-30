enum NotificationType {
  create = "create",
  delete = "delete",
  error = "error",
  fail = "fail",
}

interface IResponseUserData {
  name: string;
  email: string;
  token: string;
}

interface ILoginFormInputs {
  email: string;
  password: string;
}

interface IRegisterFormInputs {
  name: string;
  email: string;
  password1: string;
  password2: string;
}


export { NotificationType };
export type { IResponseUserData, ILoginFormInputs, IRegisterFormInputs };
