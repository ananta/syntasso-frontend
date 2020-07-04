import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { MediumTitle } from 'components/Common/CustomText';
import Logo from 'shared/assets/images/logo-white.png';
import Section from 'components/Layout/Section';
import SectionHeader from 'components/Common/SectionHeader';
import Button from 'components/Common/Button';
import { history } from 'utils/History';

interface ListItemProps {
    title: string;
    description: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, description }) => (
    <div className="bg-white px-4 py-2 rounded-l w-full lg:flex mb-10">
        <div className=" rounded px-4 flex flex-col justify-between leading-normal">
            <div>
                <div className="mt-3 md:mt-0 text-gray-700 font-bold text-2xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
            <div className="flex mt-3">
                <img src={Logo} className="h-10 w-10 rounded-full mr-2 object-cover" />
                <div>
                    <p className="font-semibold text-gray-700 text-sm capitalize"> weekly competition </p>
                    <p className="text-gray-600 text-xs"> 14 Aug </p>
                </div>
            </div>
        </div>
    </div>
);

const Contest: React.FC<RouteComponentProps> = () => {
    const activeContests = [
        {
            title: 'Project Euler+',
            description:
                'Nam malesuada aliquet metus, ac commodo augue mollis sit amet. Nam bibendum risus sit amet metus semper consectetur. Proin consequat ullamcorper eleifend. Nam bibendum risus sit amet metus semper consectetur.',
        },
        {
            title: 'Project Euler+',
            description:
                'Nam malesuada aliquet metus, ac commodo augue mollis sit amet. Nam bibendum risus sit amet metus semper consectetur. Proin consequat ullamcorper eleifend. Nam bibendum risus sit amet metus semper consectetur.',
        },
        {
            title: 'Project Euler+',
            description:
                'Nam malesuada aliquet metus, ac commodo augue mollis sit amet. Nam bibendum risus sit amet metus semper consectetur. Proin consequat ullamcorper eleifend. Nam bibendum risus sit amet metus semper consectetur.',
        },
    ];
    const archivedContests = [
        {
            title: 'Project Euler+',
            description:
                'Nam malesuada aliquet metus, ac commodo augue mollis sit amet. Nam bibendum risus sit amet metus semper consectetur. Proin consequat ullamcorper eleifend. Nam bibendum risus sit amet metus semper consectetur.',
        },
        {
            title: 'Project Euler+',
            description:
                'Nam malesuada aliquet metus, ac commodo augue mollis sit amet. Nam bibendum risus sit amet metus semper consectetur. Proin consequat ullamcorper eleifend. Nam bibendum risus sit amet metus semper consectetur.',
        },
        {
            title: 'Project Euler+',
            description:
                'Nam malesuada aliquet metus, ac commodo augue mollis sit amet. Nam bibendum risus sit amet metus semper consectetur. Proin consequat ullamcorper eleifend. Nam bibendum risus sit amet metus semper consectetur.',
        },
    ];
    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mb-10 ">
                <div className="w-full lg:w-2/3 mx-auto ">
                    <div>
                        <SectionHeader title="Active Contests" />
                        <div>
                            {activeContests.map(({ title, description }, indx) => (
                                <ListItem key={indx.toString()} title={title} description={description} />
                            ))}
                        </div>
                    </div>
                    <div className="border border-dotted my-10"></div>
                    <div>
                        <SectionHeader title="Archived Contests" link="View all" />
                        <div>
                            {archivedContests.map(({ title, description }, indx) => (
                                <ListItem key={indx.toString()} title={title} description={description} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/3 px-3">
                    <div className="mb-4">
                        <div className="border border-dotted"></div>
                        <div className="p-1 mt-4 mb-4 relative">
                            <h5 className="font-bold text-lg uppercase text-gray-700 mb-2"> Administration </h5>
                            <Button
                                title="Create Challenge"
                                color="blue-700"
                                onClick={() => history.push('/administration/challenges/create')}
                            />
                            <Button
                                title="Manage Challenge"
                                color="gray-700"
                                classNames="mt-2"
                                onClick={() => history.push('/administration/challenges')}
                            />
                        </div>
                        <div className="border border-dotted"></div>
                        <h5 className="font-bold text-lg uppercase text-gray-700 px-1 mb-2">Tags</h5>
                        <ul>
                            <li className="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
                                <a href="#" className="flex items-center text-gray-600 cursor-pointer">
                                    <span className="inline-block h-4 w-4 bg-green-300 mr-3"></span>
                                    Algorithms
                                    <span className="text-gray-500 ml-auto">23 contests</span>
                                    <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                                </a>
                            </li>
                            <li className="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
                                <a href="#" className="flex items-center text-gray-600 cursor-pointer">
                                    <span className="inline-block h-4 w-4 bg-indigo-300 mr-3"></span>
                                    Data Structures
                                    <span className="text-gray-500 ml-auto">18 contest</span>
                                    <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                                </a>
                            </li>
                            <li className="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
                                <a href="#" className="flex items-center text-gray-600 cursor-pointer">
                                    <span className="inline-block h-4 w-4 bg-yellow-300 mr-3"></span>
                                    Regex
                                    <span className="text-gray-500 ml-auto">10 contests</span>
                                    <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="border border-dotted"></div>
                    <div className="p-1 mt-4 mb-4">
                        <h5 className="font-bold text-lg uppercase text-gray-700 mb-2"> Subscribe </h5>
                        <p className="text-gray-600">
                            Subscribe to our newsletter to get notified for upcoming contests.
                        </p>
                        <input
                            placeholder="your email address"
                            className="text-gray-700 bg-gray-100 rounded-t hover:outline-none p-2 w-full mt-4 border"
                        />
                        <Button title="Subscribe" color="gray-700" classNames="mt-2" />
                    </div>
                    <div className="border border-dotted"></div>
                </div>
            </div>
        </div>
    );
};

export default Contest;
