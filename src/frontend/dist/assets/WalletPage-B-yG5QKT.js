import { j as jsxRuntimeExports, c as cn, u as useAuth, r as reactExports } from "./index-VuP7z-8C.js";
import { S as Slot } from "./index-auF4jfXf.js";
import { c as cva, C as Copy } from "./index-BZqUWHNL.js";
import { c as createLucideIcon, m as motion, W as Wallet } from "./proxy-A24e9-ZM.js";
import { C as Check } from "./check-C7lCs4HX.js";
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
      d: "M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727",
      key: "yr8idg"
    }
  ]
];
const Bitcoin = createLucideIcon("bitcoin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
const AFUK_CONTRACT = "0x2d0A4446f11Ff1554F4E387DA2162d8276daDE5d";
const TOKENS = [
  {
    symbol: "USDC",
    name: "USD Coin",
    bg: "oklch(0.20 0.05 230 / 0.4)",
    border: "oklch(0.40 0.12 230 / 0.4)",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: { color: "oklch(0.70 0.18 230)" },
        className: "text-base font-bold font-mono",
        children: "$"
      }
    )
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    bg: "oklch(0.20 0.06 60 / 0.4)",
    border: "oklch(0.50 0.15 60 / 0.4)",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bitcoin, { className: "w-4 h-4", style: { color: "oklch(0.72 0.20 60)" } })
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    bg: "oklch(0.20 0.05 265 / 0.4)",
    border: "oklch(0.45 0.12 265 / 0.4)",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: { color: "oklch(0.75 0.14 265)" },
        className: "text-sm font-bold",
        children: "♦"
      }
    )
  },
  {
    symbol: "ICP",
    name: "Internet Computer",
    bg: "oklch(0.18 0.06 295 / 0.4)",
    border: "oklch(0.45 0.18 295 / 0.4)",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: { color: "oklch(0.75 0.22 295)" },
        className: "text-[10px] font-bold tracking-tight",
        children: "ICP"
      }
    )
  }
];
function WalletPage() {
  const { walletAddress } = useAuth();
  const [copiedContract, setCopiedContract] = reactExports.useState(false);
  const [copiedAddress, setCopiedAddress] = reactExports.useState(false);
  function handleCopyContract() {
    navigator.clipboard.writeText(AFUK_CONTRACT);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2e3);
  }
  function handleCopyAddress() {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2e3);
  }
  const truncated = walletAddress ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}` : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen",
      style: {
        background: "linear-gradient(135deg, oklch(0.09 0.025 265) 0%, oklch(0.11 0.02 280) 50%, oklch(0.10 0.03 310) 100%)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-2xl flex items-center justify-center",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305))",
                      boxShadow: "0 0 20px oklch(0.55 0.24 295 / 0.4)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5 text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "text-2xl font-display font-bold",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.96 0.01 265), oklch(0.85 0.12 295))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    },
                    children: "My Wallet"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex items-center gap-2 mt-4 px-4 py-3 rounded-xl",
                  style: {
                    background: "oklch(0.14 0.025 265 / 0.6)",
                    border: "1px solid oklch(0.28 0.04 265 / 0.5)"
                  },
                  children: walletAddress ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs font-ui mb-0.5",
                          style: { color: "oklch(0.55 0.04 265)" },
                          children: "Connected Wallet"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "font-mono text-sm font-medium",
                          style: { color: "oklch(0.90 0.04 265)" },
                          "data-ocid": "wallet.address.panel",
                          children: truncated
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleCopyAddress,
                        "data-ocid": "wallet.address.button",
                        className: "p-2 rounded-lg transition-colors hover:bg-white/5",
                        title: "Copy full address",
                        children: copiedAddress ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Check,
                          {
                            className: "w-4 h-4",
                            style: { color: "oklch(0.70 0.20 145)" }
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Copy,
                          {
                            className: "w-4 h-4",
                            style: { color: "oklch(0.60 0.04 265)" }
                          }
                        )
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-2 h-2 rounded-full",
                        style: { background: "oklch(0.60 0.22 40)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-sm font-ui",
                        style: { color: "oklch(0.60 0.04 265)" },
                        children: [
                          "No wallet connected —",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "a",
                            {
                              href: "#/",
                              className: "underline transition-opacity hover:opacity-80",
                              style: { color: "oklch(0.72 0.18 295)" },
                              children: "Connect now"
                            }
                          )
                        ]
                      }
                    )
                  ] })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.45, delay: 0.1 },
            className: "mb-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "rounded-2xl border overflow-hidden",
                style: {
                  background: "oklch(0.11 0.02 265 / 0.92)",
                  borderColor: "oklch(0.40 0.18 295 / 0.5)",
                  boxShadow: "0 0 40px oklch(0.55 0.24 295 / 0.2), 0 0 80px oklch(0.50 0.26 305 / 0.1)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-1 w-full",
                      style: {
                        background: "linear-gradient(90deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340), oklch(0.55 0.24 295))"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0",
                          style: {
                            boxShadow: "0 0 20px oklch(0.55 0.24 295 / 0.3)",
                            border: "2px solid oklch(0.55 0.24 295 / 0.4)"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: "/assets/afuktokenlogo1-019d58aa-bef5-707a-b33c-a98d6dbac4d8.png",
                              alt: "AFUK Token",
                              className: "w-full h-full object-contain"
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "h2",
                            {
                              className: "text-xl font-display font-bold",
                              style: { color: "oklch(0.96 0.01 265)" },
                              children: "AFUK Token"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              className: "text-[10px] font-ui font-semibold px-2 py-0.5 rounded-full border-0",
                              style: {
                                background: "oklch(0.55 0.24 295 / 0.2)",
                                color: "oklch(0.82 0.18 295)",
                                border: "1px solid oklch(0.55 0.24 295 / 0.4)"
                              },
                              children: "ERC-20"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-sm font-ui mt-0.5",
                            style: { color: "oklch(0.62 0.08 295)" },
                            children: "Base Mainnet"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs font-ui mt-1.5 leading-relaxed",
                            style: { color: "oklch(0.58 0.04 265)" },
                            children: "AFUK is the native token of the LoveLink ecosystem. Use it to tip matches and unlock premium features."
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2 mb-5 px-3 py-2.5 rounded-xl",
                        style: {
                          background: "oklch(0.14 0.025 265 / 0.6)",
                          border: "1px solid oklch(0.35 0.10 295 / 0.4)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-[10px] font-ui uppercase tracking-widest mb-0.5",
                                style: { color: "oklch(0.55 0.06 295)" },
                                children: "Contract Address"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "font-mono text-xs truncate",
                                style: { color: "oklch(0.80 0.08 295)" },
                                "data-ocid": "wallet.contract.panel",
                                children: AFUK_CONTRACT
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: handleCopyContract,
                              "data-ocid": "wallet.contract.button",
                              className: "flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-ui font-medium transition-all",
                              style: {
                                background: copiedContract ? "oklch(0.35 0.14 145 / 0.3)" : "oklch(0.55 0.24 295 / 0.15)",
                                color: copiedContract ? "oklch(0.70 0.20 145)" : "oklch(0.75 0.18 295)",
                                border: `1px solid ${copiedContract ? "oklch(0.50 0.18 145 / 0.4)" : "oklch(0.55 0.24 295 / 0.3)"}`
                              },
                              children: copiedContract ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
                                "Copied!"
                              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                                "Copy"
                              ] })
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "a",
                        {
                          href: `https://app.uniswap.org/#/swap?outputCurrency=${AFUK_CONTRACT}&chain=base`,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          "data-ocid": "wallet.buy_afuk.primary_button",
                          className: "flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-ui font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]",
                          style: {
                            background: "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305))",
                            color: "white",
                            boxShadow: "0 0 24px oklch(0.55 0.24 295 / 0.4)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: "https://app.uniswap.org/favicon.ico",
                                alt: "",
                                className: "w-4 h-4 rounded-sm",
                                onError: (e) => {
                                  e.target.style.display = "none";
                                }
                              }
                            ),
                            "Buy on Uniswap",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 opacity-70" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "a",
                        {
                          href: `https://basescan.org/token/${AFUK_CONTRACT}`,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          "data-ocid": "wallet.basescan.secondary_button",
                          className: "flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-ui font-semibold text-sm transition-all hover:bg-white/5 active:scale-[0.98]",
                          style: {
                            border: "1px solid oklch(0.35 0.10 295 / 0.6)",
                            color: "oklch(0.72 0.12 295)"
                          },
                          children: [
                            "View on Basescan",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 opacity-70" })
                          ]
                        }
                      )
                    ] })
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.45, delay: 0.2 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "rounded-2xl border",
                style: {
                  background: "oklch(0.11 0.02 265 / 0.92)",
                  borderColor: "oklch(0.28 0.04 265 / 0.5)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-5 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    CardTitle,
                    {
                      className: "text-base font-display font-bold flex items-center gap-2 flex-wrap",
                      style: { color: "oklch(0.90 0.04 265)" },
                      children: [
                        "Token Balances",
                        !walletAddress && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[11px] font-ui font-normal px-2 py-0.5 rounded-full",
                            style: {
                              background: "oklch(0.20 0.04 60 / 0.4)",
                              color: "oklch(0.72 0.18 60)",
                              border: "1px solid oklch(0.45 0.14 60 / 0.4)"
                            },
                            children: "Connect wallet to view balances"
                          }
                        )
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-6 pb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "flex flex-col gap-2",
                        "data-ocid": "wallet.balances.list",
                        children: TOKENS.map((token, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.div,
                          {
                            initial: { opacity: 0, x: -12 },
                            animate: { opacity: 1, x: 0 },
                            transition: { duration: 0.3, delay: 0.25 + i * 0.06 },
                            "data-ocid": `wallet.balance.item.${i + 1}`,
                            className: "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-white/[0.02]",
                            style: {
                              background: token.bg,
                              border: `1px solid ${token.border}`
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                                  style: {
                                    background: token.bg,
                                    border: `1.5px solid ${token.border}`
                                  },
                                  children: token.icon
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "p",
                                  {
                                    className: "text-sm font-ui font-semibold leading-none mb-0.5",
                                    style: { color: "oklch(0.88 0.03 265)" },
                                    children: token.symbol
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "p",
                                  {
                                    className: "text-xs font-ui truncate",
                                    style: { color: "oklch(0.55 0.03 265)" },
                                    children: token.name
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "p",
                                  {
                                    className: "text-sm font-mono font-semibold",
                                    style: {
                                      color: walletAddress ? "oklch(0.88 0.03 265)" : "oklch(0.40 0.03 265)"
                                    },
                                    children: walletAddress ? "0.00" : "—"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "p",
                                  {
                                    className: "text-xs font-ui",
                                    style: { color: "oklch(0.42 0.03 265)" },
                                    children: walletAddress ? "$0.00" : "—"
                                  }
                                )
                              ] })
                            ]
                          },
                          token.symbol
                        ))
                      }
                    ),
                    !walletAddress && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-center text-xs font-ui mt-4",
                        style: { color: "oklch(0.45 0.04 265)" },
                        "data-ocid": "wallet.balances.empty_state",
                        children: "Connect your wallet from the top bar to see your balances"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6" })
      ] })
    }
  );
}
export {
  WalletPage as default
};
