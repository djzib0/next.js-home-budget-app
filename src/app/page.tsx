import HomePageContent from "@/components/homePageContent/HomePageContent";
import { getBudget } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { BudgetType } from "@/lib/types";
import { getExpectedCurrentBudgetName } from "@/lib/utils";

const Home = async () => {

  const session = await auth();

  const currentBudget = getBudget(getExpectedCurrentBudgetName())
  console.log(currentBudget, " current budget")

  return (
    <div>
      {session && <HomePageContent session={session} currentBudget={currentBudget} />}
    </div>
  );
}

export default Home;
