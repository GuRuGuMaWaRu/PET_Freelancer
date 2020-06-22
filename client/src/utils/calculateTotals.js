import moment from "moment";

const calculateTotals = projects => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const paymentByDate = projects.reduce((final, project) => {
    const year = moment(project.date).year();
    const month = moment(project.date).month();

    if (final.hasOwnProperty(year)) {
      if (final[year].hasOwnProperty(month)) {
        final[year][month] += project.payment;
      } else {
        final[year][month] = project.payment;
      }
    } else {
      final[year] = { [month]: project.payment };
    }

    return final;
  }, {});

  console.log("paymentByDate:", paymentByDate);

  let thisMonth = 0;
  let thisYear = 0;
  let lastYear = 0;

  if (
    paymentByDate.hasOwnProperty(currentYear) &&
    paymentByDate[currentYear].hasOwnProperty(currentMonth)
  ) {
    thisMonth = paymentByDate[currentYear][currentMonth].toFixed(2);
  }

  if (paymentByDate.hasOwnProperty(currentYear)) {
    thisYear = Object.values(paymentByDate[currentYear])
      .reduce((total, month) => total + month)
      .toFixed(2);
  }

  if (paymentByDate.hasOwnProperty(currentYear - 1)) {
    lastYear = Object.values(paymentByDate[currentYear - 1])
      .reduce((total, month) => total + month)
      .toFixed(2);
  }

  return {
    thisMonth,
    thisYear,
    lastYear
  };
};

export default calculateTotals;
