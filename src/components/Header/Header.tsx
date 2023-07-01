import React from 'react';

const Header: React.FC = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <div className="text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-3">
            World's most famous celebrities
          </h1>
          <div className="flex mt-2 justify-center">
            <div className="w-48 h-1 rounded-full bg-indigo-500 inline-flex"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
