import React from 'react';
import classnames from 'classnames';

interface CustomTextProps {
  classNames?: string;
  children: React.ReactNode;
}
const TitleText: React.FC<CustomTextProps> = ({ classNames, children }) => (
  <div className={classnames('text-left text-3xl text-black font-medium leading-snug tracking-wider', classNames)}>
    {children}
  </div>
);

const RegularText: React.FC<CustomTextProps> = ({ classNames, children }) => (
  <div className={classnames('text-black text-base leading-8 sm:text-xs ', classNames)}>{children}</div>
);

const MediumTitle: React.FC<CustomTextProps> = ({ classNames, children }) => (
  <div className={classnames('text-xl text-black align-middle', classNames)}>{children}</div>
);

export { TitleText, MediumTitle, RegularText };
