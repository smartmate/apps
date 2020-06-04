'use strict';

const DAY_HOURS = 24;
const SECONDS_IN_A_HOUR = 3600;
const MILLISECONDS_IN_A_SECOND = 1000;

const getDifferenceInDays = (startDate, endDate) => {
  const endTime = endDate.getTime();
  const startTime = startDate.getTime();

  return parseInt((endTime - startTime) / (DAY_HOURS * SECONDS_IN_A_HOUR * MILLISECONDS_IN_A_SECOND)) + 1;
};

exports.calculatedDaysOff = (request, response) => {
  const { startDate, endDate } = request.query;

  if (!startDate || !endDate) {
    response.status(400).send({ message: 'startDate and endDate are required!' });
    return;
  }

  const differenceInDays = getDifferenceInDays(new Date(startDate), new Date(endDate));
  response.status(200).send({ data: differenceInDays });
};


// gcloud functions deploy 'calculateDaysOff' --runtime nodejs10 --trigger-http --entry-point=calculatedDaysOff