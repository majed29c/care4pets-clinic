import React from "react";

interface CardProps {
  title: string;
  description: string;
}

const Card = (props: CardProps) => {
  return (
    <div className="flex flex-col items-center justify-between w-full sm:w-[18rem] md:w-[20rem] lg:w-[15rem] xl:w-[18rem] 
      min-h-[12rem] sm:min-h-[14rem] md:min-h-[16rem] lg:min-h-[20rem] bg-white rounded-2xl shadow-xl p-6 border border-gray-200 
      transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-2xl m-4">
      
      <h1 className="bg-clip-text bg-gradient-to-r text-transparent from-blue-600 to-purple-600 font-roboto font-bold text-xl sm:text-2xl md:text-3xl text-center">
        {props.title}
      </h1>

      <p className="text-gray-600 text-sm sm:text-md text-center mt-2 sm:mt-4 px-2 sm:px-4 leading-relaxed">
        {props.description}
      </p>

      <button className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 text-white text-sm sm:text-lg font-medium 
        bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md transition-transform duration-300 
        hover:scale-110 hover:shadow-lg">
        Learn More
      </button>
    </div>
  );
};

export default Card;
