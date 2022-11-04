import { faker } from "@faker-js/faker";

interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

const createUser = (overrides: Partial<IUser> = {}): IUser => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  name: faker.internet.userName(),
  password: faker.internet.password(),
  ...overrides,
});

export { createUser };
