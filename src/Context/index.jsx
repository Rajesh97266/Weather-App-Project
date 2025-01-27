import { useContext, createContext, useState, useEffect } from "react";

import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Chennai");
  const [thisLocation, setLocation] = useState("");

  //Fetch Api

  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        contentType: "csv",
        unitGroup: "us",
        aggregateHours: "24",
        location: "Washington,DC,USA",
        shortColumnNames: "false",
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const thisData = Object.values(response.data.locations)[0];
      setLocation(thisData.address);
      setValues(thisData.values);
      setWeather(thisData.values[0]);

    } catch (error) {
      console.error(error);
      alert("This Place Does not Exist's");
    }
  };
   useEffect(() => {
     fetchWeather();
   }, [place]);

   useEffect(() => {
     console.log(values);
   }, [values]);

   return (
     <StateContext.Provider
       value={{
         weather,
         setPlace,
         values,
         thisLocation,
         place,
       }}
     >
       {children}
     </StateContext.Provider>
   );
};

export const useStateContext = () => useContext(StateContext);


