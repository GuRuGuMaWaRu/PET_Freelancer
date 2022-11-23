import { faker } from "@faker-js/faker";
import type { IUser } from './server/users'
import type { IProject } from './server/projects'

const buildUser = (overrides: Partial<IUser> = {}): IUser => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...overrides,
});

const buildProject = (overrides: Partial<IProject> = {}): IProject => ({
  user: faker.datatype.uuid(),
  client: faker.datatype.uuid(),
  projectNr: faker.datatype.uuid(),
  payment: +faker.finance.amount(1, 200),
  currency: 'USD',
  date: faker.date.between(faker.date.past(2), Date.now()),
  deleted: false,
  paid: false,
  comments: faker.lorem.sentence(),
  ...overrides
})

export { buildUser, buildProject };
