interface IUser {
  name: string;
  email: string;
  password: string;
  token?: string;
}

const users: IUser[] = [];

function addUser(newUser: IUser): void {
  const userExists = users.some((user) => user.email === newUser.email);

  if (userExists) {
    return;
  }

  users.push({ ...newUser, token: newUser.password });
}

function getUser(email: string, password: string): IUser | undefined{
  return users.find(
      (u) => u.email === email && u.password === password,
    );
}

function getUserByToken(token: string): IUser | undefined{
  return users.find(
      (u) => u.token === token,
    );
}

export type { IUser }
export { users, addUser, getUser, getUserByToken };
