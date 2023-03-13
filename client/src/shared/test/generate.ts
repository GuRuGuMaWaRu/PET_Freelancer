const randomNumbers = (numberOfNumbers: number): Array<number> => {
  const numbers: Array<number> = [];

  for (let i = 1; i <= numberOfNumbers; i++) {
    const number = Math.floor(Math.random() * numberOfNumbers) + 1;
    numbers.push(number);
  }

  return numbers;
};

export { randomNumbers };
