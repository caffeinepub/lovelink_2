import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, CheckCircle, Coins, Copy, Loader2, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useState as useStateAlias } from "react";
import { toast } from "sonner";

const AFUK_CONTRACT = "0x2d0A4446f11Ff1554F4E387DA2162d8276daDE5d";

type TokenTab = "AFUK" | "USDC" | "ICP";

export interface TipTarget {
  name: string;
  age?: number;
  distance?: number;
}

interface TipModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: TipTarget;
}

function CopyableAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      data-ocid="tip.copy.button"
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-all hover:opacity-80 w-full"
      style={{
        background: "oklch(0.13 0.025 265)",
        border: "1px solid oklch(0.55 0.24 295 / 0.4)",
        color: "oklch(0.78 0.18 295)",
      }}
    >
      <span className="flex-1 truncate text-left">{address}</span>
      {copied ? (
        <Check className="w-3.5 h-3.5 flex-shrink-0 text-green-400" />
      ) : (
        <Copy className="w-3.5 h-3.5 flex-shrink-0" />
      )}
    </button>
  );
}

export default function TipModal({
  open,
  onOpenChange,
  target,
}: TipModalProps) {
  const [activeTab, setActiveTab] = useState<TokenTab>("AFUK");
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const QUICK_AMOUNTS: Record<TokenTab, string[]> = {
    AFUK: ["10", "50", "100", "500"],
    USDC: ["1", "5", "10", "50"],
    ICP: ["0.1", "0.5", "1", "5"],
  };

  const handleTabChange = (tab: TokenTab) => {
    setActiveTab(tab);
    setAmount("");
  };

  const handleTip = async () => {
    const parsed = Number.parseFloat(amount);
    if (Number.isNaN(parsed) || parsed <= 0) {
      toast.error(`Please enter a valid ${activeTab} amount`);
      return;
    }
    setIsSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsSending(false);
    setSuccess(true);
    toast.success(`${parsed} ${activeTab} tip sent to ${target.name}! 💜`);
    setTimeout(() => {
      setSuccess(false);
      setAmount("");
      onOpenChange(false);
    }, 2000);
  };

  const formatDist = (m: number) =>
    m < 1000 ? `${m}m away` : `${(m / 1000).toFixed(1)}km away`;

  const tabStyle = (tab: TokenTab) => ({
    background:
      activeTab === tab
        ? "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305), oklch(0.62 0.24 340))"
        : "oklch(0.18 0.025 265)",
    color: activeTab === tab ? "white" : "oklch(0.60 0.04 265)",
    border: activeTab === tab ? "none" : "1px solid oklch(0.28 0.04 265)",
    fontWeight: activeTab === tab ? "700" : "500",
    boxShadow:
      activeTab === tab ? "0 0 14px oklch(0.55 0.24 295 / 0.4)" : undefined,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-ocid="tip.dialog"
        className="max-w-sm"
        style={{
          background: "oklch(0.15 0.025 265)",
          border: "1px solid oklch(0.28 0.04 265)",
          boxShadow: "0 16px 48px oklch(0.05 0.01 265 / 0.8)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-2 font-display text-xl"
            style={{ color: "oklch(0.96 0.01 265)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
              style={{
                background: "oklch(0.13 0.025 265)",
                border: "1px solid oklch(0.35 0.10 295 / 0.5)",
              }}
            >
              <img
                src="/assets/afuktokenlogo1-019d58aa-bef5-707a-b33c-a98d6dbac4d8.png"
                alt="AFUK"
                className="w-7 h-7 object-contain"
              />
            </div>
            Tip {target.name}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-3 py-6"
              data-ocid="tip.success_state"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
                }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <p
                className="font-ui font-semibold"
                style={{ color: "oklch(0.96 0.01 265)" }}
              >
                Tip Sent!
              </p>
              <p
                className="text-sm text-center px-4"
                style={{ color: "oklch(0.60 0.04 265)" }}
              >
                Your {activeTab} tip has been sent to {target.name} 💜
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="py-2 space-y-4">
                {/* Profile summary */}
                <div
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: "oklch(0.18 0.025 265)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
                      color: "white",
                    }}
                  >
                    {target.name[0]}
                  </div>
                  <div>
                    <p
                      className="font-ui font-semibold text-sm"
                      style={{ color: "oklch(0.96 0.01 265)" }}
                    >
                      {target.name}
                      {target.age ? `, ${target.age}` : ""}
                    </p>
                    {target.distance !== undefined && (
                      <p
                        className="text-xs flex items-center gap-1"
                        style={{ color: "oklch(0.60 0.04 265)" }}
                      >
                        <MapPin className="w-3 h-3" />
                        {formatDist(target.distance)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Token tabs */}
                <div className="flex gap-1.5">
                  {(["AFUK", "USDC", "ICP"] as TokenTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      data-ocid={`tip.${tab.toLowerCase()}.tab`}
                      onClick={() => handleTabChange(tab)}
                      className="flex-1 py-2 px-2 rounded-xl text-sm font-ui transition-all flex items-center justify-center gap-1.5"
                      style={tabStyle(tab)}
                    >
                      {tab === "AFUK" && (
                        <img
                          src="/assets/afuktokenlogo1-019d58aa-bef5-707a-b33c-a98d6dbac4d8.png"
                          alt="AFUK"
                          className="w-4 h-4 object-contain rounded-full"
                        />
                      )}
                      {tab === "USDC" && (
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                          style={{ background: "oklch(0.40 0.18 240)" }}
                        >
                          $
                        </span>
                      )}
                      {tab === "ICP" && <Coins className="w-4 h-4" />}
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-3"
                  >
                    {activeTab === "AFUK" && (
                      <div
                        className="rounded-xl p-3 space-y-2"
                        style={{
                          background: "oklch(0.55 0.24 295 / 0.08)",
                          border: "1px solid oklch(0.55 0.24 295 / 0.25)",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src="/assets/afuktokenlogo1-019d58aa-bef5-707a-b33c-a98d6dbac4d8.png"
                              alt="AFUK"
                              className="w-6 h-6 rounded-full object-contain"
                            />
                            <span
                              className="text-sm font-ui font-bold"
                              style={{ color: "oklch(0.82 0.18 295)" }}
                            >
                              AFUK Token
                            </span>
                          </div>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{
                              background: "oklch(0.55 0.24 295 / 0.15)",
                              color: "oklch(0.82 0.18 295)",
                            }}
                          >
                            Base Mainnet
                          </span>
                        </div>
                        <p
                          className="text-xs"
                          style={{ color: "oklch(0.60 0.04 265)" }}
                        >
                          Contract Address (ERC-20)
                        </p>
                        <CopyableAddress address={AFUK_CONTRACT} />
                      </div>
                    )}

                    {activeTab === "USDC" && (
                      <div
                        className="rounded-xl p-3"
                        style={{
                          background: "oklch(0.40 0.18 240 / 0.08)",
                          border: "1px solid oklch(0.40 0.18 240 / 0.25)",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: "oklch(0.40 0.18 240)" }}
                          >
                            $
                          </span>
                          <span
                            className="text-sm font-ui font-bold"
                            style={{ color: "oklch(0.70 0.15 240)" }}
                          >
                            USD Coin (USDC)
                          </span>
                        </div>
                        <p
                          className="text-xs mt-1"
                          style={{ color: "oklch(0.60 0.04 265)" }}
                        >
                          Stablecoin · 1 USDC = $1.00
                        </p>
                      </div>
                    )}

                    {activeTab === "ICP" && (
                      <div
                        className="rounded-xl p-3"
                        style={{
                          background: "oklch(0.55 0.24 295 / 0.06)",
                          border: "1px solid oklch(0.55 0.24 295 / 0.2)",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Coins
                            className="w-5 h-5"
                            style={{ color: "oklch(0.70 0.20 295)" }}
                          />
                          <span
                            className="text-sm font-ui font-bold"
                            style={{ color: "oklch(0.75 0.15 295)" }}
                          >
                            Internet Computer
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Amount input */}
                    <div className="space-y-2">
                      <Label
                        className="text-sm font-ui font-medium"
                        style={{ color: "oklch(0.75 0.04 265)" }}
                      >
                        Amount ({activeTab})
                      </Label>
                      <div className="relative">
                        <Input
                          data-ocid="tip.input"
                          type="number"
                          min="0.01"
                          placeholder={QUICK_AMOUNTS[activeTab][1]}
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleTip()}
                          className="pr-16"
                          style={{
                            background: "oklch(0.18 0.025 265)",
                            borderColor: "oklch(0.28 0.04 265)",
                            color: "oklch(0.96 0.01 265)",
                          }}
                        />
                        <span
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-ui font-medium"
                          style={{ color: "oklch(0.70 0.18 295)" }}
                        >
                          {activeTab}
                        </span>
                      </div>
                      {/* Quick amounts */}
                      <div className="flex gap-2">
                        {QUICK_AMOUNTS[activeTab].map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setAmount(v)}
                            className="flex-1 py-1.5 rounded-lg text-xs font-ui font-medium transition-all"
                            style={{
                              background:
                                amount === v
                                  ? "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))"
                                  : "oklch(0.18 0.025 265)",
                              color:
                                amount === v ? "white" : "oklch(0.60 0.04 265)",
                              border: "1px solid oklch(0.28 0.04 265)",
                            }}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <DialogFooter className="gap-2 mt-2">
                <Button
                  variant="ghost"
                  data-ocid="tip.cancel_button"
                  onClick={() => onOpenChange(false)}
                  style={{ color: "oklch(0.60 0.04 265)" }}
                >
                  Cancel
                </Button>
                <Button
                  data-ocid="tip.confirm_button"
                  disabled={isSending}
                  onClick={handleTip}
                  className="font-ui font-semibold border-0 flex items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305), oklch(0.62 0.24 340))",
                    color: "white",
                    boxShadow: "0 0 14px oklch(0.55 0.24 295 / 0.4)",
                  }}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      {activeTab === "AFUK" && (
                        <img
                          src="/assets/afuktokenlogo1-019d58aa-bef5-707a-b33c-a98d6dbac4d8.png"
                          alt="AFUK"
                          className="w-4 h-4 object-contain rounded-full"
                        />
                      )}
                      {activeTab !== "AFUK" && <Coins className="w-4 h-4" />}
                      Send {activeTab} Tip
                    </>
                  )}
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
