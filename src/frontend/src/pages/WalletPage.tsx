import { useAuth } from "@/App";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bitcoin, Check, Copy, ExternalLink, Wallet } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const AFUK_CONTRACT = "0x2d0A4446f11Ff1554F4E387DA2162d8276daDE5d";

const TOKENS = [
  {
    symbol: "USDC",
    name: "USD Coin",
    bg: "oklch(0.20 0.05 230 / 0.4)",
    border: "oklch(0.40 0.12 230 / 0.4)",
    icon: (
      <span
        style={{ color: "oklch(0.70 0.18 230)" }}
        className="text-base font-bold font-mono"
      >
        $
      </span>
    ),
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    bg: "oklch(0.20 0.06 60 / 0.4)",
    border: "oklch(0.50 0.15 60 / 0.4)",
    icon: (
      <Bitcoin className="w-4 h-4" style={{ color: "oklch(0.72 0.20 60)" }} />
    ),
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    bg: "oklch(0.20 0.05 265 / 0.4)",
    border: "oklch(0.45 0.12 265 / 0.4)",
    icon: (
      <span
        style={{ color: "oklch(0.75 0.14 265)" }}
        className="text-sm font-bold"
      >
        ♦
      </span>
    ),
  },
  {
    symbol: "ICP",
    name: "Internet Computer",
    bg: "oklch(0.18 0.06 295 / 0.4)",
    border: "oklch(0.45 0.18 295 / 0.4)",
    icon: (
      <span
        style={{ color: "oklch(0.75 0.22 295)" }}
        className="text-[10px] font-bold tracking-tight"
      >
        ICP
      </span>
    ),
  },
];

