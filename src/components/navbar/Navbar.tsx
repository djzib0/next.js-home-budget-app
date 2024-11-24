import MenuContainer from "./menuContainer/MenuContainer";
//styles import
import { auth } from "@/lib/auth";


const Navbar = async () => {

  const session = await auth();
  
  return (
    <>
      {session?.user && 
        <MenuContainer
          session={session}
          />
      }
    </>
  )
}

export default Navbar