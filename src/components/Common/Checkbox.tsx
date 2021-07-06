import React from 'react';
import { stringToColour } from 'utils/Bits';

interface ICheckbox {
  title?: string;
  color?: string;
  checked?: boolean;
  onCheck: (title) => void;
}

const CustomCheckBox: React.FC<ICheckbox> = ({ title, checked, onCheck, color }) => {
  return (
    <li
      onClick={() => onCheck(title)}
      className=" cursor-pointer px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300"
    >
      <div className="flex items-center text-gray-600 cursor-pointer">
        <span
          className="inline-block h-5 w-5  mr-3 flex justify-center text-white font-bold text-sm"
          style={{ background: color || stringToColour(title || 'undefined') }}
        >
          {checked && '✓'}
        </span>
        {title || 'undefined'}
      </div>
    </li>
  );
};

export default CustomCheckBox;
