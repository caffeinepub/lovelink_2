import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useWalletConnect } from "@/hooks/useWalletConnect";
import { Navigate, Route, RouterProvider, useRouterPath } from "@/router";
import { Suspense, createContext, lazy, useContext, useState } from "react";

// ─── Auth Context ───
export type Orientation = "Straight" | "Gay" | "Bisexual" | "Other";
export type Gender = "Male" | "Female" | "Non-binary";
export type Intent = "LongTerm" | "Casual" | "FunNow";

export interface CurrentUser {
  name: string;
  gender: Gender;
  orientation: Orientation;
  intent: Intent;
  walletAddress?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: CurrentUser;
  setLoggedIn: (val: boolean) => void;
  setCurrentUser: (u: Partial<CurrentUser>) => void;
  walletAddress: string | null;
  setWalletAddress: (a: string | null) => void;
}

const DEFAULT_USER: CurrentUser = {
  name: "You",
  gender: "Female",
  orientation: "Straight",
  intent: "LongTerm",
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  currentUser: DEFAULT_USER,
  setLoggedIn: () => {},
  setCurrentUser: () => {},
  walletAddress: null,
  setWalletAddress: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

// ─── Lazy Pages ───
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const ExplorePage = lazy(() => import("@/pages/ExplorePage"));
const MatchesPage = lazy(() => import("@/pages/MatchesPage"));
const MessagesPage = lazy(() => import("@/pages/MessagesPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const EditProfilePage = lazy(() => import("@/pages/EditProfilePage"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const WalletPage = lazy(() => import("@/pages/WalletPage"));
const LeaderboardPage = lazy(() => import("@/pages/LeaderboardPage"));

function LoadingFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.09 0.025 265) 0%, oklch(0.11 0.02 280) 50%, oklch(0.10 0.03 310) 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl animate-pulse"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
          }}
        />
        <Skeleton
          className="h-4 w-32"
          style={{ background: "oklch(0.20 0.03 265)" }}
        />
      </div>
    </div>
  );
}

function AppRoutes() {
  const { isLoggedIn } = useAuth();
  const path = useRouterPath();

  if (!isLoggedIn) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <LoginPage />
      </Suspense>
    );
  }

  if (path === "/" || path === "") {
    return <Navigate to="/explore" />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Route path="/explore" element={<ExplorePage />} exact />
      <Route path="/matches" element={<MatchesPage />} exact />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/profile/edit" element={<EditProfilePage />} exact />
      <Route path="/profile" element={<ProfilePage />} exact />
      <Route path="/notifications" element={<NotificationsPage />} exact />
      <Route path="/wallet" element={<WalletPage />} exact />
      <Route path="/leaderboard" element={<LeaderboardPage />} exact />
    </Suspense>
  );
}

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, _setCurrentUser] = useState<CurrentUser>(DEFAULT_USER);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const setCurrentUser = (u: Partial<CurrentUser>) =>
    _setCurrentUser((prev) => ({ ...prev, ...u }));

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        setLoggedIn,
        setCurrentUser,
        walletAddress,
        setWalletAddress,
      }}
    >
      <RouterProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "oklch(0.17 0.03 265)",
              border: "1px solid oklch(0.28 0.04 265)",
              color: "oklch(0.92 0.02 265)",
            },
          }}
        />
      </RouterProvider>
    </AuthContext.Provider>
  );
}
