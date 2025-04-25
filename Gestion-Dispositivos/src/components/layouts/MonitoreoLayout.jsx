import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const MonitoreoLayout = () => {
  const notificationCount = 5;
  const eventHistory = [
    {
      id: 1,
      date: "2025-04-01",
      time: "08:30",
      description: "Dispositivo A conectado.",
      alertType: "Conexión",
      state: "Exitoso",
      actions: ["Ver detalles", "Ignorar"],
    },
    {
      id: 2,
      date: "2025-04-02",
      time: "09:15",
      description: "Dispositivo B desconectado.",
      alertType: "Desconexión",
      state: "Advertencia",
      actions: ["Reintentar", "Ver detalles"],
    },
    {
      id: 3,
      date: "2025-04-03",
      time: "10:00",
      description: "Alerta de seguridad activada.",
      alertType: "Seguridad",
      state: "Crítico",
      actions: ["Investigar", "Resolver"],
    },
    {
      id: 4,
      date: "2025-04-04",
      time: "11:45",
      description: "Dispositivo C actualizado.",
      alertType: "Actualización",
      state: "Exitoso",
      actions: ["Ver detalles"],
    },
    {
      id: 5,
      date: "2025-04-05",
      time: "12:30",
      description: "Fallo en la conexión del dispositivo D.",
      alertType: "Error de conexión",
      state: "Error",
      actions: ["Reiniciar", "Ver detalles"],
    },
  ];

  return (
    <div className="relative p-4">
      <div className="absolute top-5 right-5 flex items-center">
        <FontAwesomeIcon
          icon={faBell}
          className="text-2xl text-primary cursor-pointer transition-transform transform hover:scale-125 hover:translate-y-1"
        />
        {notificationCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-primary border text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {notificationCount}
          </span>
        )}
      </div>
      <h1 className="text-center text-2xl font-bold mb-4">
        Monitoreo de Dispositivos IoT
      </h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-sans text-lg mb-2">Historial de Eventos</h2>
        <table className="min-w-full text-center">
          <thead>
            <tr className="bg-slate-100 text-sm">
              <th className="p-2 text-center">Fecha</th>
              <th className="p-2 text-center">Hora</th>
              <th className="p-2 text-center">Descripción</th>
              <th className="p-2 text-center">Tipo de Alerta</th>
              <th className="p-2 text-center">Estado</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventHistory.map((event) => (
              <tr key={event.id} className="border-b text-sm">
                <td className="p-2 ">{event.date}</td>
                <td className="p-2 ">{event.time}</td>
                <td className="p-2 ">{event.description}</td>
                <td className="p-2 ">{event.alertType}</td>
                <td
                  className={`px-5 py-2 text-white font-light rounded-full ${
                    event.state === "Crítico"
                      ? "bg-red-500"
                      : event.state === "Advertencia"
                      ? "bg-yellow-500"
                      : event.state === "Error"
                      ? "bg-red-600"
                      : "bg-green-500"
                  }`}
                >
                  {event.state}
                </td>
                <td className="p-2">
                  {event.actions.map((action) => (
                    <button
                      key={action}
                      className="mr-2 text-blue-500 hover:underline"
                    >
                      {action}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonitoreoLayout;
