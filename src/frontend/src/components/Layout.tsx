import { useAuth } from "@/App";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useRouterPath } from "@/router";
import {
  Bell,
  Compass,
  Heart,
  MessageCircle,
  User,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

// All nav links (used for desktop nav)
const NAV_LINKS = [
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/messages", label: "Messages", icon: MessageCircle },
  { to: "/matches", label: "Matches", icon: Heart },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/profile", label: "Profile", icon: User },
];

// Mobile bottom pill: keep 5 items (drop Notifications, keep Wallet)
const MOBILE_NAV_LINKS = [
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/messages", label: "Messages", icon: MessageCircle },
  { to: "/matches", label: "Matches", icon: Heart },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/profile", label: "Profile", icon: User },
];

function LoveLinkLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: 28, md: 36, lg: 72 };
  const px = sizes[size];
  return (
    <div className="flex items-center gap-2.5">
      <div
        style={{ width: px, height: px }}
        className="flex-shrink-0 overflow-hidden rounded-xl"
      >
        <img
          src="/assets/afuktokenlogo1-019d58aa-bef5-707a-b33c-a98d6dbac4d8.png"
          alt="LoveLink"
          style={{ width: px, height: px }}
          className="object-contain"
        />
      </div>
      {size !== "sm" && (
        <span
          className="font-display font-bold tracking-tight"
          style={{
            fontSize: size === "lg" ? "2.5rem" : "1.25rem",
            background:
              "linear-gradient(135deg, oklch(0.96 0.01 265), oklch(0.85 0.06 295))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          LoveLink
        </span>
      )}
    </div>
  );
}

export { LoveLinkLogo };

export default function Layout({ children }: { children: ReactNode }) {
  const path = useRouterPath();
  const navigate = useNavigate();
  const { currentUser, walletAddress } = useAuth();

  const displayName = currentUser.name;
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16"
        data-ocid="nav.panel"
        style={{
          background: "oklch(0.11 0.02 265 / 0.92)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          borderBottom: "1px solid oklch(0.28 0.04 265 / 0.5)",
        }}
      >
        <div className="h-full max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <Link to="/explore" data-ocid="nav.link" className="flex-shrink-0">
            <LoveLinkLogo size="md" />
          </Link>

          {/* Center: Nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const isActive =
                path === to || (to !== "/explore" && path.startsWith(to));
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={`nav.${label.toLowerCase()}.link`}
                  className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-ui font-medium transition-colors"
                  style={{
                    color: isActive
                      ? "oklch(0.96 0.01 265)"
                      : "oklch(0.60 0.04 265)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: utilities */}
          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <button
              type="button"
              data-ocid="nav.notifications.open_modal_button"
              onClick={() => navigate("/notifications")}
              className="relative h-9 w-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/5"
            >
              <Bell
                className="w-4.5 h-4.5"
                style={{ color: "oklch(0.75 0.03 265)" }}
              />
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ background: "oklch(0.65 0.25 27)" }}
              />
            </button>

            {/* Connect Wallet pill */}
            <button
              type="button"
              data-ocid="nav.wallet.button"
              onClick={() => navigate("/wallet")}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-ui font-semibold transition-opacity hover:opacity-90"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305))",
                color: "white",
                boxShadow: "0 0 16px oklch(0.55 0.24 295 / 0.4)",
              }}
            >
              <Wallet className="w-3.5 h-3.5" />
              {walletAddress
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : "Connect Wallet"}
            </button>

            {/* Avatar */}
            <button
              type="button"
              data-ocid="nav.profile.open_modal_button"
              onClick={() => navigate("/profile")}
              className="h-9 w-9 rounded-full p-0 overflow-hidden border-2 transition-colors"
              style={{ borderColor: "oklch(0.55 0.24 295 / 0.5)" }}
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback
                  className="text-xs font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
                    color: "white",
                  }}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16 pb-24 md:pb-8">{children}</main>

      {/* Footer */}
      <footer
        className="hidden md:block py-4 border-t text-center text-xs"
        style={{
          borderColor: "oklch(0.22 0.03 265)",
          color: "oklch(0.50 0.03 265)",
        }}
      >
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80 transition-opacity"
        >
          caffeine.ai
        </a>
      </footer>

      {/* Bottom Pill Nav (mobile) — 5 items */}
      <nav
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        aria-label="Mobile navigation"
      >
        <div
          className="flex items-center gap-1 px-2 py-2 rounded-full"
          style={{
            background: "oklch(0.14 0.025 265 / 0.92)",
            backdropFilter: "blur(20px) saturate(1.4)",
            WebkitBackdropFilter: "blur(20px) saturate(1.4)",
            border: "1px solid oklch(0.28 0.04 265 / 0.6)",
            boxShadow: "0 8px 32px oklch(0.05 0.01 265 / 0.6)",
          }}
        >
          {MOBILE_NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const isActive =
              path === to || (to !== "/explore" && path.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                data-ocid={`nav.mobile.${label.toLowerCase()}.link`}
                className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-full transition-all"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, oklch(0.55 0.24 295 / 0.25), oklch(0.62 0.24 340 / 0.25))"
                    : "transparent",
                  color: isActive
                    ? "oklch(0.82 0.18 295)"
                    : "oklch(0.55 0.04 265)",
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-ui font-medium">
                  {label.slice(0, 4)}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
