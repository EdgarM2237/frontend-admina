import { ENDOPONT } from "./GeneralVariables";

export const fetchRoles = async () => {
    try {
      const response = await fetch(`${ENDOPONT}/roles`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };