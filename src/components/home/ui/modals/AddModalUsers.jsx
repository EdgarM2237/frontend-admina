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

export function AddModalUsers({ openModal, onClose, currentItem, currentSection, onSave }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [formData, setFormData] = useState({});

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
            <Input
            id="devices"
            label="Permisos"
            size="lg"
            value={formData.devices || ""}
            onChange={handleChange}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Confirmar
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
