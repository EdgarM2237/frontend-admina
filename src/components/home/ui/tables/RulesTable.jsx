import {
  PencilIcon,
  PlusCircleIcon,
  ShieldExclamationIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { fetchRoles } from "../../../fetchs/FetchRoles";
import { useState, useEffect } from "react";
import { AddModalAdmin } from "../modals/AddModalAdmin";
import { GeneralEditModal } from "../modals/GeneralEditModal";

const TABLE_HEAD = ["Rol", "Descripción ", "Fecha", ""];

const TABLE_ROWS = [
  {
    name: "Spotify",
    amount: "$2,500",
    expiry: "06/2026",
  },
  {
    name: "Amazon",
    amount: "$5,000",
    expiry: "06/2026",
  },
  {
    name: "Pinterest",
    amount: "$3,400",
    expiry: "06/2026",
  },
  {
    name: "Google",
    amount: "$1,000",
    expiry: "06/2026",
  },
  {
    name: "netflix",
    amount: "$14,000",
    expiry: "06/2026",
  },
];

export function RulesTable() {
  const [roles, setRoles] = useState([]);
  const [addOpenModal, setAddOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const RoleData = async () => {
    const data = await fetchRoles();
    setRoles(data);
  };

  useEffect(() => {
    RoleData();
  }, []);

  useEffect(() => {
    RoleData();
  }, [addOpenModal]);

  useEffect(() => {
    RoleData();
  }, [editOpenModal]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditOpenModal(true);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Administrador de roles
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Gestiona los roles de los Administradores
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Buscar..."
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button
              className="flex items-center gap-3"
              size="md"
              onClick={() => {
                setAddOpenModal(true);
              }}
            >
              <PlusCircleIcon strokeWidth={4} className="h-5 w-5" /> Agregar Rol
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0">
        <table className="w-full min-w-max table-auto text-left">
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
            {roles.map((rol, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={rol.rol_id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {rol.nombre_rol}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {rol.description_rol}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {formatDate(rol.date)}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Editar Rol">
                      <IconButton
                        variant="text"
                        onClick={() => {
                          handleEdit(rol);
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Borrar Rol">
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
        openModal={addOpenModal}
        onClose={() => setAddOpenModal(false)}
        onSave={() => setAddOpenModal(false)}
        currentSection={"roles"}
      />
      <GeneralEditModal
        openModal={editOpenModal}
        setOpenModal={setEditOpenModal}
        onClose={() => setEditOpenModal(false)}
        currentItem={currentItem}
        currentSection={"roles"}
      />
    </Card>
  );
}
