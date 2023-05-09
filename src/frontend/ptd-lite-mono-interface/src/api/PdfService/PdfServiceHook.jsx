import { useAuth0 } from "@auth0/auth0-react";
import { getAuthConfig } from "../token";
import axiosInstance from "../axios";


const usePdfService = () => {
    const { getAccessTokenSilently } = useAuth0();

    const generatePdf = async (user, pdfRequest, onUploadProgress) => {
        const config = await getAuthConfig(getAccessTokenSilently);
        return axiosInstance.post("/pdf/generate", pdfRequest, {
            headers: {
                'Authorization': config.headers.Authorization
            },
            params: { username: user },
            responseType: "blob",
            onUploadProgress,
        });
    }

    return { generatePdf };
}
export default usePdfService;