export default function WalletPage() {
  const { walletAddress } = useAuth();
  const [copiedContract, setCopiedContract] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  function handleCopyContract() {
    navigator.clipboard.writeText(AFUK_CONTRACT);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  }

  function handleCopyAddress() {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  }

  const truncated = walletAddress
    ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}`
    : null;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.09 0.025 265) 0%, oklch(0.11 0.02 280) 50%, oklch(0.10 0.03 310) 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305))",
                boxShadow: "0 0 20px oklch(0.55 0.24 295 / 0.4)",
              }}
            >
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <h1
              className="text-2xl font-display font-bold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.96 0.01 265), oklch(0.85 0.12 295))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              My Wallet
            </h1>
          </div>

          {/* Wallet Address */}
          <div
            className="flex items-center gap-2 mt-4 px-4 py-3 rounded-xl"
            style={{
              background: "oklch(0.14 0.025 265 / 0.6)",
              border: "1px solid oklch(0.28 0.04 265 / 0.5)",
            }}
          >
            {walletAddress ? (
              <>
                <div className="flex-1">
                  <p
                    className="text-xs font-ui mb-0.5"
                    style={{ color: "oklch(0.55 0.04 265)" }}
                  >
                    Connected Wallet
                  </p>
                  <p
                    className="font-mono text-sm font-medium"
                    style={{ color: "oklch(0.90 0.04 265)" }}
                    data-ocid="wallet.address.panel"
                  >
                    {truncated}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  data-ocid="wallet.address.button"
                  className="p-2 rounded-lg transition-colors hover:bg-white/5"
                  title="Copy full address"
                >
                  {copiedAddress ? (
                    <Check
                      className="w-4 h-4"
                      style={{ color: "oklch(0.70 0.20 145)" }}
                    />
                  ) : (
                    <Copy
                      className="w-4 h-4"
                      style={{ color: "oklch(0.60 0.04 265)" }}
                    />
                  )}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3 w-full">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "oklch(0.60 0.22 40)" }}
                />
                <p
                  className="text-sm font-ui"
                  style={{ color: "oklch(0.60 0.04 265)" }}
                >
                  No wallet connected —{" "}
                  <a
                    href="#/"
                    className="underline transition-opacity hover:opacity-80"
                    style={{ color: "oklch(0.72 0.18 295)" }}
                  >
                    Connect now
                  </a>
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Buy AFUK Token — Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-6"
        >
          <Card
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "oklch(0.11 0.02 265 / 0.92)",
              borderColor: "oklch(0.40 0.18 295 / 0.5)",
              boxShadow:
                "0 0 40px oklch(0.55 0.24 295 / 0.2), 0 0 80px oklch(0.50 0.26 305 / 0.1)",
            }}
          >
            {/* Purple gradient top bar */}
            <div
              className="h-1 w-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340), oklch(0.55 0.24 295))",
              }}
            />
            <CardContent className="p-6">
              {/* AFUK Token Header */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0"
                  style={{
                    boxShadow: "0 0 20px oklch(0.55 0.24 295 / 0.3)",
                    border: "2px solid oklch(0.55 0.24 295 / 0.4)",
                  }}
                >
                  <img
                    src="/assets/afuktokenlogo1-019d58aa-bef5-707a-b33c-a98d6dbac4d8.png"
                    alt="AFUK Token"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2
                      className="text-xl font-display font-bold"
                      style={{ color: "oklch(0.96 0.01 265)" }}
                    >
                      AFUK Token
                    </h2>
                    <Badge
                      className="text-[10px] font-ui font-semibold px-2 py-0.5 rounded-full border-0"
                      style={{
                        background: "oklch(0.55 0.24 295 / 0.2)",
                        color: "oklch(0.82 0.18 295)",
                        border: "1px solid oklch(0.55 0.24 295 / 0.4)",
                      }}
                    >
                      ERC-20
                    </Badge>
                  </div>
                  <p
                    className="text-sm font-ui mt-0.5"
                    style={{ color: "oklch(0.62 0.08 295)" }}
                  >
                    Base Mainnet
                  </p>
                  <p
                    className="text-xs font-ui mt-1.5 leading-relaxed"
                    style={{ color: "oklch(0.58 0.04 265)" }}
                  >
                    AFUK is the native token of the LoveLink ecosystem. Use it
                    to tip matches and unlock premium features.
                  </p>
                </div>
              </div>

              {/* Contract Address */}
              <div
                className="flex items-center gap-2 mb-5 px-3 py-2.5 rounded-xl"
                style={{
                  background: "oklch(0.14 0.025 265 / 0.6)",
                  border: "1px solid oklch(0.35 0.10 295 / 0.4)",
                }}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[10px] font-ui uppercase tracking-widest mb-0.5"
                    style={{ color: "oklch(0.55 0.06 295)" }}
                  >
                    Contract Address
                  </p>
                  <p
                    className="font-mono text-xs truncate"
                    style={{ color: "oklch(0.80 0.08 295)" }}
                    data-ocid="wallet.contract.panel"
                  >
                    {AFUK_CONTRACT}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyContract}
                  data-ocid="wallet.contract.button"
                  className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-ui font-medium transition-all"
                  style={{
                    background: copiedContract
                      ? "oklch(0.35 0.14 145 / 0.3)"
                      : "oklch(0.55 0.24 295 / 0.15)",
                    color: copiedContract
                      ? "oklch(0.70 0.20 145)"
                      : "oklch(0.75 0.18 295)",
                    border: `1px solid ${
                      copiedContract
                        ? "oklch(0.50 0.18 145 / 0.4)"
                        : "oklch(0.55 0.24 295 / 0.3)"
                    }`,
                  }}
                >
                  {copiedContract ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://app.uniswap.org/#/swap?outputCurrency=${AFUK_CONTRACT}&chain=base`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="wallet.buy_afuk.primary_button"
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-ui font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305))",
                    color: "white",
                    boxShadow: "0 0 24px oklch(0.55 0.24 295 / 0.4)",
                  }}
                >
                  <img
                    src="https://app.uniswap.org/favicon.ico"
                    alt=""
                    className="w-4 h-4 rounded-sm"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  Buy on Uniswap
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href={`https://basescan.org/token/${AFUK_CONTRACT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="wallet.basescan.secondary_button"
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-ui font-semibold text-sm transition-all hover:bg-white/5 active:scale-[0.98]"
                  style={{
                    border: "1px solid oklch(0.35 0.10 295 / 0.6)",
                    color: "oklch(0.72 0.12 295)",
                  }}
                >
                  View on Basescan
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Token Balances */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <Card
            className="rounded-2xl border"
            style={{
              background: "oklch(0.11 0.02 265 / 0.92)",
              borderColor: "oklch(0.28 0.04 265 / 0.5)",
            }}
          >
            <CardHeader className="pb-3 pt-5 px-6">
              <CardTitle
                className="text-base font-display font-bold flex items-center gap-2 flex-wrap"
                style={{ color: "oklch(0.90 0.04 265)" }}
              >
                Token Balances
                {!walletAddress && (
                  <span
                    className="text-[11px] font-ui font-normal px-2 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.20 0.04 60 / 0.4)",
                      color: "oklch(0.72 0.18 60)",
                      border: "1px solid oklch(0.45 0.14 60 / 0.4)",
                    }}
                  >
                    Connect wallet to view balances
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-5">
              <div
                className="flex flex-col gap-2"
                data-ocid="wallet.balances.list"
              >
                {TOKENS.map((token, i) => (
                  <motion.div
                    key={token.symbol}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 + i * 0.06 }}
                    data-ocid={`wallet.balance.item.${i + 1}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-white/[0.02]"
                    style={{
                      background: token.bg,
                      border: `1px solid ${token.border}`,
                    }}
                  >
                    {/* Token Icon */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: token.bg,
                        border: `1.5px solid ${token.border}`,
                      }}
                    >
                      {token.icon}
                    </div>

                    {/* Token Name */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-ui font-semibold leading-none mb-0.5"
                        style={{ color: "oklch(0.88 0.03 265)" }}
                      >
                        {token.symbol}
                      </p>
                      <p
                        className="text-xs font-ui truncate"
                        style={{ color: "oklch(0.55 0.03 265)" }}
                      >
                        {token.name}
                      </p>
                    </div>

                    {/* Balance */}
                    <div className="text-right">
                      <p
                        className="text-sm font-mono font-semibold"
                        style={{
                          color: walletAddress
                            ? "oklch(0.88 0.03 265)"
                            : "oklch(0.40 0.03 265)",
                        }}
                      >
                        {walletAddress ? "0.00" : "—"}
                      </p>
                      <p
                        className="text-xs font-ui"
                        style={{ color: "oklch(0.42 0.03 265)" }}
                      >
                        {walletAddress ? "$0.00" : "—"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {!walletAddress && (
                <p
                  className="text-center text-xs font-ui mt-4"
                  style={{ color: "oklch(0.45 0.04 265)" }}
                  data-ocid="wallet.balances.empty_state"
                >
                  Connect your wallet from the top bar to see your balances
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer spacer */}
        <div className="h-6" />
      </div>
    </div>
  );
}
