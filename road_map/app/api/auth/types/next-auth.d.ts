//./api/auth/types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      role?: string;
      profileCompleted?: boolean;
    };
  }

  interface User {
    role?: string;
    profileCompleted?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    profileCompleted?: boolean;
  }
}