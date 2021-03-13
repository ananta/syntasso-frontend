import React from 'react';

const FAQ = () => (
  <div className="py-10">
    <div className="mx-auto max-w-6xl">
      <div className="p-2  rounded">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-4 text-sm">
            <div className="text-3xl">
              Frequently asked <span className="font-medium">Questions</span>
            </div>
            <div className="my-2">Wondering how our service works ?</div>
            <div className="mb-2">Confused about how we can improve your business ?</div>
            <div className="text-xs text-gray-600">Dive into our FAQ for more details</div>
          </div>
          <div className="md:w-2/3">
            <div className="p-4">
              <div className="mb-2">
                <div className="font-medium rounded-sm text-lg px-2 py-3 flex text-gray-800 flex-row-reverse mt-2 cursor-pointer text-black bg-white hover:bg-white">
                  <div className="flex-auto">How to install it with windows server ?</div>
                  <div className="px-2 mt-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-down w-5 h-5"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="font-medium rounded-sm text-lg px-2 py-3 flex text-gray-800 flex-row-reverse mt-2 cursor-pointer text-black bg-white hover:bg-white">
                  <div className="flex-auto">How to use it with other integrations ?</div>
                  <div className="px-2 mt-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-down w-5 h-5"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="font-medium rounded-sm text-lg px-2 py-3 flex text-gray-800 flex-row-reverse mt-2 cursor-pointer text-black bg-white hover:bg-white">
                  <div className="flex-auto">How to build an app ?</div>
                  <div className="px-2 mt-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-up w-5 h-5"
                      >
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-justify text-left text-gray-800 mb-5 bg-white">
                  Lorem, ipsum dolor sit amet consectetur <span className="font-bold">adipisicing elit</span>. Mollitia
                  temporibus doloremque non eligendi unde ipsam? Voluptatibus, suscipit deserunt quidem delectus
                  perferendis velit molestias, veritatis officia fugiat cumque quaerat earum adipisci?
                </div>
              </div>
              <div className="mb-2">
                <div className="font-medium rounded-sm text-lg px-2 py-3 flex text-gray-800 flex-row-reverse mt-2 cursor-pointer text-black bg-white hover:bg-white">
                  <div className="flex-auto">How to download it ?</div>
                  <div className="px-2 mt-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-down w-5 h-5"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="font-medium rounded-sm text-lg px-2 py-3 flex text-gray-800 flex-row-reverse mt-2 cursor-pointer text-black bg-white hover:bg-white">
                  <div className="flex-auto">How to use extensions ?</div>
                  <div className="px-2 mt-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-down w-5 h-5"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FAQ;
