import React from 'react';
import Logo from 'shared/assets/images/logo.png';
import CoffeeImage from 'shared/assets/images/coffee.jpg';
import { FaStar } from 'react-icons/fa';

export default function CardComponent() {
    // const rating = new;
    const rating = 3;
    return (
        <div>
            <div className="relative pb-2/4">
                <img className="absolute h-full w-full object-cover rounded-lg" src={CoffeeImage} alt="coffee-image" />
            </div>
            <div className="relative px-4 -mt-16">
                <div className="bg-white p-6 rounded-lg overflow-hidden">
                    <div className="flex items-baseline ">
                        <span className="bg-teal-200 text-teal-900 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                            New
                        </span>
                        <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide ml-2">2020/2/3</div>
                    </div>
                    <h4 className="mt-1 font-semibold text-lg leading-tight truncate">
                        Welcome To Syntasso! This is a basic header component.
                    </h4>
                    <div className="mt-1">
                        This is the final <span className="text-gray-600 text-sm">the card component</span>
                    </div>
                    <div className="mt-2 flex items-center">
                        {Array(5)
                            .fill(<FaStar className="h-4 w-4 fill-current text-gray-500" />)
                            .fill(<FaStar className="h-4 w-4  fill-current text-teal-500" />, 0, rating)}
                        <span className="text-sm text-gray-500 ml-2">20 reviews</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/*
p-10
px-10 
py-10 
bg-gray-100 
h-10 
mt-6 
rounded-sm || lg
shadow-xl
leading => line height
tracking => letter spacing

*/

// p-10
// px-10
