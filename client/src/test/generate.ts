import { faker } from "@faker-js/faker";
import type { IUser } from './server/users'
import type { IProject } from './server/projects'

const RANDOM_CLIENTS = 20;
const clients: string[] = [];

for (let i = 0; i < RANDOM_CLIENTS; i++) {
  clients.push(faker.company.name())
}
const buildUser = (overrides: Partial<IUser> = {}): IUser => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...overrides,
});

const buildProject = (overrides: Partial<IProject> = {}): IProject => ({
  _id: faker.datatype.uuid(),
  user: faker.datatype.uuid(),
  client: { name: clients[Math.floor((Math.random() * RANDOM_CLIENTS))], _id: faker.datatype.uuid() },
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
