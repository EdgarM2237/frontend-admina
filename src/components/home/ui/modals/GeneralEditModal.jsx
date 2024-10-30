import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  Option,
  CardBody,
  Typography,
  Input,
  Checkbox,
  Select,
} from "@material-tailwind/react";
import { FileInput } from "flowbite-react";
import { ENDOPONT, IMAGEENDPOINT } from "../../../fetchs/GeneralVariables";

export function GeneralEditModal({
  openModal,
  onClose,
  currentItem,
  currentSection,

}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [formData, setFormData] = useState({devices:[]});
  const [devices, setDevices] = useState([]);
  const [roles, setRoles] = useState([]);
  const [deviceMode, setDeviceMode] = useState([]);
  const [selectedDeviceIds, setSelectedDeviceIds] = useState([]);
  const [image, setImage] = useState(null);

  const fetchDevices = async () => {
    try {
      const response = await fetch(`${ENDOPONT}/devices`);
      const devices = await response.json();
      // Inicializa cada dispositivo con isSelected como false
      const devicesWithSelection = devices.map((device) => ({
        ...device,
        isSelected: false,
      }));

      setDevices(devicesWithSelection); // Guardas los dispositivos en el estado
    } catch (error) {
      console.error("Error al obtener dispositivos:", error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${ENDOPONT}/roles`);
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchDeviceMode = async () => {
    try {
        const response = await fetch(`${ENDOPONT}/devices/devicemode`);
        const data = await response.json();
        setDeviceMode(data);
    } catch (err) {
        console.log(err)
    }
  }

  useEffect(() => {
    fetchDeviceMode();
  }, []);

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  useEffect(() => {
    if (currentItem) {
      setFormData(currentItem);
    }
  }, [currentItem]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSelectChange = (value, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const toggleDeviceSelection = (deviceId) => {
    setSelectedDeviceIds((prevSelectedDeviceIds) => {
      if (prevSelectedDeviceIds.includes(deviceId)) {
        return prevSelectedDeviceIds.filter((id) => id !== deviceId);
      } else {
        return [...prevSelectedDeviceIds, deviceId];
      }
    });
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      devices: selectedDeviceIds,
    }));
  }, [selectedDeviceIds]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let endpoint = "";

    switch (currentSection) {
      case "roles":
        endpoint = `${ENDOPONT}/roles/editroles`;
        break;
      case "administradores":
        endpoint = `${ENDOPONT}/admin/editadmin`;
        break;
      case "dispositivos":
        endpoint = `${ENDOPONT}/devices/editdevice`;
        break;
      case "usuarios":
        endpoint = `${ENDOPONT}/users/editusers`;
        break;
      default:
        console.error("Invalid section");
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      handleOpen();
      onClose();
      if(currentSection === "usuarios"){
        const id = formData.user_id;
        if (!image) {
            console.log("No se seleccionó ninguna imagen");
            return;
        }
        const imageFile = new FormData();
        imageFile.append("profilePic", image);
        console.log(imageFile);
        try {
            const response = await fetch(`${IMAGEENDPOINT}/upload/${id}`, {
              method: "PUT",
              body: imageFile,
            });

            if (response.ok) {
              console.log("Image uploaded successfully");
            } else {
              console.error("Failed to upload image");
            }
          } catch (error) {
            console.error("Error uploading image:", error);
          }
      }
      if(currentSection === "administradores"){
        const id = formData.user_id;
        if (!image) {
            console.log("No se seleccionó ninguna imagen");
            return;
        }
        const imageFile = new FormData();
        imageFile.append("profilePic", image);
        console.log(imageFile);
        try {
            const response = await fetch(`${IMAGEENDPOINT}/upload/${id}`, {
              method: "PUT",
              body: imageFile,
            });

            if (response.ok) {
              console.log("Image uploaded successfully");
            } else {
              console.error("Failed to upload image");
            }
          } catch (error) {
            console.error("Error uploading image:", error);
          }
      }
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={onClose}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {currentSection === "usuarios" && (
                <>
                  <Typography variant="h4" color="blue-gray">
                    Editar Usuario
                  </Typography>
                  <Typography
                    className="mb-1 font-normal"
                    variant="paragraph"
                    color="gray"
                  >
                    Editando los datos del usuario{" "}
                    {formData.user_name || "Item"}
                  </Typography>
                  <Typography className="-mb-2" variant="h6">
                    Nombre
                  </Typography>
                  <Input
                    id="user_name"
                    label="Nombre"
                    size="lg"
                    required
                    value={formData.user_name || ""}
                    onChange={handleInputChange}
                  />
                  <Typography className="-mb-2" variant="h6">
                    Correo
                  </Typography>
                  <Input
                    id="user_email"
                    label="Correo"
                    size="lg"
                    required
                    value={formData.user_email || ""}
                    onChange={handleInputChange}
                  />
                  <Typography className="-mb-2" variant="h6">
                    Numero de Tarjeta
                  </Typography>
                  <Input
                    id="card_uid"
                    label="Tarjeta"
                    size="lg"
                    required
                    value={formData.card_uid || ""}
                    onChange={handleInputChange}
                  />
                  <Typography className="-mb-2" variant="h6">
                    Permisos
                  </Typography>
                  <div className="flex ">
                    {devices.map((device) => (
                      <div key={device.device_id}>
                        <Checkbox
                          label={device.device_name}
                          checked={selectedDeviceIds.includes(device.device_id)}
                          onChange={() =>
                            toggleDeviceSelection(device.device_id)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div>
                      <Typography className="mb-2" variant="h6">
                        Imagen de Perfil
                      </Typography>
                    </div>
                    <div>
                      <FileInput
                        id="image-profile"
                        accept="image/*"
                        label="Imagen de Perfil"
                        sizing="sm"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </>
              )}
              {currentSection === "administradores" && (
                <>
                  <Typography className="-mb-2" variant="h6">
                    Nombre
                  </Typography>
                  <Input
                    id="admin_name"
                    label="Nombre"
                    size="lg"
                    required
                    value={formData.admin_name || ""}
                    onChange={handleInputChange}
                  />
                  <Typography className="-mb-2" variant="h6">
                    Correo
                  </Typography>
                  <Input
                    id="admin_email"
                    label="Correo"
                    size="lg"
                    type="email"
                    required
                    value={formData.admin_email || ""}
                    onChange={handleInputChange}
                  />
                  <Typography className="-mb-2" variant="h6">
                    Rol
                  </Typography>
                  <Select
                    label="Seleccione el rol"
                    aria-required
                    onChange={(value) => handleSelectChange(value, "rol_id")}
                  >
                    {roles.map((role) => (
                      <Option key={role.rol_id} value={role.rol_id.toString()}>
                        {role.nombre_rol}
                      </Option>
                    ))}
                  </Select>
                </>
              )}
              {currentSection === "roles" && (
                <>
                  <Typography className="-mb-2" variant="h6">
                    Nombre
                  </Typography>
                  <Input
                    id="nombre_rol"
                    label="Nombre"
                    size="lg"
                    required
                    value={formData.nombre_rol || ""}
                    onChange={handleInputChange}
                  />
                  <Typography className="-mb-2" variant="h6">
                    Descripción
                  </Typography>
                  <Input
                    id="description_rol"
                    label="Descripción"
                    size="lg"
                    required
                    value={formData.description_rol || ""}
                    onChange={handleInputChange}
                  />
                </>
              )}
              {currentSection === "dispositivos" && (
                <>
                  <Typography className="-mb-2" variant="h6">
                    Nombre
                  </Typography>
                  <Input
                    id="device_name"
                    label="Nombre"
                    size="lg"
                    required
                    value={formData.device_name || ""}
                    onChange={handleInputChange}
                  />
                  <Typography className="-mb-2" variant="h6">
                    Descripción
                  </Typography>
                  <Input
                    id="device_uid"
                    label="Descripción"
                    size="lg"
                    required
                    type="number"
                    value={formData.device_uid || ""}
                    onChange={handleInputChange}
                  />
                  <Typography className="-mb-2" variant="h6">
                    Rol
                  </Typography>
                  <Select
                    label="Seleccione el modo"
                    aria-required
                    onChange={(value) => handleSelectChange(value, "device_mode")}
                  >
                    {deviceMode.map((mode) => (
                      <Option key={mode.estado_id} value={mode.estado_id.toString()}>
                        {mode.estado_name}
                      </Option>
                    ))}
                  </Select>
                </>
              )}
              <Button variant="gradient" type="submit" fullWidth>
                Confirmar
              </Button>
            </form>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
