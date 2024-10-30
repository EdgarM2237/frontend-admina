import { ENDOPONT } from "./GeneralVariables";

export const fetchDevices = async () => {
    try {
      const response = await fetch(`${ENDOPONT}/devices`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
