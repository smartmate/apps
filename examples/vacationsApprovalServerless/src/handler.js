'use strict';

const DAY_HOURS = 24;
const SECONDS_IN_A_HOUR = 3600;
const MILLISECONDS_IN_A_SECOND = 1000;

const response = (statusCode, body) => {
  return {
    statusCode,
    body: JSON.stringify(body, null, 2),
  };
};

const getDifferenceInDays = (startDate, endDate) => {
  const endTime = endDate.getTime();
  const startTime = startDate.getTime();

  return parseInt((endTime - startTime) / (DAY_HOURS * SECONDS_IN_A_HOUR * MILLISECONDS_IN_A_SECOND)) + 1;
};

const calculatedDaysOff = async (event) => {
  const { startDate, endDate } = event.queryStringParameters;

  if (!startDate || !endDate) {
    return response(400, { message: 'startDate and endDate are required!' });
  }

  const differenceInDays = getDifferenceInDays(new Date(startDate), new Date(endDate));
  return response(200, { data: differenceInDays });
};

module.exports = {
  calculatedDaysOff,
};
