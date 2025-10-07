import Header from "@/components/Header/index.jsx";
import ActivityClient from "./ActivityClient.jsx";

export default function ActivityPage({ params }) {
  // Server Component recebe params do Next.js
  const activityId = params.id;

  return(
    <div style={{ padding: '20px' }}>
      <Header buttonText = "Voltar" buttonHref = "/aluno" />
      <ActivityClient activityId={activityId} />
    </div>
  ) 
}