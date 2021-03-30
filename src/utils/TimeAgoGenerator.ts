import moment from 'moment';

interface ITimeAgoGenerator {
  time: string;
}

const TimeAgoGenerator = ({ time }: ITimeAgoGenerator) => {
  const momentTime = moment(time);
  const currentTime = moment();
  const timeInSecond = currentTime.diff(momentTime, 'seconds');
  const timeInMinute = currentTime.diff(momentTime, 'minutes');
  const timeInHour = currentTime.diff(momentTime, 'hours');
  const timeInDay = currentTime.diff(momentTime, 'days');
  const timeInMonths = currentTime.diff(momentTime, 'months');
  const timeInYears = currentTime.diff(momentTime, 'years');

  return timeInYears > 0
    ? timeInYears + ' year'
    : timeInMonths > 0
    ? timeInMonths + ' month'
    : timeInDay > 0
    ? timeInDay + ' day'
    : timeInHour > 0
    ? timeInHour + ' hour'
    : timeInMinute > 0
    ? timeInMinute + ' minute'
    : timeInSecond + ' second';
};

export default TimeAgoGenerator;
