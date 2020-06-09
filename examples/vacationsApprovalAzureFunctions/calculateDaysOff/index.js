const DAY_HOURS = 24;
const SECONDS_IN_A_HOUR = 3600;
const MILLISECONDS_IN_A_SECOND = 1000;

const getDifferenceInDays = (startDate, endDate) => {
  const endTime = endDate.getTime();
  const startTime = startDate.getTime();

  return parseInt((endTime - startTime) / (DAY_HOURS * SECONDS_IN_A_HOUR * MILLISECONDS_IN_A_SECOND)) + 1;
};

module.exports = async function (context, req) {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        context.res = {
            status: 400,
            body: {
                message: 'startDate and endDate are required!',
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return;
    }
    const differenceInDays = getDifferenceInDays(new Date(startDate), new Date(endDate));
    context.res = {
        body: {
            data: differenceInDays,
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };
};