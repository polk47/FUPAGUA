import React, { useState, useContext } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { UsuarioContext } from "../../context/UsuarioContext";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const navigate = useNavigate();
  const { usuarioActual } = useContext(UsuarioContext);

  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <h2 className="text-lg font-medium text-black flex-grow">
        Software Integral FUPAGUA
      </h2>
      {usuarioActual && usuarioActual.rol === "admin" && (
        <button
          className="text-sm font-medium text-white bg-primary shadow-lg shadow-red-600/5 px-3 py-1 rounded-md ml-4 hover:bg-white border hover:text-primary cursor-pointer"
          onClick={() => navigate("/registro")}
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-1" />
          Crear Cuenta
        </button>
      )}
      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
