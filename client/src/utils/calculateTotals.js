import moment from "moment";

export default calculateTotals = projects => {
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

  const thisMonth = paymentByDate[currentYear][currentMonth].toFixed(2);
  const thisYear = Object.values(paymentByDate[currentYear])
    .reduce((total, month) => total + month)
    .toFixed(2);
  const lastYear = Object.values(paymentByDate[currentYear - 1])
    .reduce((total, month) => total + month)
    .toFixed(2);

  return {
    thisMonth,
    thisYear,
    lastYear
  };
};
