import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { editUsers } from "../../../fetchs/FetchUsers";
import { FileInput } from "flowbite-react";

export function EditModalUsers({ openModal, onClose, currentItem, currentSection, onSave }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [formData, setFormData] = useState({});
  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    try {
      const response = await fetch('http://172.31.112.1:5000/api/devices');
      const devices = await response.json();
      // Inicializa cada dispositivo con isSelected como false
        const devicesWithSelection = devices.map(device => ({
        ...device,
        isSelected: false
      }));

      setDevices(devicesWithSelection); // Guardas los dispositivos en el estado
    } catch (error) {
      console.error('Error al obtener dispositivos:', error);
    }
  };

  useEffect(()=>{
    fetchDevices()
  },[])

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  useEffect(() => {
    if (currentItem) {
      setFormData(currentItem);
    }
  }, [currentItem]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const toggleDeviceSelection = (deviceId) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.device_id === deviceId ? { ...device, isSelected: !device.isSelected } : device
      )
    );
    console.log(devices)
  };

  const handleSave = async () => {

    editUsers(formData.user_id, formData.user_name, formData.user_email, formData.card_uid, devices)
    console.log(formData)
    handleOpen();
    onClose();

  }
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
            <Typography variant="h4" color="blue-gray">
              Editar Usuario
            </Typography>
            <Typography
              className="mb-1 font-normal"
              variant="paragraph"
              color="gray"
            >
              Editando los datos del usuario {formData.user_name || "Item"}
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Nombre
            </Typography>
            <Input
            id="user_name"
            label="Nombre"
            size="lg"
            value={formData.user_name || ""}
            onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Correo
            </Typography>
            <Input
            id="user_email"
            label="Correo"
            size="lg"
            value={formData.user_email || ""}
            onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Numero de Tarjeta
            </Typography>
            <Input
            id="card_uid"
            label="Tarjeta"
            size="lg"
            value={formData.card_uid || ""}
            onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Permisos
            </Typography>
            <div className="flex ">
            {devices.map(device => (
                <div key={device.device_id}>
                    <Checkbox
                    label={device.device_dep}
                    checked={device.isSelected || false}
                    onChange={() => toggleDeviceSelection(device.device_id)}
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
                    <FileInput id="image-profile" label="Imagen de Perfil" sizing="sm"/>
                </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSave} fullWidth>
              Confirmar
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
