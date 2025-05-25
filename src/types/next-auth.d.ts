import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      role: 'STANDARD' | 'PRO' | 'ADMIN';
    };
  }

  interface User {
    id: string;
    role: 'STANDARD' | 'PRO' | 'ADMIN';
  }
}
