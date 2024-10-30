import { Typography } from "@material-tailwind/react";
import { UserAvatarMenu } from "./HeaderUser";
import { useEffect, useState } from "react";
import { ENDOPONT, IMAGEENDPOINT } from "../../../fetchs/GeneralVariables";

export function HeaderPage({ theme, setTheme }) {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem('email')
    if (userString) {
      async function fetchAdminName() {
        const response = await fetch(`${ENDOPONT}/admin/getadminname`, {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email: userString}),
        });
        const data = await response.json();
        setAdmin(data);
      }
      fetchAdminName();
    }
  }, [])

  const addRouteImage = (route) => {
    const imageRoute = `${IMAGEENDPOINT}/${route}`;
    return imageRoute;
  }

  return (
    <div className="flex items-center justify-between mb-4 shadow-md rounded-lg p-3 mx-4">
      <div className="flex items-center gap-4">
        <h1 className="font-playwrite text-3xl font-bold text-blue-gray-900">
          Admina
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Typography
          as="span"
          variant="h5"
          color="blue-gray"
          className="font-semibold"
        >
          {admin?.admin_name || "Admin"}
        </Typography>
        <UserAvatarMenu theme={theme} setTheme={setTheme} image={addRouteImage(admin?.admin_img)} />
      </div>
    </div>
  );
}
