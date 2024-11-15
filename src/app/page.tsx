import HomePageContent from "@/components/homePageContent/HomePageContent";
import { auth } from "@/lib/auth";
import { getCurrentBudget, getUser, getUserNameById } from "@/lib/actions";
import { getExpectedCurrentBudgetName } from "@/lib/utils";

const HomePage = async () => {

  const session = await auth();

  const currentBudget = session && await getCurrentBudget(session?.user?.id ? session.user.id : "", getExpectedCurrentBudgetName())
  console.log(session)
  const userName = " test"
  return (
    <div>
      {session && <HomePageContent currentBudget={currentBudget} userName={userName ? userName: " kj"} />}
    </div>
  );
}

export default HomePage;
