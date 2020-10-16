import { RouteComponentProps } from 'react-router-dom';

export interface IRoutePropsForContest extends RouteComponentProps {
  contestId: number;
}
