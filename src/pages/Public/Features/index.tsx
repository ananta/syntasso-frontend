import React from 'react';

const Features = () => {
  return (
    <div>
      <header className="bg-white shadow">
        {/* <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">Features</h1>
          <br />
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eveniet fuga in voluptates illum, id sapiente libero culpa officiis nesciunt fugit voluptas quod architecto commodi eos. Eligendi necessitatibus optio impedit!</p>
           <p>We take pride in syntasso being:</p>
           <br />
           <ul className="list-disc list-inside">
             <li>Fast</li>
             <li>Cheap</li>
             <li>Reliable</li>
           </ul>
           
        </div> */}

        <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Our Features</h1>
    </div>
    <div className="flex flex-wrap -m-4">
      <div className="p-4 md:w-1/3">
        <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-black-500 text-white flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h2 className="text-gray-900 text-lg title-font font-medium">Fast</h2>
          </div>
          <div className="flex-grow">
            <p className="leading-relaxed text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem incidunt ad perspiciatis. Possimus, inventore. Blanditiis non praesentium ducimus fugiat voluptatibus adipisci architecto! Vel sed quod impedit at? Nemo, culpa harum.</p>
            <a className="mt-3 text-blue-500 inline-flex items-center">Learn More
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3">
        <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-black-500 text-white flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="text-gray-900 text-lg title-font font-medium">Relaible</h2>
          </div>
          <div className="flex-grow">
            <p className="leading-relaxed text-base">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam dignissimos vitae est nisi ratione fugit autem tempore consequatur, iure nemo doloremque dolorum obcaecati cupiditate sed tempora nihil aspernatur excepturi? Nobis.</p>
            <a className="mt-3 text-blue-500 inline-flex items-center">Learn More
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3">
        <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-black-500 text-white flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </svg>
            </div>
            <h2 className="text-gray-900 text-lg title-font font-medium">Affordable</h2>
          </div>
          <div className="flex-grow">
            <p className="leading-relaxed text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam expedita optio minima ut quisquam ipsam. Voluptate architecto molestias rerum aperiam fugiat eum, doloremque id, placeat sed voluptatum et distinctio!</p>
            <a className="mt-3 text-blue-500 inline-flex items-center">Learn More
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      </header>
     </div>
  );
};

export default Features;
