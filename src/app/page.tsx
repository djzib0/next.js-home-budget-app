import HomePageContent from "@/components/homePageContent/HomePageContent";
import { auth } from "@/lib/auth";
import { getCurrentBudget } from "@/lib/actions";
import { getExpectedCurrentBudgetName } from "@/lib/utils";


const HomePage = async () => {

  const session = await auth();

  const currentBudget = session && await getCurrentBudget(session?.user?.id ? session.user.id : "", getExpectedCurrentBudgetName())

  return (
    <div>
      {session && <HomePageContent currentBudget={currentBudget} />}
    </div>
  );
}

export default HomePage;
