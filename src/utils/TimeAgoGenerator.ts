import moment from 'moment';

interface ITimeAgoGenerator {
  time: string;
}

const TimeAgoGenerator = ({ time }: ITimeAgoGenerator) => {
  return moment(time).local().fromNow();
};

export default TimeAgoGenerator;
