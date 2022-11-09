type NotificationType = "create" | "delete" | "error" | "fail";

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


export type { NotificationType, IResponseUserData, ILoginFormInputs, IRegisterFormInputs };
