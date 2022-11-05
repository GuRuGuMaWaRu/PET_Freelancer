import { faker } from "@faker-js/faker";
import type { IUser } from './server/users'

const createUser = (overrides: Partial<IUser> = {}): IUser => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...overrides,
});

export { createUser };
