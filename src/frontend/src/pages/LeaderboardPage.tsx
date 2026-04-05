import Layout from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetLeaderboard } from "@/hooks/useQueries";
import { Crown, Medal, Trophy } from "lucide-react";
import { motion } from "motion/react";

const SKELETON_IDS = ["sk-lb-1", "sk-lb-2", "sk-lb-3", "sk-lb-4", "sk-lb-5"];

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.78 0.18 85), oklch(0.65 0.20 75))",
          boxShadow: "0 0 14px oklch(0.70 0.20 80 / 0.55)",
        }}
      >
        <Crown className="w-5 h-5" style={{ color: "oklch(0.20 0.05 80)" }} />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.80 0.04 265), oklch(0.68 0.06 265))",
          boxShadow: "0 0 10px oklch(0.75 0.04 265 / 0.40)",
        }}
      >
        <Medal className="w-5 h-5" style={{ color: "oklch(0.30 0.04 265)" }} />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.65 0.14 55), oklch(0.55 0.16 45))",
          boxShadow: "0 0 10px oklch(0.60 0.15 50 / 0.40)",
        }}
      >
        <Medal className="w-5 h-5" style={{ color: "oklch(0.25 0.05 50)" }} />
      </div>
    );
  }
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
      style={{
        background: "oklch(0.20 0.03 265)",
        border: "1px solid oklch(0.28 0.04 265)",
        color: "oklch(0.55 0.04 265)",
      }}
    >
      {rank}
    </div>
  );
}

function formatAFUK(totalSent: bigint): string {
  const amount = Number(totalSent) / 1e8;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(2)}M`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(1)}K`;
  return amount.toFixed(2);
}

const SAMPLE_ENTRIES = [
  { rank: 1, name: "CryptoRomeo", amount: "42,500" },
  { rank: 2, name: "BlockchainBelle", amount: "38,200" },
  { rank: 3, name: "TokenHearts", amount: "27,850" },
  { rank: 4, name: "Web3Wanderer", amount: "15,300" },
  { rank: 5, name: "DeFiDarling", amount: "12,100" },
];

