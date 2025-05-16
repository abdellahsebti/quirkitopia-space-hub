
import React from 'react';
import { useNavigate } from 'react-router-dom';

type CategoryCardProps = {
  title: string;
  emoji: string;
  description: string;
  color: string;
  link: string;
};

const CategoryCard = ({ title, emoji, description, color, link }: CategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`hover-card rounded-xl p-6 ${color} cursor-pointer h-full flex flex-col justify-between`}
      onClick={() => navigate(link)}
    >
      <div>
        <div className="text-4xl mb-4">{emoji}</div>
        <h3 className="text-2xl font-serif font-bold mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
      <div className="mt-4 text-sm text-right">
        <span className="inline-flex items-center font-medium">
          Explore
          <svg
            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
