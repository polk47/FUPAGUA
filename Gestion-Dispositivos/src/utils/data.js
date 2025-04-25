import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import {
  MdWarning,
  MdDevices,
  MdHelp,
  MdSettings,
  MdPerson,
} from "react-icons/md";
import { GiPaperPlane } from "react-icons/gi";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Principal",
    icon: LuLayoutDashboard,
    path: "/principal",
  },
  {
    id: "02",
    label: "Documentos",
    icon: GiPaperPlane,
    path: "/documentos",
  },
  {
    id: "03",
    label: "Monitoreo",
    icon: MdWarning,
    path: "/monitoreo",
  },
  {
    id: "04",
    label: "Dispositivos",
    icon: MdDevices,
    path: "/dispositivos",
  },
  {
    id: "05",
    label: "Ayuda",
    icon: MdHelp,
    path: "/ayuda",
  },
  {
    id: "06",
    label: "Configuracion",
    icon: MdSettings,
    path: "/configuracion",
  },
  {
    id: "07",
    label: "Personal",
    icon: MdPerson,
    path: "/personal",
  },
  {
    id: "08",
    label: "Cerrar Sesion",
    icon: LuLogOut,
    path: "logout",
  },
];
