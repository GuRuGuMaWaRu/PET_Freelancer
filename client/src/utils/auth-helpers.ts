import type { IResponseUserData } from '.'
import { client } from '.'

const localStorageKey = "__FreelancerApp_token__";

async function loginHelper(data: object) {
  return client<IResponseUserData>("users/login", { data }).then(res => {
    window.localStorage.setItem(localStorageKey, res.data.token);
    return res.data;
  });
}

async function signupHelper(data: object) {
  return client<IResponseUserData>("users/signup", { data }).then(res => {
    window.localStorage.setItem(localStorageKey, res.data.token);
    return res.data;
  })
}

async function bootstrapUser () {
  let user: IResponseUserData | null = null;

  const token = window.localStorage.getItem(localStorageKey);
  if (token) {
    const res = await client<IResponseUserData>("users/getUser", { token });
    user = res.data;
  }

  return user;
};

export { bootstrapUser, loginHelper, signupHelper }