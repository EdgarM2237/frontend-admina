import { ENDOPONT } from "./GeneralVariables";

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${ENDOPONT}/users`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);

  }
};

export const editUsers = async (id, name, user_email, card_id, devices) => {
    console.log(devices)
    const selectedDevices = devices.filter(device => device.isSelected).map(device => device.device_id);
  const data = {
    id:id,
    username: name,
    email: user_email,
    card_uid:card_id,
    devices: selectedDevices,
  };
  console.log(data)
  try {
    const response = await fetch(`${ENDOPONT}/users/editusers`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUsers = async (id) => {
    try {
        const response = await fetch(`${ENDOPONT}/users/deleteusers`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify({ "id": id }),
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
