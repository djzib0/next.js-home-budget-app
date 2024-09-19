import HomePageContent from "@/components/homePageContent/HomePageContent";
import { auth } from "@/lib/auth";

const Home = async () => {

  const session = await auth();

  return (
    <div>
      {session && <HomePageContent session={session} />}
    </div>
  );
}

export default Home;
