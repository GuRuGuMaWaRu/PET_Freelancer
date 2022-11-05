interface IUser {
  name: string;
  email: string;
  password: string;
}

const users: IUser[] = [];

function addUser(newUser: IUser): void {
  const userExists = users.some((user) => user.email === newUser.email);

  if (userExists) {
    return;
  }

  users.push(newUser);
}

function getUser(email: string, password: string): IUser | undefined{
  return users.find(
      (u) => u.email === email && u.password === password,
    );
}

export type { IUser }
export { users, addUser, getUser };