export default function LeaderboardPage() {
  const { data: entries = [], isLoading } = useGetLeaderboard(20);

  const displayEntries =
    entries.length > 0
      ? entries.map((e, i) => ({
          rank: i + 1,
          name: e.name || `${e.user.toString().slice(0, 8)}...`,
          amount: formatAFUK(e.totalSent),
          key: e.user.toString(),
        }))
      : SAMPLE_ENTRIES.map((e) => ({ ...e, key: String(e.rank) }));

  return (
    <Layout>
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
              boxShadow: "0 0 20px oklch(0.55 0.24 295 / 0.4)",
            }}
          >
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1
              className="font-display text-3xl sm:text-4xl font-bold"
              data-ocid="leaderboard.page"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.96 0.01 265), oklch(0.85 0.10 295))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AFUK Tipper Leaderboard
            </h1>
            <p
              className="text-sm mt-0.5"
              style={{ color: "oklch(0.55 0.04 265)" }}
            >
              Top token senders in the LoveLink community
            </p>
          </div>
        </motion.div>

        {/* Top 3 podium */}
        {!isLoading && displayEntries.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            {/* #2 */}
            <div
              className="rounded-2xl p-4 text-center flex flex-col items-center gap-2 mt-6"
              style={{
                background: "oklch(0.16 0.025 265 / 0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(0.78 0.04 265 / 0.3)",
              }}
              data-ocid="leaderboard.item.2"
            >
              <RankBadge rank={2} />
              <span
                className="text-xs font-ui font-semibold text-center break-all"
                style={{ color: "oklch(0.82 0.02 265)" }}
              >
                {displayEntries[1]?.name}
              </span>
              <span
                className="text-xs font-bold"
                style={{ color: "oklch(0.78 0.12 295)" }}
              >
                {displayEntries[1]?.amount} AFUK
              </span>
            </div>
            {/* #1 */}
            <div
              className="rounded-2xl p-4 text-center flex flex-col items-center gap-2"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.20 0.05 295 / 0.80), oklch(0.16 0.025 265 / 0.80))",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(0.70 0.20 80 / 0.4)",
                boxShadow: "0 0 24px oklch(0.65 0.18 80 / 0.2)",
              }}
              data-ocid="leaderboard.item.1"
            >
              <RankBadge rank={1} />
              <span
                className="text-xs font-ui font-semibold text-center break-all"
                style={{ color: "oklch(0.96 0.01 265)" }}
              >
                {displayEntries[0]?.name}
              </span>
              <span
                className="text-xs font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.18 85), oklch(0.65 0.20 75))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {displayEntries[0]?.amount} AFUK
              </span>
            </div>
            {/* #3 */}
            <div
              className="rounded-2xl p-4 text-center flex flex-col items-center gap-2 mt-6"
              style={{
                background: "oklch(0.16 0.025 265 / 0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(0.60 0.14 50 / 0.3)",
              }}
              data-ocid="leaderboard.item.3"
            >
              <RankBadge rank={3} />
              <span
                className="text-xs font-ui font-semibold text-center break-all"
                style={{ color: "oklch(0.82 0.02 265)" }}
              >
                {displayEntries[2]?.name}
              </span>
              <span
                className="text-xs font-bold"
                style={{ color: "oklch(0.65 0.14 50)" }}
              >
                {displayEntries[2]?.amount} AFUK
              </span>
            </div>
          </motion.div>
        )}

        {/* Full list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "oklch(0.15 0.025 265 / 0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid oklch(0.28 0.04 265 / 0.6)",
          }}
          data-ocid="leaderboard.table"
        >
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: "oklch(0.22 0.03 265)" }}
          >
            <span
              className="text-xs font-ui font-semibold uppercase tracking-wider"
              style={{ color: "oklch(0.55 0.04 265)" }}
            >
              Rank
            </span>
            <span
              className="text-xs font-ui font-semibold uppercase tracking-wider"
              style={{ color: "oklch(0.55 0.04 265)" }}
            >
              Tipper
            </span>
            <span
              className="text-xs font-ui font-semibold uppercase tracking-wider"
              style={{ color: "oklch(0.55 0.04 265)" }}
            >
              AFUK Sent
            </span>
          </div>

          {isLoading ? (
            <div
              className="p-5 space-y-3"
              data-ocid="leaderboard.loading_state"
            >
              {SKELETON_IDS.map((id) => (
                <Skeleton
                  key={id}
                  className="h-14 w-full rounded-xl"
                  style={{ background: "oklch(0.20 0.03 265)" }}
                />
              ))}
            </div>
          ) : displayEntries.length === 0 ? (
            <div
              className="py-16 text-center"
              data-ocid="leaderboard.empty_state"
            >
              <Trophy
                className="w-10 h-10 mx-auto mb-3 opacity-20"
                style={{ color: "oklch(0.55 0.24 295)" }}
              />
              <p style={{ color: "oklch(0.55 0.04 265)" }}>
                No tippers yet. Be the first!
              </p>
            </div>
          ) : (
            <ul>
              {displayEntries.map((entry, idx) => (
                <motion.li
                  key={entry.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="flex items-center gap-4 px-5 py-4 border-b last:border-b-0 transition-colors"
                  style={{
                    borderColor: "oklch(0.20 0.03 265)",
                    background:
                      entry.rank <= 3
                        ? "oklch(0.55 0.24 295 / 0.04)"
                        : "transparent",
                  }}
                  data-ocid={`leaderboard.row.${idx + 1}`}
                >
                  <RankBadge rank={entry.rank} />
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-ui font-semibold text-sm truncate"
                      style={{
                        color:
                          entry.rank === 1
                            ? "oklch(0.96 0.01 265)"
                            : "oklch(0.82 0.02 265)",
                      }}
                    >
                      {entry.name}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p
                      className="font-ui font-bold text-sm"
                      style={{
                        color:
                          entry.rank === 1
                            ? "oklch(0.78 0.18 85)"
                            : "oklch(0.72 0.14 295)",
                      }}
                    >
                      {entry.amount}
                    </p>
                    <p
                      className="text-[10px] font-ui"
                      style={{ color: "oklch(0.45 0.03 265)" }}
                    >
                      AFUK
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>

        <p
          className="text-center text-xs mt-6"
          style={{ color: "oklch(0.40 0.03 265)" }}
        >
          Rankings update in real time based on total AFUK tips sent
        </p>
      </div>
    </Layout>
  );
}
