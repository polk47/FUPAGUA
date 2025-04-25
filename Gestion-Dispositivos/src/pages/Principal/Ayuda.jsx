import React, { useContext, useState } from "react";
import PrincipalLayout from "../../components/layouts/PrincipalLayout";
import { UsuarioContext } from "../../context/UsuarioContext";

const Ayuda = () => {
  const { usuarioActual } = useContext(UsuarioContext);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const allowedRoles = [
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
  ];

  return (
    <PrincipalLayout activeMenu="Ayuda">
      <div className="p-5 flex flex-col items-center">
        <h1 className="text-2xl font-sans mb-4">Ayuda</h1>
        <p className="mb-4 text-center">
          Bienvenido a la sección de ayuda. Aquí encontrarás información útil
          para utilizar el Software.
        </p>
        <h2 className="text-xl font-light mb-2">Preguntas Frecuentes</h2>

        <div className="flex flex-wrap justify-center w-full">
          {[
            {
              question: "¿Cómo puedo subir un documento?",
              answer:
                "Para subir un documento, ve a la sección 'Documentos' y haz clic en el botón 'Subir Documento'. Asegúrate de llenar todos los campos requeridos.",
            },
            {
              question: "¿Qué tipos de documentos puedo cargar?",
              answer:
                "Puedes cargar documentos en formatos PDF, WORD, EXCEL, JPG, PNG, JPEG. Asegúrate de que el tamaño del archivo no supere los 10 MB.",
            },
            {
              question: "¿Cómo puedo Editar o Descargar un documento?",
              answer:
                "Para hacer alguna de estas acciones en un documento, dirígete a la lista de documentos, encuentra el documento donde deseas realizar la accion y haz clic en el icono correspondiente.",
            },
            {
              question: "¿Cómo hacer respaldo de los documentos?",
              answer:
                "Para hacer un respaldo de los documentos, dirígete a la sección 'Documentos' y haz clic en el botón ubicado en la esquina superior derecha 'Hacer Respaldo'.",
            },
            {
              question: "¿Cómo saber la estadística de los documentos?",
              answer:
                "Para ver la estadística detallada de los documentos dentro del sistema, revisa el panel principal donde se muestran tres gráficos distintos: uno por Tipo, otro por Clasificación y el último por Sensibilidad de los documentos. Estos gráficos proporcionan información detallada sobre la distribución y características de los documentos.",
            },
          ].map((item, index) => {
            if (!allowedRoles.includes(usuarioActual?.rol)) {
              return null;
            }
            return (
              <div key={index} className="mb-4 w-[70%] p-2">
                <div className="border border-gray-300 rounded-lg shadow-md">
                  <h3
                    className="font-medium cursor-pointer bg-gray-100 p-3 rounded-t-lg"
                    onClick={() => toggleSection(index)}
                  >
                    {item.question}
                  </h3>
                  {openIndex === index && (
                    <p className="p-3 border-t border-gray-300 bg-white rounded-b-lg">
                      {item.answer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PrincipalLayout>
  );
};

export default Ayuda;
