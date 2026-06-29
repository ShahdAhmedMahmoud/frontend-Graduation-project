import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import ProfileUI from '@/app/_component/ProfileTabs/ProfileTabs';

export default async function Profile() {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  if (!session) return <div>Not Authenticated</div>;

  const res = await fetch("http://localhost:5000/api/students/me", {
    headers: {
      Authorization: `Bearer ${session.token}`
    },
    cache: "no-store"
  });

  const data = await res.json();
  console.log("API DATA:", data);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <ProfileUI user={data.data} />
    </div>
  );
}
