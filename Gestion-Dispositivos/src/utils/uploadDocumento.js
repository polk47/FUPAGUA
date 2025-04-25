import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadDocumento = async (formData) => {
  try {
    const response = await axiosInstance.post(
      API_PATHS.DOCUMENTOS.SUBIR_DOCUMENTO,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ocurrió un error al cargar el documento!", error);
    throw error;
  }
};

export default uploadDocumento;
