import React from 'react';

interface IBanner {
  title?: string;
  message?: string | React.ReactNode;
}

const Banner: React.FC<IBanner> = ({ title, message }) => (
  <div className="flex items-center justify-center bg-gray-200">
    <div className="container flex align-middle">
      <div className="bg-white rounded-lg shadow-lg p-5 md:p-20 mx-2">
        <div className="text-center">
          <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-3xl sm:leading-none md:text-4xl">
            {title ? (
              title
            ) : (
              <>
                Syntasso<span className="text-primary">.io</span>{' '}
              </>
            )}
          </h2>
          <p className="text-md md:text-xl mt-10">
            {message ? (
              message
            ) : (
              <>
                <a className="hover:underline" href="">
                  Syntasso.io
                </a>
                {` `}is an app that focuses on competitive programming challenges for both consumers and businesses,
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Banner;
