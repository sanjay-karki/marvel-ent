import React from "react";
import Navbar from "../Components/Navbar";
import { ReactComponent as MarvelLogo } from "./Marvel_Logo.svg";
import { GetMainContext } from "../Contexts/MainContext";

const Character = () => {
  const { characterDetails } = GetMainContext();
  const thumbnail = characterDetails
    ? (characterDetails[0]?.thumbnail.path + ".").concat(
        characterDetails[0].thumbnail.extension
      )
    : "";
  const { id, name, comics, description, series, stories } = characterDetails
    ? characterDetails[0]
    : {};
  const details = characterDetails
    ? {
        comics: `Comics appearances: ${comics.available}`,
        series: `Series appearances: ${series.available}`,
        stories: `Stories appearances: ${stories.available}`,
      }
    : {};
  
  return (
    <>
      <Navbar />
      <div className="text-align-center mb-4 mt-8">
        <MarvelLogo width={250} height={101} />
        {characterDetails && (
          <h1 className="text-4xl font-bold mt-4 mb-8 text-slate-300">
            Character Details
          </h1>
        )}
      </div>
      {characterDetails ? (
        <div className="max-w-md md:mx-auto mx-4 mb-4 bg-stone-300 rounded-xl shadow-md overflow-hidden md:max-w-screen-lg	">
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={thumbnail}
                alt={`Image of Marvel Character with ID: ${id}`}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-red-custom font-semibold">
                {`ID: ${id}`}
                {/* text-indigo-500 */}
              </div>
              <p className="block mt-1 text-lg leading-tight font-medium text-black ">
                {name}
              </p>
              <p className="mt-2 text-slate-500">
                {description || "No character description available."}
              </p>
              <p className="mt-2 text-slate-500">{details.comics}</p>
              <p className="mt-2 text-slate-500">{details.series}</p>
              <p className="mt-2 text-slate-500">{details.stories}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-align-center font-bold mt-12 text-2xl text-slate-300">
          No character has been chosen to be displayed. Please go back to
          character list page or homepage.
        </div>
      )}
    </>
  );
};

export default Character;
