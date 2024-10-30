import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  IconButton,
  Tooltip, 
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchDevices } from "../../../fetchs/FetchDevices";
import { AddModalAdmin } from "../modals/AddModalAdmin";
import { GeneralEditModal } from "../modals/GeneralEditModal";

const TABLE_HEAD = ["Zona", "UID ", "Numero Serial", "Estado", "Fecha", ""];

export function DevicesTable() {
  const [devices, setDevices] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);


  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const DeviceData = async () => {
    const data = await fetchDevices();
    setDevices(data);
  };

  useEffect(() => {
    DeviceData();
  }, []);

  useEffect(() => {
    DeviceData();
  }, [isOpen])

  useEffect(() => {
    DeviceData();
  }, [editIsOpen])

  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditIsOpen(true);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Lista de Dispositivos
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Contiene informacion acerca de los dispositivos
            </Typography>
          </div>

          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Buscar..."
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="md"
            onClick={() => setIsOpen(!isOpen)}
            >
              <PlusCircleIcon strokeWidth={4} className="h-5 w-5" /> Agregar
              Dispositivo
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0">
        <table className="w-full min-w-max table-auto text-left py-6 mt-4">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index) => {
              const isLast = index === device.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={device.device_id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {device.device_name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {device.device_uid}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {device.device_serial}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={device.estado_name}
                        color={
                          device.estado_name === "Produccion"
                            ? "green"
                            : device.estado_name === "Revision"
                            ? "red"
                            : "amber"
                        }
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {formatDate(device.device_date)}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Editar Dispositivo">
                      <IconButton variant="text" onClick={() => handleEdit(device)}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Borrar Dispositivo">
                      <IconButton variant="text">
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <AddModalAdmin
        openModal={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        onSave={() => setIsOpen(!isOpen)}
        currentSection={"dispositivos"}
      />
      <GeneralEditModal
      openModal={editIsOpen}
      setOpenModal={setEditIsOpen}
      onClose={() => setEditIsOpen(false)}
      currentItem={currentItem}
      currentSection={"dispositivos"}
      />
    </Card>
  );
}
