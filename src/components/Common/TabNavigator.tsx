import React, { ChangeEvent, ComponentProps, useState } from 'react';
import classnames from 'classnames';

interface ITabItem {
  name: string;
  title: string;
}

interface ITabNavigator {
  items: ITabItem[];
  onTabChange: React.Dispatch<React.SetStateAction<string>>;
  selectedTab: string;
}

interface IContestTabPill {
  name: string;
  selected: string;
  title: string;
  onPress: any;
  left?: boolean;
  right?: boolean;
}

const ContestTabPill: React.FC<IContestTabPill> = ({ name, title, selected, onPress, left, right }) => (
  <p
    onClick={() => onPress(name)}
    aria-current="page"
    className={classnames(
      ' transition duration-500 ease-in-out hover:text-primary',
      selected === name ? 'text-primary' : 'text-gray-500',
      'group relative min-w-0 flex-1 overflow-hidden bg-white cursor-pointer py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
      left && 'rounded-l-lg',
      right && 'rounded-r-lg',
    )}
  >
    <span>{title}</span>
    <span
      aria-hidden="true"
      className={classnames('absolute inset-x-0 bottom-0 h-1', name === selected ? 'bg-primary' : 'bg-transparent')}
    ></span>
  </p>
);

const TabNavigator: React.FC<ITabNavigator> = ({ items, onTabChange, selectedTab }) => {
  return (
    <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
      {items.map(({ name, title }, index) => (
        <ContestTabPill
          left={index === 0}
          right={index === items.length - 1}
          name={name}
          title={title}
          onPress={onTabChange}
          selected={selectedTab}
        />
      ))}
    </nav>
  );
};

export default TabNavigator;
