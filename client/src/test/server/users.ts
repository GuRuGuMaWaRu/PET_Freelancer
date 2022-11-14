import {usersKey} from '../../config'

interface IUser {
  name: string;
  email: string;
  password: string;
  token?: string;
}


const users: Record<string, IUser> = {};

// initialize
load()

function persist() {
  window.localStorage.setItem(usersKey, JSON.stringify(users));
}
function load() {
  Object.assign(users, JSON.parse(window.localStorage.getItem(usersKey) || '{}'));
}

function addUser(newUser: IUser): void {
  if (users[newUser.email]) {
    return;
  }

  users[newUser.email] = { ...newUser, token: newUser.password };
  persist()
}

function getUser(email: string, password: string): IUser | undefined{
  const user = users[email];

  if (user && user.password === password) {
    return user
  }
}

function getUserByToken(token: string): IUser | undefined{
  return Object.values(users).find(
      (u) => u.token === token,
    );
}

export type { IUser }
export { users, addUser, getUser, getUserByToken };
