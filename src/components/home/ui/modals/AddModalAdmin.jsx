import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
  Select,
  Option,
  alert,
} from "@material-tailwind/react";
import { ENDOPONT } from "../../../fetchs/GeneralVariables";

export function AddModalAdmin({
  openModal,
  onClose,
  currentItem,
  currentSection,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [formData, setFormData] = useState({
    date: new Date().toISOString(),
  });
  const [roles, setRoles] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.admin_pwd !== formData.admin_pwd_confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    let endpoint = "";

    switch (currentSection) {
      case "roles":
        endpoint = `${ENDOPONT}/roles/addroles`;
        break;
      case "administradores":
        endpoint = `${ENDOPONT}/admin/addadmin`;
        break;
      case "dispositivos":
        endpoint = `${ENDOPONT}/devices/adddevice`;
        break;
      default:
        console.error("Invalid section");
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
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
              {currentSection === "administradores" && (
                <>
                  <Typography variant="h4" color="blue-gray">
                    Editar Usuario
                  </Typography>
                  <Typography
                    className="mb-1 font-normal"
                    variant="paragraph"
                    color="gray"
                  >
                    Agregar Administrador
                  </Typography>
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
                    required
                    type="email"
                    value={formData.admin_email || ""}
                    onChange={handleInputChange}
                  />
                  <Typography className="-mb-2" variant="h6">
                    Rol
                  </Typography>
                  <Select
                    label="Seleccione el rol"
                    onChange={(value) => handleSelectChange(value, "rol_id")}
                  >
                    {roles.map((role) => (
                      <Option key={role.rol_id} value={role.rol_id.toString()}>
                        {role.nombre_rol}
                      </Option>
                    ))}
                  </Select>
                  <Typography className="-mb-2" variant="h6">
                    Contraseña
                  </Typography>
                  <Input
                    id="admin_pwd"
                    label="Contraseña"
                    size="lg"
                    required
                    type="password"
                    value={formData.admin_pwd || ""}
                    onChange={handleInputChange}
                  />
                  <Typography className="-mb-2" variant="h6">
                    Confirmar Contraseña
                  </Typography>
                  <Input
                    id="admin_pwd_confirm"
                    label="Confirmar Contraseña"
                    size="lg"
                    required
                    type="password"
                    value={formData.admin_pwd_confirm || ""}
                    onChange={handleInputChange}
                  />
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
                  Departamento
                </Typography>
                <Input
                  id="device_dep"
                  label="Departamento"
                  size="lg"
                  required
                  value={formData.device_dep || ""}
                  onChange={handleInputChange}
                />
                <Typography className="-mb-2" variant="h6">
                  Numero UID
                </Typography>
                <Input
                  id="device_uid"
                  label="UID"
                  size="lg"
                  required
                  type="number"
                  value={formData.device_uid || ""}
                  onChange={handleInputChange}
                />
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
