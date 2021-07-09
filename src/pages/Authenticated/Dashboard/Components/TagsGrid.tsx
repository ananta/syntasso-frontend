import React from 'react';
import { GiAtomicSlashes,GiProcessor,GiFamilyTree } from 'react-icons/gi';
import {GrGraphQl} from 'react-icons/gr';
import {RiLinksLine} from 'react-icons/ri';

const TagsGrid = () => {
  return (
    <>
      <div>
        <div className="">
          <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px ">
            <div className="rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 flex ">
              <div>
                <span className="rounded-lg inline-flex px-3 bg-teal-50 text-teal-700 ring-4 ring-white">
                  <GiProcessor className="h-12 w-12 align-center" />
                </span>
              </div>
              <div className="">
                
                <h3 className="text-lg font-medium">
                  <a href="/challenges?tag=Algorithms" className="focus:outline-none ">
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    <p className="pt-2">Algorithms</p>
                  </a>
                </h3>
              </div>
            </div>

            <div className=" sm:rounded-tr-lg relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 flex">
              <div>
                <span className="rounded-lg inline-flex px-3 bg-teal-50 text-teal-700 ring-4 ring-white">
                  <GrGraphQl className="h-12 w-12" />
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  <a href="/challenges?tag=Graphs" className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    <p className="pt-2">Graphs</p>
                  </a>
                </h3>
              </div>
            </div>
            <div className="  sm:rounded-bl-lg  relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 flex">
              <div>
                <span className="rounded-lg inline-flex px-3 bg-teal-50 text-teal-700 ring-4 ring-white">
                  <RiLinksLine className="h-12 w-12" />
                </span>
              </div>
              <div className="">
                <h3 className="text-lg font-medium">
                  <a href="/challenges?tag=Linked%20List" className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    <p className="pt-2">Linked List</p>
                  </a>
                </h3>
              </div>
            </div>

            <div className="   rounded-bl-lg rounded-br-lg sm:rounded-bl-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 flex">
              <div>
                <span className="rounded-lg inline-flex px-3 bg-teal-50 text-teal-700 ring-4 ring-white">
                  <GiFamilyTree className="h-12 w-12" />
                </span>
              </div>
              <div className="">
                <h3 className="text-lg font-medium">
                  <a href="/challenges?tag=Data%20Structures" className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    <p className="pt-2">Data Structures</p>
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TagsGrid;
