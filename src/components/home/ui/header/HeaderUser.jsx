import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  ChevronUpIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  MoonIcon,
  PowerIcon,
  SunIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";


export function UserAvatarMenu({ theme, setTheme, image }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const navigate = useNavigate()
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }



  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            withBorder={true}
            color="blue-gray"
            className=" p-0.5"
            src={image}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem
          className="flex items-center gap-2 rounded"
          onClick={closeMenu}
        >
          <UserCircleIcon className="h-4 w-4" strokeWidth="2" />
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="inherit"
          >
            Mi Perfil
          </Typography>
        </MenuItem>
        <Menu
          placement="right-start"
          open={openMenu}
          handler={setOpenMenu}
          allowHover
          offset={15}
        >
          <MenuHandler className="flex items-center justify-between">
            <MenuItem>
              <Cog6ToothIcon className="h-4 w-4" strokeWidth="2" />
              Configuración
              <ChevronUpIcon
                strokeWidth={2.5}
                className={`h-3.5 w-3.5 transition-transform ${
                  openMenu ? "rotate-90" : ""
                }`}
              />
            </MenuItem>
          </MenuHandler>
          <MenuList>
            <MenuItem
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex items-center gap-2 rounded"
            >
              {React.createElement(theme === "dark" ? MoonIcon : SunIcon, {
                className: "h-4 w-4",
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="inherit"
              >Cambiar Tema</Typography>
            </MenuItem>
          </MenuList>
        </Menu>
        <MenuItem
          className="flex items-center gap-2 rounded"
          onClick={closeMenu}
        >
          <LifebuoyIcon className="h-4 w-4" strokeWidth="2" />
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="inherit"
          >
            Ayuda
          </Typography>
        </MenuItem>
        <MenuItem
          className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
          onClick={() => handleLogout()}
        >
          <PowerIcon className="h-4 w-4 text-red-500" strokeWidth="2" />
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="red"
          >
            Cerrar Sesión
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
