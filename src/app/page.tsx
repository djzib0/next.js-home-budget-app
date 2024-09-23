import HomePageContent from "@/components/homePageContent/HomePageContent";
import { auth } from "@/lib/auth";
import { getAllBudgetsByUserId, getCurrentBudget, getLatestBudget } from "@/lib/actions";
import { findLatestBudgetName, getExpectedCurrentBudgetName } from "@/lib/utils";


const HomePage = async () => {

  const session = await auth();

  const budgets = session && await getAllBudgetsByUserId(session?.user?.id ? session?.user.id : "")
  const currentBudget = session && await getCurrentBudget(session?.user?.id ? session.user.id : "", getExpectedCurrentBudgetName())
  const latestBudget = await getLatestBudget(session?.user?.id ? session.user.id : "", findLatestBudgetName(budgets))

  return (
    <div>
      {session && <HomePageContent currentBudget={currentBudget} latestBudget={latestBudget} />}
    </div>
  );
}

export default HomePage;
