export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    // session: {
    //   maxAge: 5,
    // },
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;
            }
            return token
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
            }
            return session
        },
        authorized({ auth, request }) {
            
        const user = auth?.user;
            
        const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
        const isOnBudgetsPage = request.nextUrl?.pathname.startsWith("/budgets");
        const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
        const isOnRegisterPage = request.nextUrl?.pathname.startsWith("/register");
        
    
  
        if (isOnAdminPanel && !user?.isAdmin) {
          return false;
        }

        if (isOnBudgetsPage && !user) {
          return false;
        }

        if (isOnRegisterPage && !user) {
          return true;
        }

        if (isOnRegisterPage && user) {
          return Response.redirect(new URL("/", request.nextUrl));
        }
  
        if (isOnLoginPage && user) {
          return Response.redirect(new URL("/", request.nextUrl));
        }
  
        return true
      },
    },
  };