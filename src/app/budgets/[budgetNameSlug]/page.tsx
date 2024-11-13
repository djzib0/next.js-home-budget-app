import BudgetDetails from '@/components/budgetDetails/BudgetDetails'
import { getCurrentBudget } from '@/lib/actions';
import { auth } from '@/lib/auth';

const BudgetPage = async ({params}: {params: Promise<{budgetNameSlug: string}>}) => {

  const {budgetNameSlug} = await params;

  const session = await auth();
  const budget = session && await getCurrentBudget(session.user?.id ? session.user.id : "", budgetNameSlug) 

  return (
    <div>
        {session?.user?.id && 
          <BudgetDetails budget={budget && budget} userId={session.user?.id} />
        }
    </div>
  )
}

export default BudgetPage