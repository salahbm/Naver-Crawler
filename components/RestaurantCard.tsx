import { RestaurantCardProps } from "@/types";
import Link from "next/link";
import React from "react";

const RestaurantCard: React.FC<RestaurantCardProps> = ({ data }) => {
  return (
    <Link href={`/pages/products/${data.phone}`}>
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          className="w-full h-64 object-cover object-center"
          src={data.logo}
          alt={data.name}
        />
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">{data.name}</h2>
          <p className="text-sm text-gray-600">{data.category}</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
