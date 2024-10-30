import { ENDOPONT } from "./GeneralVariables";

export const fetchAdmin = async () => {
    try {
      const response = await fetch(`${ENDOPONT}/admin`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

export const addAdmin = async (admin_name, admin_email, admin_pwd, rol_id) => {
    /*const selectedRole = rol_id.filter(rol => rol.isSelected).map(rol => rol.rol_id);*/
    console.log(typeof(rol_id))
    const data = {
        admin_name,
        admin_email,
        admin_pwd,
        rol_id
    }
    try {
        const response = await fetch(`${ENDOPONT}/admin/addadmin`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        )
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const newAdmin = await response.json();
        return newAdmin;
    } catch (error) {
        console.error(error)
    }
}

export const deleteAdmin = async (id) => {
    try {
        const response = await fetch(`${ENDOPONT}/admin/deleteadmin`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify({ "admin_id": id }),
        })
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const deletedUser = await response.json();
        return deletedUser;
    } catch (error) {
        console.log(error)
    }
}
