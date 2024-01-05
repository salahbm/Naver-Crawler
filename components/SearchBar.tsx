"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import { getIframeFromSearch } from "@/lib/scraper/helperFunctions";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";

const isValidNaverProductUrl = (searchName: string): boolean => {
  try {
    // Extract the path from the searchName

    const words = searchName
      .split(" ")
      .filter((word: any) => word.trim() !== "");

    // Check if the number of words is more than 2
    const isValid = words.length >= 2;

    return isValid;
  } catch (error) {
    console.error(error);
    return false;
  }
};
const extractNumericDistance = (distance: string) => {
  const match = distance.match(/(\d+(\.\d+)?)/);
  const numericValue = match ? parseFloat(match[1]) : null;

  if (numericValue !== null) {
    // Check if the original distance contains 'km' or 'm' and format accordingly
    const isKilometers = distance.toLowerCase().includes("km");
    return isKilometers ? `${numericValue} km` : `${numericValue} m`;
  }

  return "";
};
const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [selectedStore, setSelectedResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session }: any = useSession();
  const [searchedResults, setSearchedResults] = useState([]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidLink = isValidNaverProductUrl(searchPrompt);
    if (!isValidLink)
      alert(
        "Please provide brand name and location for better result, EX: '써브웨이 낙성대점'"
      );
    // Scrap the product
    try {
      setIsLoading(true);

      const getResults: any = await getIframeFromSearch(searchPrompt);
      if (getResults) {
        setSearchedResults(getResults);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrapeFromNaver = async (url: string) => {
    setSelectedResult(url);
    if (session && session.user.email && selectedStore != "") {
      await scrapeAndStoreProduct(
        searchPrompt,
        session.user.email,
        selectedStore
      );
    } else {
      // Handle the case when session or user is undefined
      console.log("User email not available in the session.");
    }
  };

  return (
    <div className=" flex flex-col gap-2">
      <form
        className="flex flex-wrap gap-4 mt-12 border-b pb-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          placeholder="Search Ex: 말똥도넛 파주"
          className="searchbar-input"
        />

        <button
          type="submit"
          className="searchbar-btn"
          disabled={!session?.user?.email}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      <div
        className={`w-full  max-h-[350px] min-h-[100px] overflow-auto border px-4 p-2  rounded-md ${
          searchedResults.length === 0 && `hidden`
        }`}
      >
        <p className="text-neutral-600 font-bold mx-1 border-b ">
          Scroll Up 📜
        </p>
        <ul>
          {searchedResults.map((item: any, index: number) => (
            <li
              onClick={() => handleScrapeFromNaver(item.linkSelector)}
              key={index}
              className="mb-2 cursor-pointer hover:bg-neutral-100 border-b p-1 border-md"
            >
              <div className="flex-between">
                <p className="text-blue-500 font-bold">{item.title}</p>
                <p className="text-green-500">{item.type}</p>
              </div>
              <div className="flex-between">
                <p className="text-gray-700">{item.location}</p>
                <p className="text-gray-800 font-semibold">
                  {extractNumericDistance(item.distance)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
