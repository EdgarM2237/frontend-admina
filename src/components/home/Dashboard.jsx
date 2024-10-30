import { Card, TabsBody } from "@material-tailwind/react";
import { useTheme } from "next-themes";
import { Tabs, TabsHeader, TabPanel, Tab } from "@material-tailwind/react";
import {
  UserCircleIcon,
  DeviceTabletIcon,
  UsersIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { MembersTable } from "./ui/tables/UsersTable";
import { AccessTable } from "./ui/tables/AccessTable";
import { DevicesTable } from "./ui/tables/DevicesTable";
import { RulesTable } from "./ui/tables/RulesTable";
import { AdminTable } from "./ui/tables/AdminTable";
import { HeaderPage } from "./ui/header/HeaderPage";

export default function Dashboard() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="p-4 container mx-auto">
      <HeaderPage theme={theme} setTheme={setTheme} />
      <div className="">
        <Tabs value="admin" className="m-4 ">
          <TabsHeader>
            <Tab value="admin">
              <div className="flex items-center gap-2">
                <UserCircleIcon className="w-5 h-5" />
                Administradores
              </div>
            </Tab>
            <Tab value="usuarios">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5" />
                Usuarios
              </div>
            </Tab>
            <Tab value="roles">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" />
                Roles
              </div>
            </Tab>
            <Tab value="dispositivos">
              <div className="flex items-center gap-2">
                <DeviceTabletIcon className="w-5 h-5" />
                Dispositivos
              </div>
            </Tab>
            <Tab value="accesos">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5" />
                Accesos
              </div>
            </Tab>
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            <TabPanel value="admin" className="p-4">
              <Card>
                <AdminTable />
              </Card>
            </TabPanel>
            <TabPanel value="usuarios" className="p-4">
              <Card>
                <MembersTable />
              </Card>
            </TabPanel>
            <TabPanel value="roles" className="p-4">
              <Card>
                <RulesTable />
              </Card>
            </TabPanel>
            <TabPanel value="dispositivos" className="p-4">
              <Card>
                <DevicesTable />
              </Card>
            </TabPanel>
            <TabPanel value="accesos" className="p-4">
              <Card>
                <AccessTable />
              </Card>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}
