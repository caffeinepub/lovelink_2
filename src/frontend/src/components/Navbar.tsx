import type { Notification } from "@/backend.d";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useGetCallerProfile,
  useGetNotifications,
  useMarkAllNotificationsRead,
} from "@/hooks/useQueries";
import { Link, useRouterPath } from "@/router";
import { formatDistanceToNow } from "@/utils/timeUtils";
import { useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  CalendarDays,
  CheckCheck,
  Compass,
  Heart,
  LogOut,
  MessageCircle,
  User,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/matches", label: "Matches", icon: Heart },
  { to: "/messages", label: "Messages", icon: MessageCircle },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/profile", label: "Profile", icon: User },
];

function NotificationIcon(type: string) {
  if (type === "newMatch")
    return (
      <Heart
        className="w-3.5 h-3.5"
        style={{ color: "oklch(0.60 0.23 340)" }}
      />
    );
  if (type === "newMessage")
    return (
      <MessageCircle
        className="w-3.5 h-3.5"
        style={{ color: "oklch(0.58 0.22 265)" }}
      />
    );
  return (
    <Wallet className="w-3.5 h-3.5" style={{ color: "oklch(0.55 0.24 300)" }} />
  );
}

function NotificationItem({ notif }: { notif: Notification }) {
  return (
    <div
      className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/60 transition-colors cursor-pointer"
      style={{
        background: notif.isRead
          ? "transparent"
          : "oklch(0.58 0.22 265 / 0.06)",
      }}
    >
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary flex items-center justify-center mt-0.5">
        {NotificationIcon(notif.notificationType)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-foreground/90 leading-relaxed">
          {notif.message}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatDistanceToNow(notif.timestamp)}
        </p>
      </div>
      {!notif.isRead && (
        <div
          className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
          style={{ background: "oklch(0.58 0.22 265)" }}
        />
      )}
    </div>
  );
}

export default function Navbar() {
  const location = { pathname: useRouterPath() };
  const { identity, clear } = useInternetIdentity();
  const qc = useQueryClient();
  const { data: profile } = useGetCallerProfile();
  const { data: notifications = [] } = useGetNotifications();
  const markAll = useMarkAllNotificationsRead();
  const [_showNotif, _setShowNotif] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleLogout = async () => {
    await clear();
    qc.clear();
  };

  const displayName =
    profile?.name || `${identity?.getPrincipal().toString().slice(0, 8)}...`;
  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const photoUrl = profile?.photo?.getDirectURL?.();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16"
      data-ocid="nav.panel"
    >
      <div
        className="h-full px-6 flex items-center justify-between"
        style={{
          background: "oklch(0.13 0.025 252 / 0.92)",
          backdropFilter: "blur(20px) saturate(1.5)",
          WebkitBackdropFilter: "blur(20px) saturate(1.5)",
          borderBottom: "1px solid oklch(0.28 0.05 252)",
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link
            to="/explore"
            className="flex items-center gap-2.5 flex-shrink-0"
            data-ocid="nav.link"
          >
            <img
              src="/assets/afuktokenlogo1-019d58aa-bef5-707a-b33c-a98d6dbac4d8.png"
              className="w-8 h-8 rounded-xl object-contain"
              alt="AFUK"
            />
            <span className="font-display text-xl font-bold text-foreground">
              LoveLink
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={`nav.${label.toLowerCase()}.link`}
                  className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-ui font-medium transition-colors"
                  style={{
                    color: isActive
                      ? "oklch(0.92 0.02 252)"
                      : "oklch(0.62 0.04 252)",
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
                          "linear-gradient(90deg, oklch(0.58 0.22 265), oklch(0.55 0.24 300), oklch(0.60 0.23 340))",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          {/* Wallet pill */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-ui font-medium"
            style={{
              background: "oklch(0.20 0.04 252)",
              border: "1px solid oklch(0.28 0.05 252)",
              color: "oklch(0.80 0.02 252)",
            }}
          >
            <img
              src="/assets/afuktokenlogo1-019d58aa-bef5-707a-b33c-a98d6dbac4d8.png"
              className="w-3.5 h-3.5 rounded-full object-contain"
              alt="AFUK"
            />
            <span>AFUK</span>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                data-ocid="nav.notifications.open_modal_button"
                className="relative h-9 w-9 rounded-full"
                style={{ background: "oklch(0.20 0.04 252)" }}
              >
                <Bell
                  className="w-4 h-4"
                  style={{ color: "oklch(0.80 0.02 252)" }}
                />
                {unreadCount > 0 && (
                  <AnimatePresence>
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.60 0.23 340))",
                      }}
                    >
                      {unreadCount}
                    </motion.span>
                  </AnimatePresence>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 p-0 overflow-hidden"
              data-ocid="nav.notifications.popover"
              style={{
                background: "oklch(0.17 0.04 252)",
                border: "1px solid oklch(0.28 0.05 252)",
                boxShadow: "0 8px 32px oklch(0.05 0.01 252 / 0.8)",
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "oklch(0.28 0.05 252)" }}
              >
                <span className="font-ui font-semibold text-sm text-foreground">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={() => markAll.mutate()}
                    data-ocid="nav.notifications.confirm_button"
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    <CheckCheck className="w-3 h-3" />
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {notifications.length === 0 ? (
                  <div
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                    data-ocid="nav.notifications.empty_state"
                  >
                    No notifications yet
                  </div>
                ) : (
                  notifications
                    .slice(0, 8)
                    .map((notif) => (
                      <NotificationItem key={notif.id} notif={notif} />
                    ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                data-ocid="nav.profile.open_modal_button"
                className="h-9 w-9 rounded-full p-0"
              >
                <Avatar className="h-9 w-9">
                  {photoUrl && (
                    <AvatarImage src={photoUrl} className="object-cover" />
                  )}
                  <AvatarFallback
                    className="text-xs font-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.55 0.24 300), oklch(0.60 0.23 340))",
                      color: "white",
                    }}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              data-ocid="nav.profile.dropdown_menu"
              style={{
                background: "oklch(0.17 0.04 252)",
                border: "1px solid oklch(0.28 0.05 252)",
              }}
            >
              <div className="px-3 py-2">
                <p className="text-sm font-ui font-semibold text-foreground">
                  {displayName}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                  {identity?.getPrincipal().toString()}
                </p>
              </div>
              <DropdownMenuSeparator
                style={{ background: "oklch(0.28 0.05 252)" }}
              />
              <DropdownMenuItem asChild>
                <Link
                  to="/profile"
                  data-ocid="nav.profile.link"
                  className="cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator
                style={{ background: "oklch(0.28 0.05 252)" }}
              />
              <DropdownMenuItem
                data-ocid="nav.logout.button"
                onClick={handleLogout}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
