import { useEffect } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import axios from "axios";
import "../styles/components/widgets-card.css";
import { API_BASE_URL } from "../services/api";

interface SupersetEmbedProps {
  dashboardId: string;
}

export default function SupersetEmbed({ dashboardId }: SupersetEmbedProps) {
  useEffect(() => {
    async function getGuestToken() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/superset-token/${dashboardId}`
        );
        const token = response.data.token;

        const mountPoint = document.getElementById("superset-container");
        if (!mountPoint) return;

        await embedDashboard({
          id: dashboardId,
          supersetDomain: "https://beanflow-superset-production.up.railway.app",
          mountPoint,
          fetchGuestToken: () => token,
          dashboardUiConfig: {
            hideTitle: true,
            hideChartControls: true,
            hideTab: true,
            hideNavigation: true,
            filters: {
              expanded: false,
              visible: false,
            },
          } as any,
        }).then(() => {
          const iframe = mountPoint.querySelector("iframe");
          if (iframe) {
            iframe.style.width = "100%";
            iframe.style.height = mountPoint.offsetHeight + "px";
            iframe.style.border = "none";
          }
        });
      } catch (error: any) {
        console.error("Erro ao gerar token:", error.response?.data || error.message);
      }
    }

    getGuestToken();
  }, [dashboardId]);

  return (
    <div className="widget-embed" id="superset-container" />
  );
}