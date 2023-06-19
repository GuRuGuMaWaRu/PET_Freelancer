import { faker } from "@faker-js/faker";
import type { IUser } from "./server/users";
import type { IProject } from "./server/projects";
import { Currency } from "shared/types";

const RANDOM_CLIENTS = 20;
const clients: string[] = [];

for (let i = 0; i < RANDOM_CLIENTS; i++) {
  clients.push(faker.company.name());
}
const buildUser = (overrides: Partial<IUser> = {}): IUser => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...overrides,
});

const buildProject = (overrides: Partial<IProject> = {}): IProject => ({
  _id: faker.string.uuid(),
  user: faker.string.uuid(),
  client: {
    name: clients[Math.floor(Math.random() * RANDOM_CLIENTS)],
    _id: faker.string.uuid(),
  },
  projectNr: faker.string.uuid(),
  payment: +faker.finance.amount(1, 200),
  currency: Currency.USD,
  date: faker.date.between({
    from: faker.date.past({ years: 2 }),
    to: Date.now(),
  }),
  deleted: false,
  paid: false,
  comments: faker.lorem.sentence(),
  ...overrides,
});

const randomNumbers = (numberOfNumbers: number): Array<number> => {
  const numbers: Array<number> = [];

  for (let i = 1; i <= numberOfNumbers; i++) {
    const number = Math.floor(Math.random() * numberOfNumbers) + 1;
    numbers.push(number);
  }

  return numbers;
};

export { buildUser, buildProject, randomNumbers };
