import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { ENDOPONT, IMAGEENDPOINT } from "../../../fetchs/GeneralVariables";

const TABS = [
  {
    label: "Todos",
    value: "todos",
  },
  {
    label: "Permitidos",
    value: "permitidos",
  },
  {
    label: "Denegados",
    value: "denegados",
  },
];

const TABLE_HEAD = ["Usuario", "Serial y Zona", "Tarjeta", "Estado", "Fecha", ""];

export function AccessTable() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("todos");

  const ITEMS_PER_PAGE = 10;

  const fetchData = async () => {
    try {
      const response = await fetch(`${ENDOPONT}/user_logs`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLogs(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const addRouteImage = (route) => {
    return `${IMAGEENDPOINT}/${route}`;
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.device_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(log.user_serial).toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(log.card_uid).toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === "todos" ||
      (activeTab === "permitidos" && log.estado === "Permitido") ||
      (activeTab === "denegados" && log.estado === "Denegado");

    return matchesSearch && matchesTab;
  });

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Historial de acceso de usuarios
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Contiene todos los accesos de los usuarios a los areas
              especificadas y su estado.
            </Typography>
          </div>
          <div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Descargar
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={activeTab} className="w-full md:w-max">
            <TabsHeader className="w-96">
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value} onClick={() => handleTabChange(value)}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Buscar..."
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0">
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
            {paginatedLogs.map((log, index) => {
              const isLast = index === paginatedLogs.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={log.log_id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={addRouteImage(log.user_img)} alt={log.user_name} size="sm" />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {log.user_name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {log.user_email}
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
                        {log.device_name}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {log.user_serial}
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
                        {log.card_uid}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={log.estado === "Permitido" ? "Permitido" : "Denegado"}
                        color={log.estado === "Permitido" ? "green" : "red"}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatDate(log.user_date)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit User">
                      <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete User">
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
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Página {currentPage} de {Math.max(1, Math.ceil(filteredLogs.length / ITEMS_PER_PAGE))}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredLogs.length / ITEMS_PER_PAGE)}
          >
            Siguiente
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
