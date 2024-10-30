import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";
import {fetchUsers, deleteUsers} from "../../../fetchs/FetchUsers";
import { GeneralEditModal } from "../modals/GeneralEditModal";
import { IMAGEENDPOINT } from "../../../fetchs/GeneralVariables";

const TABLE_HEAD = ["Usuario", "Serial y Permisos", "Tarjeta", "Fecha", ""];

export function MembersTable() {
  const [users, setUsers] = useState([]);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const UserData = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  useEffect(() => {
    UserData()
  }, []);

  useEffect(() => {
    UserData();
  }, [editOpenModal]);


  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditOpenModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const addRouteImage = (route) => {
    const imageRoute = `${IMAGEENDPOINT}/${route}`;
    return imageRoute;
  }

  const handleDelete = async (id) => {
    await deleteUsers(id);
    UserData();
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Lista de Usuarios
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Contiene informacion acerca de los Usuarios
            </Typography>
          </div>
          <div className="flex w-full md:w-72 self-end">
            <Input
              label="Buscar..."
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="pt-0 px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
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
            {users.map(
              (
                user,
                index
              ) => {
                const isLast = index === user.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={user.user_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={addRouteImage(user.user_img)} alt={user.user_name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user.user_name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {user.user_email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.user_serial}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {user.devices}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.card_uid}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatDate(user.user_date)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Editar Usuario">
                        <IconButton
                        onClick={() => handleEdit(user)}
                        variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Eliminar Usuario">
                        <IconButton
                        onClick={() => handleDelete(user.user_id)}
                        variant="text">
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <GeneralEditModal
      openModal={editOpenModal}
      setOpenModal={setEditOpenModal}
      onClose={() => setEditOpenModal(false)}
      currentItem={currentItem}
      currentSection={"usuarios"}
      />
    </Card>
  );
}
