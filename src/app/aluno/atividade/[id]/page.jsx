import ActivityClient from "./ActivityClient.jsx";

export default function ActivityPage({ params }) {
  // Server Component recebe params do Next.js
  const activityId = params.id;

  return <ActivityClient activityId={activityId} />;
}