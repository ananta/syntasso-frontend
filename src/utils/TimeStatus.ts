import moment from 'moment';

const IsTimeInPast = (time: string) => moment(time).isBefore();

const IsTimeInFuture = (time: string) => moment(time).isAfter();

export { IsTimeInPast, IsTimeInFuture };
