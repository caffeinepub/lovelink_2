import Layout from "@/components/Layout";
import {
  Bell,
  Check,
  CheckCheck,
  Heart,
  MessageCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useState } from "react";

type NotifType = "match" | "message" | "tip";

interface Notif {
  id: string;
  type: NotifType;
  text: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFS: Notif[] = [
  {
    id: "n1",
    type: "match",
    text: "You matched with Sofia Martinez! 💕",
    time: "2 min ago",
    read: false,
  },
  {
    id: "n2",
    type: "tip",
    text: "James Chen sent you 50 AFUK 💜",
    time: "15 min ago",
    read: false,
  },
  {
    id: "n3",
    type: "message",
    text: 'Aria Thompson sent you a message: "Let’s go hiking!"',
    time: "1 hr ago",
    read: false,
  },
  {
    id: "n4",
    type: "match",
    text: "You matched with Emma Rosewood! 🌸",
    time: "3 hrs ago",
    read: true,
  },
  {
    id: "n5",
    type: "tip",
    text: "Sofia Martinez sent you 100 AFUK ⚡",
    time: "5 hrs ago",
    read: true,
  },
  {
    id: "n6",
    type: "message",
    text: 'James Chen: "Homemade pasta night, want to join?"',
    time: "Yesterday",
    read: true,
  },
  {
    id: "n7",
    type: "match",
    text: "You matched with Luca Romano! 🌊",
    time: "2 days ago",
    read: true,
  },
];

const ICONS: Record<
  NotifType,
  React.FC<{ className?: string; style?: React.CSSProperties }>
> = {
  match: Heart,
  message: MessageCircle,
  tip: Zap,
};

const TYPE_COLORS: Record<NotifType, string> = {
  match: "oklch(0.62 0.24 340)",
  message: "oklch(0.55 0.24 295)",
  tip: "oklch(0.65 0.22 295)",
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notif[]>(INITIAL_NOTIFS);

  const markAll = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markOne = (id: string) =>
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const unread = notifs.filter((n) => !n.read).length;

  return (
    <Layout>
      <div className="max-w-[640px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider"
              data-ocid="notifications.page"
              style={{ color: "oklch(0.96 0.01 265)" }}
            >
              Notifications
            </h1>
            {unread > 0 && (
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(0.55 0.04 265)" }}
              >
                {unread} unread
              </p>
            )}
          </div>
          {unread > 0 && (
            <button
              type="button"
              data-ocid="notifications.confirm_button"
              onClick={markAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-ui font-medium transition-all hover:opacity-80"
              style={{
                background: "oklch(0.18 0.025 265)",
                border: "1px solid oklch(0.28 0.04 265)",
                color: "oklch(0.70 0.18 295)",
              }}
            >
              <CheckCheck className="w-4 h-4" /> Mark all read
            </button>
          )}
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "oklch(0.15 0.025 265 / 0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid oklch(0.28 0.04 265 / 0.6)",
          }}
        >
          {notifs.length === 0 ? (
            <div
              data-ocid="notifications.empty_state"
              className="text-center py-20"
            >
              <Bell
                className="w-16 h-16 mx-auto mb-4 opacity-10"
                style={{ color: "oklch(0.96 0.01 265)" }}
              />
              <p style={{ color: "oklch(0.55 0.04 265)" }}>
                No notifications yet
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {notifs.map((n, i) => {
                const Icon = ICONS[n.type];
                return (
                  <motion.button
                    key={n.id}
                    type="button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    data-ocid={`notifications.item.${i + 1}`}
                    onClick={() => markOne(n.id)}
                    className="w-full flex items-start gap-4 px-5 py-4 text-left transition-colors border-b last:border-0"
                    style={{
                      background: n.read
                        ? "transparent"
                        : "oklch(0.55 0.24 295 / 0.06)",
                      borderColor: "oklch(0.26 0.04 265)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${TYPE_COLORS[n.type]}22` }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: TYPE_COLORS[n.type] }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-ui leading-relaxed"
                        style={{
                          color: n.read
                            ? "oklch(0.65 0.04 265)"
                            : "oklch(0.92 0.02 265)",
                        }}
                      >
                        {n.text}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.45 0.04 265)" }}
                      >
                        {n.time}
                      </p>
                    </div>
                    {!n.read && (
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
                        }}
                      />
                    )}
                    {n.read && (
                      <Check
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: "oklch(0.40 0.04 265)" }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </Layout>
  );
}
