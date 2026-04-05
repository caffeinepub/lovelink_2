import { j as jsxRuntimeExports, S as Skeleton } from "./index--RR2uuHP.js";
import { L as Layout, T as Trophy } from "./Layout-D0gvy7ZP.js";
import { c as useGetLeaderboard } from "./useQueries-PLQIWETV.js";
import { c as createLucideIcon, m as motion } from "./proxy-BsJ5N3Wv.js";
import "./index-vqmhqKR0.js";
import "./heart-DZ9kxm27.js";
import "./useActor-C-OR18B7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
      key: "143lza"
    }
  ],
  ["path", { d: "M11 12 5.12 2.2", key: "qhuxz6" }],
  ["path", { d: "m13 12 5.88-9.8", key: "hbye0f" }],
  ["path", { d: "M8 7h8", key: "i86dvs" }],
  ["circle", { cx: "12", cy: "17", r: "5", key: "qbz8iq" }],
  ["path", { d: "M12 18v-2h-.5", key: "fawc4q" }]
];
const Medal = createLucideIcon("medal", __iconNode);
const SKELETON_IDS = ["sk-lb-1", "sk-lb-2", "sk-lb-3", "sk-lb-4", "sk-lb-5"];
function RankBadge({ rank }) {
  if (rank === 1) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
        style: {
          background: "linear-gradient(135deg, oklch(0.78 0.18 85), oklch(0.65 0.20 75))",
          boxShadow: "0 0 14px oklch(0.70 0.20 80 / 0.55)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5", style: { color: "oklch(0.20 0.05 80)" } })
      }
    );
  }
  if (rank === 2) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
        style: {
          background: "linear-gradient(135deg, oklch(0.80 0.04 265), oklch(0.68 0.06 265))",
          boxShadow: "0 0 10px oklch(0.75 0.04 265 / 0.40)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "w-5 h-5", style: { color: "oklch(0.30 0.04 265)" } })
      }
    );
  }
  if (rank === 3) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
        style: {
          background: "linear-gradient(135deg, oklch(0.65 0.14 55), oklch(0.55 0.16 45))",
          boxShadow: "0 0 10px oklch(0.60 0.15 50 / 0.40)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "w-5 h-5", style: { color: "oklch(0.25 0.05 50)" } })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold",
      style: {
        background: "oklch(0.20 0.03 265)",
        border: "1px solid oklch(0.28 0.04 265)",
        color: "oklch(0.55 0.04 265)"
      },
      children: rank
    }
  );
}
function formatAFUK(totalSent) {
  const amount = Number(totalSent) / 1e8;
  if (amount >= 1e6) return `${(amount / 1e6).toFixed(2)}M`;
  if (amount >= 1e3) return `${(amount / 1e3).toFixed(1)}K`;
  return amount.toFixed(2);
}
const SAMPLE_ENTRIES = [
  { rank: 1, name: "CryptoRomeo", amount: "42,500" },
  { rank: 2, name: "BlockchainBelle", amount: "38,200" },
  { rank: 3, name: "TokenHearts", amount: "27,850" },
  { rank: 4, name: "Web3Wanderer", amount: "15,300" },
  { rank: 5, name: "DeFiDarling", amount: "12,100" }
];
function LeaderboardPage() {
  var _a, _b, _c, _d, _e, _f;
  const { data: entries = [], isLoading } = useGetLeaderboard(20);
  const displayEntries = entries.length > 0 ? entries.map((e, i) => ({
    rank: i + 1,
    name: e.name || `${e.user.toString().slice(0, 8)}...`,
    amount: formatAFUK(e.totalSent),
    key: e.user.toString()
  })) : SAMPLE_ENTRIES.map((e) => ({ ...e, key: String(e.rank) }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[700px] mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center gap-3 mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
              style: {
                background: "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
                boxShadow: "0 0 20px oklch(0.55 0.24 295 / 0.4)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-6 h-6 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "font-display text-3xl sm:text-4xl font-bold",
                "data-ocid": "leaderboard.page",
                style: {
                  background: "linear-gradient(135deg, oklch(0.96 0.01 265), oklch(0.85 0.10 295))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                },
                children: "AFUK Tipper Leaderboard"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm mt-0.5",
                style: { color: "oklch(0.55 0.04 265)" },
                children: "Top token senders in the LoveLink community"
              }
            )
          ] })
        ]
      }
    ),
    !isLoading && displayEntries.length >= 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        className: "grid grid-cols-3 gap-3 mb-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-4 text-center flex flex-col items-center gap-2 mt-6",
              style: {
                background: "oklch(0.16 0.025 265 / 0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(0.78 0.04 265 / 0.3)"
              },
              "data-ocid": "leaderboard.item.2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank: 2 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-ui font-semibold text-center break-all",
                    style: { color: "oklch(0.82 0.02 265)" },
                    children: (_a = displayEntries[1]) == null ? void 0 : _a.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-bold",
                    style: { color: "oklch(0.78 0.12 295)" },
                    children: [
                      (_b = displayEntries[1]) == null ? void 0 : _b.amount,
                      " AFUK"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-4 text-center flex flex-col items-center gap-2",
              style: {
                background: "linear-gradient(160deg, oklch(0.20 0.05 295 / 0.80), oklch(0.16 0.025 265 / 0.80))",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(0.70 0.20 80 / 0.4)",
                boxShadow: "0 0 24px oklch(0.65 0.18 80 / 0.2)"
              },
              "data-ocid": "leaderboard.item.1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank: 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-ui font-semibold text-center break-all",
                    style: { color: "oklch(0.96 0.01 265)" },
                    children: (_c = displayEntries[0]) == null ? void 0 : _c.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-bold",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.78 0.18 85), oklch(0.65 0.20 75))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    },
                    children: [
                      (_d = displayEntries[0]) == null ? void 0 : _d.amount,
                      " AFUK"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-4 text-center flex flex-col items-center gap-2 mt-6",
              style: {
                background: "oklch(0.16 0.025 265 / 0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(0.60 0.14 50 / 0.3)"
              },
              "data-ocid": "leaderboard.item.3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank: 3 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-ui font-semibold text-center break-all",
                    style: { color: "oklch(0.82 0.02 265)" },
                    children: (_e = displayEntries[2]) == null ? void 0 : _e.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-bold",
                    style: { color: "oklch(0.65 0.14 50)" },
                    children: [
                      (_f = displayEntries[2]) == null ? void 0 : _f.amount,
                      " AFUK"
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.15 },
        className: "rounded-2xl overflow-hidden",
        style: {
          background: "oklch(0.15 0.025 265 / 0.75)",
          backdropFilter: "blur(16px)",
          border: "1px solid oklch(0.28 0.04 265 / 0.6)"
        },
        "data-ocid": "leaderboard.table",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-5 py-4 border-b",
              style: { borderColor: "oklch(0.22 0.03 265)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-ui font-semibold uppercase tracking-wider",
                    style: { color: "oklch(0.55 0.04 265)" },
                    children: "Rank"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-ui font-semibold uppercase tracking-wider",
                    style: { color: "oklch(0.55 0.04 265)" },
                    children: "Tipper"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-ui font-semibold uppercase tracking-wider",
                    style: { color: "oklch(0.55 0.04 265)" },
                    children: "AFUK Sent"
                  }
                )
              ]
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-5 space-y-3",
              "data-ocid": "leaderboard.loading_state",
              children: SKELETON_IDS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Skeleton,
                {
                  className: "h-14 w-full rounded-xl",
                  style: { background: "oklch(0.20 0.03 265)" }
                },
                id
              ))
            }
          ) : displayEntries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "py-16 text-center",
              "data-ocid": "leaderboard.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Trophy,
                  {
                    className: "w-10 h-10 mx-auto mb-3 opacity-20",
                    style: { color: "oklch(0.55 0.24 295)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "oklch(0.55 0.04 265)" }, children: "No tippers yet. Be the first!" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: displayEntries.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.li,
            {
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.05 * idx },
              className: "flex items-center gap-4 px-5 py-4 border-b last:border-b-0 transition-colors",
              style: {
                borderColor: "oklch(0.20 0.03 265)",
                background: entry.rank <= 3 ? "oklch(0.55 0.24 295 / 0.04)" : "transparent"
              },
              "data-ocid": `leaderboard.row.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank: entry.rank }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-ui font-semibold text-sm truncate",
                    style: {
                      color: entry.rank === 1 ? "oklch(0.96 0.01 265)" : "oklch(0.82 0.02 265)"
                    },
                    children: entry.name
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-ui font-bold text-sm",
                      style: {
                        color: entry.rank === 1 ? "oklch(0.78 0.18 85)" : "oklch(0.72 0.14 295)"
                      },
                      children: entry.amount
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-[10px] font-ui",
                      style: { color: "oklch(0.45 0.03 265)" },
                      children: "AFUK"
                    }
                  )
                ] })
              ]
            },
            entry.key
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-center text-xs mt-6",
        style: { color: "oklch(0.40 0.03 265)" },
        children: "Rankings update in real time based on total AFUK tips sent"
      }
    )
  ] }) });
}
export {
  LeaderboardPage as default
};
