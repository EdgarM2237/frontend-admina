import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { deleteAdmin, fetchAdmin } from "../../../fetchs/FetchAdmin";
import { AddModalAdmin } from "../modals/AddModalAdmin";
import { GeneralEditModal } from "../modals/GeneralEditModal";
import { IMAGEENDPOINT } from "../../../fetchs/GeneralVariables";

const TABLE_HEAD = ["Usuario", "Rol", "Fecha", ""];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
    card_uid: "11111",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
    card_uid: "11111",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
    card_uid: "11111",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
    card_uid: "11111",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
    card_uid: "11111",
  },
];

export function AdminTable() {
  const [users, setUsers] = useState([]);
  const [addOpenModal, setAddOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);


  const adminFetch = async () => {
    const data = await fetchAdmin();
    setUsers(data);
  };

  useEffect(() => {
    adminFetch();
  }, []);

  useEffect(() => {
    adminFetch();
  }, [addOpenModal]);

  useEffect(() => {
    adminFetch();
  }, [editOpenModal]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (id) => {
    try {
        await deleteAdmin(id)
        adminFetch()
    } catch (error) {
      console.log(error);
    }
  }

  const addRouteImage = (route) => {
    const imageRoute = `${IMAGEENDPOINT}/${route}`;
    return imageRoute;
  }

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
              Lista de Administradores
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Contiene informacion acerca de los Administradores
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
              onClick={() => setAddOpenModal(true)}
              className="flex items-center gap-3"
              size="md"
            >
              <UserPlusIcon strokeWidth={2} className="h-5 w-5" /> Agregar
              Administrador
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className=" px-0">
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
            {users.map((user, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={user.admin_id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={addRouteImage(user.admin_img)}
                        alt={user.admin_name}
                        size="sm"
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.admin_name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {user.admin_email}
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
                        {user.nombre_rol}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatDate(user.admin_date)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Editar Admin">
                      <IconButton variant="text" onClick={() => handleEdit(user)}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Borrar Admin">
                      <IconButton variant="text" onClick={() => handleDelete(user.admin_id)}>
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
        onSave={() => {
          setAddOpenModal(false);
        }}
        currentSection={"administradores"}
      />
      <GeneralEditModal
        openModal={editOpenModal}
        onClose={() => setEditOpenModal(false)}
        onSave={() => {
          setEditOpenModal(false);
        }}
        currentItem={currentItem}
        currentSection={"administradores"}
      />
    </Card>
  );
}
