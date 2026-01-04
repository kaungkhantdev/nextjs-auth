import { NextAuthOptions, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import "./types/auth.types";

const API_URL = process.env.API_URL || "http://localhost:3000";

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log('API_URL:', API_URL);
        console.log('Calling:', `${API_URL}/api/v1/auth/login`);
        console.log('Credentials:', { username: credentials?.username, password: '***' });

        try {
          const res = await fetch(`${API_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          console.log('Response status:', res.status);
          console.log('Response ok:', res.ok);

          if(!res.ok) {
            const errorText = await res.text();
            console.error('Login failed:', errorText);
            return null;
          }

          const response = await res.json();
          console.log('Backend response:', JSON.stringify(response, null, 2));

          const user = response.data.user;
          const accessToken = response.data.accessToken;

          return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
            accessToken: accessToken,
          }
        } catch (error) {
          console.error('Error in authorize:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
        token.role = user.role;
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt", maxAge: 15 * 60 },
};

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to refresh access token");
    }

    const refreshedTokens = await res.json();

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export { authOptions };

export async function auth() {
  return getServerSession(authOptions);
}