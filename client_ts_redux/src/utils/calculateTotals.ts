import { IProject } from "../types";

interface IPaymentByDate {
  [year: string]: {
    [month: string]: number;
  };
}

const calculateTotals = (projects: IProject[]) => {
  const currentMonth = new Date().toLocaleDateString("en-US", {
    month: "numeric"
  });
  const previousMonth = new Date(
    new Date().setMonth(new Date().getMonth() - 1)
  ).toLocaleDateString("en-US", {
    month: "numeric"
  });

  const currentYear = Number(
    new Date().toLocaleDateString("en-US", {
      year: "numeric"
    })
  );

  const paymentByDate = projects.reduce((final: IPaymentByDate, project) => {
    const year = new Date(project.date).toLocaleDateString("en-US", {
      year: "numeric"
    });
    const month = new Date(project.date).toLocaleDateString("en-US", {
      month: "numeric"
    });

    if (year in final) {
      if (month in final[year]) {
        final[year][month] += project.payment;
      } else {
        final[year][month] = project.payment;
      }
    } else {
      final[year] = { [month]: project.payment };
    }

    return final;
  }, {});

  let prevMonth = 0;
  let thisMonth = 0;
  let thisYear = 0;
  let lastYear = 0;

  if (
    currentYear in paymentByDate &&
    currentMonth in paymentByDate[currentYear]
  ) {
    thisMonth = +paymentByDate[currentYear][currentMonth].toFixed(2);
  }

  // TODO: what if a previous month is in the previous year?
  if (
    currentYear in paymentByDate &&
    previousMonth in paymentByDate[currentYear]
  ) {
    prevMonth = +paymentByDate[currentYear][previousMonth].toFixed(2);
  }

  if (currentYear in paymentByDate) {
    thisYear = Number(
      Object.values(paymentByDate[currentYear])
        .reduce((total, month) => total + month)
        .toFixed(2)
    );
  }

  if (currentYear - 1 in paymentByDate) {
    lastYear = Number(
      Object.values(paymentByDate[currentYear - 1])
        .reduce((total, month) => total + month)
        .toFixed(2)
    );
  }

  const superTotal = Object.values(paymentByDate)
    .reduce((total, item) => {
      return total + Object.values(item).reduce((sum, month) => sum + month);
    }, 0)
    .toFixed(2);

  return {
    prevMonth,
    thisMonth,
    thisYear,
    lastYear,
    superTotal
  };
};

export default calculateTotals;
