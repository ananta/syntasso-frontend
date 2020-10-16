import React, { ComponentProps } from 'react';
import classnames from 'classnames';
import Loader from 'react-loader-spinner';

import { RegularText } from 'components/Common/CustomText';

interface ButtonProps {
  title: string;
  isBusy?: boolean;
  classNames?: string;
  disabled?: boolean;
  color?: string;
  onClick?: (e) => void;
}

const Button: React.FC<ButtonProps & ComponentProps<'button'>> = ({
  title,
  isBusy,
  classNames,
  disabled,
  onClick,
  color,
  ...rest
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={classnames(
        `outline-none focus:outline-none focus:shadow-outline shadow-md font-medium py-2 px-4 text-red-100  cursor-pointer bg-${
          color ? (disabled ? 'gray-600' : color) : disabled ? 'gray-600' : 'pink-600'
        }   rounded text-md tr-mt  text-center w-full`,
        classNames,
      )}
      onClick={onClick}
      {...rest}
    >
      {isBusy ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Loader type="TailSpin" color="#FFF" height={25} width={25} />
        </div>
      ) : (
        <RegularText classNames="text-gray-100  text-center md:text-base ">{title}</RegularText>
      )}
    </button>
  );
};

export default Button;
