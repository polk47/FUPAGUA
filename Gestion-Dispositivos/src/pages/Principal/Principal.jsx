import React, { useState, useEffect, useContext } from "react";
import { DateTime } from "luxon";
import PrincipalLayout from "../../components/layouts/PrincipalLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UsuarioContext } from "../../context/UsuarioContext";
import { Bar } from "react-chartjs-2";
import * as XLSX from "xlsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Principal = () => {
  useUserAuth();
  const navigate = useNavigate();
  const { usuario } = useContext(UsuarioContext);
  const { usuarioActual } = useContext(UsuarioContext);
  const [principalData, setPrincipalData] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  const fetchPrincipalData = async () => {
    if (cargando) return;

    setCargando(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.PRINCIPAL.GET_DATA}`
      );

      if (response.data) {
        setPrincipalData(response.data);
      }
    } catch (error) {
      console.log("Algo salió mal. Intente de nuevo!", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchPrincipalData();
    const mensaje = localStorage.getItem("mensajeExito");
    if (mensaje) {
      setMensajeExito(mensaje);
      localStorage.removeItem("mensajeExito");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, []);

  const horaActual = DateTime.now()
    .setLocale("es")
    .toFormat("cccc, dd LLLL yyyy, hh:mm a");
  const capitalizeFirstLetter = (string) => {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const generarExcel = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.DOCUMENTOS.OBTENER_HISTORIAL_ACCESO
      );

      const historialAcceso = response.data.map((item) => ({
        Usuario: capitalizeFirstLetter(item.usuario.nombre),
        Cargo: capitalizeFirstLetter(item.usuario.rol),
        Nombre_Documento: item.documento
          ? capitalizeFirstLetter(item.documento.nombreArchivo)
          : "Documento Eliminado",
        Tipo_Documento: item.documento
          ? capitalizeFirstLetter(item.documento.tipo)
          : "Documento Eliminado",
        Acción: capitalizeFirstLetter(item.accion),
        Fecha: capitalizeFirstLetter(
          DateTime.fromISO(item.fecha).isValid
            ? DateTime.fromISO(item.fecha)
                .setLocale("es")
                .toFormat("cccc, dd LLLL yyyy")
            : "Fecha inválida"
        ),
      }));

      const worksheet = XLSX.utils.json_to_sheet(historialAcceso);

      const columnWidths = [
        { wch: 30 },
        { wch: 30 },
        { wch: 30 },
        { wch: 30 },
        { wch: 15 },
        { wch: 30 },
      ];
      worksheet["!cols"] = columnWidths;

      for (let cell in worksheet) {
        if (cell[0] === "!") continue;
        worksheet[cell].s = {
          font: {
            bold: true,
          },
        };
      }

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Historial de Acceso");

      const fechaReporte = DateTime.now()
        .setLocale("es")
        .toFormat("yyyy-MM-dd");
      const nombreArchivo = `Historial_Acceso_Documentos_${fechaReporte}.xlsx`;

      XLSX.writeFile(workbook, nombreArchivo);
    } catch (error) {
      console.error("Error al generar el archivo Excel:", error);
    }
  };

  const clasificacionData = {
    labels: Object.keys(principalData?.clasificaciones || {}),
    datasets: [
      {
        label: "Clasificación",
        data: Object.values(principalData?.clasificaciones || {}),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const tipoData = {
    labels: Object.keys(principalData?.tipos || {}),
    datasets: [
      {
        label: "Tipo",
        data: Object.values(principalData?.tipos || {}),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const sensibilidadData = {
    labels: Object.keys(principalData?.sensibilidades || {}),
    datasets: [
      {
        label: "Sensibilidad",
        data: Object.values(principalData?.sensibilidades || {}),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const puedeVerGraficos =
    usuarioActual &&
    [
      "admin",
      "terapiaOcupacional",
      "fisioterapia",
      "psicologia",
      "psicopedagogía",
      "fonoaudiología",
      "aulaIntegral",
      "cultura",
      "nivelación",
      "directora",
    ].includes(usuarioActual.rol);

  return (
    <PrincipalLayout activeMenu="Principal">
      <div className="flex justify-between items-center my-5 mx-auto">
        {usuarioActual && (
          <div className="text-lg capitalize text-slate-600 font-medium mr-4">
            ¡Buen Día! {usuario.nombre}
            <div className="text-sm text-slate-500 capitalize">
              {horaActual}
            </div>
          </div>
        )}
        {usuarioActual &&
          (usuarioActual.rol === "admin" ||
            usuarioActual.rol === "directora") && (
            <div className="">
              <button
                className="text-sm font-medium text-green-500 bg-white shadow-lg shadow-green-600/5 p-[10px] rounded-md my-1 ml-2 border hover:text-white hover:bg-green-400 cursor-pointer"
                onClick={generarExcel}
              >
                <FontAwesomeIcon icon={faFileExcel} className="mr-1 " />
                Historial de Acceso
              </button>
            </div>
          )}
      </div>

      {mensajeExito && (
        <div className="text-green-500 text-sm mb-4">{mensajeExito}</div>
      )}

      {principalData && puedeVerGraficos && (
        <div>
          <h1 className="text-center text-lg font-semibold text-slate-600 mb-10">
            Documentos
          </h1>
          <div className="flex justify-around">
            <div
              className="w-1/3"
              style={{ maxWidth: "300px", height: "300px" }}
            >
              <h2 className="text-lg mb-4 font-medium">Por Clasificación</h2>
              <Bar
                data={clasificacionData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
            <div
              className="w-1/3"
              style={{ maxWidth: "300px", height: "300px" }}
            >
              <h2 className="text-lg font-medium mb-4">Por Tipo</h2>
              <Bar
                data={tipoData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
            <div
              className="w-1/3"
              style={{ maxWidth: "300px", height: "300px" }}
            >
              <h2 className="text-lg font-medium mb-4">Por Sensibilidad</h2>
              <Bar
                data={sensibilidadData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      )}
    </PrincipalLayout>
  );
};

export default Principal;
