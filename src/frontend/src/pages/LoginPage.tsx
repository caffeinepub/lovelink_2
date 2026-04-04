import { useAuth } from "@/App";
import { useWalletConnect } from "@/hooks/useWalletConnect";
import { useNavigate } from "@/router";
import { Heart, MapPin, Shield, Wallet, Zap } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function LoginPage() {
  const { setLoggedIn, setCurrentUser, setWalletAddress } = useAuth();
  const navigate = useNavigate();
  const { connect, isConnecting } = useWalletConnect();

  const handleWalletConnect = async () => {
    const address = await connect();
    if (address) {
      setWalletAddress(address);
      setLoggedIn(true);
      toast.success(
        `Wallet connected: ${address.slice(0, 6)}...${address.slice(-4)}`,
      );
      navigate("/explore");
    } else {
      // Demo mode — allow login without MetaMask
      setLoggedIn(true);
      navigate("/explore");
    }
  };

  const handleIILogin = () => {
    setCurrentUser({ name: "Explorer" });
    setLoggedIn(true);
    navigate("/explore");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.09 0.025 265) 0%, oklch(0.11 0.02 280) 50%, oklch(0.10 0.03 310) 100%)",
      }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305))",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.50 0.26 305), oklch(0.62 0.24 340))",
          }}
        />
        <div
          className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "oklch(0.62 0.24 340)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-md px-8 w-full"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <div
            className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-4 animate-float overflow-hidden"
            style={{
              boxShadow:
                "0 0 40px oklch(0.55 0.24 295 / 0.5), 0 0 80px oklch(0.50 0.26 305 / 0.3)",
              background: "oklch(0.13 0.025 265)",
              border: "1px solid oklch(0.35 0.10 295 / 0.5)",
            }}
          >
            <img
              src="/assets/afuktokenlogo1-019d58aa-bef5-707a-b33c-a98d6dbac4d8.png"
              alt="LoveLink"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Brand */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-display text-6xl font-bold mb-3"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.96 0.01 265), oklch(0.85 0.14 295), oklch(0.82 0.18 340))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          LoveLink
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl font-ui mb-2"
          style={{ color: "oklch(0.78 0.04 265)" }}
        >
          Find your connection, on-chain
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm mb-10 leading-relaxed"
          style={{ color: "oklch(0.55 0.04 265)" }}
        >
          Discover nearby matches, send AFUK tips to show affection, and build
          meaningful connections powered by Web3.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {[
            { icon: Heart, label: "Smart Matching" },
            { icon: Zap, label: "AFUK Tips" },
            { icon: MapPin, label: "Nearby First" },
            { icon: Shield, label: "Self-Sovereign" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-ui font-medium"
              style={{
                background: "oklch(0.15 0.025 265 / 0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid oklch(0.28 0.04 265 / 0.6)",
                color: "oklch(0.80 0.04 265)",
              }}
            >
              <Icon
                className="w-3.5 h-3.5"
                style={{ color: "oklch(0.75 0.20 295)" }}
              />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Login buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="w-full space-y-3"
        >
          {/* EVM Wallet Connect */}
          <button
            type="button"
            data-ocid="login.primary_button"
            onClick={handleWalletConnect}
            disabled={isConnecting}
            className="w-full py-4 px-6 rounded-2xl text-base font-ui font-semibold flex items-center justify-center gap-2.5 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305), oklch(0.62 0.24 340))",
              color: "white",
              boxShadow:
                "0 0 24px oklch(0.55 0.24 295 / 0.5), 0 4px 12px oklch(0.05 0.01 265 / 0.4)",
            }}
          >
            {isConnecting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5" />
                Connect EVM Wallet
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: "oklch(1 0 0 / 0.15)", color: "white" }}
                >
                  MetaMask
                </span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div
              className="flex-1 h-px"
              style={{ background: "oklch(0.28 0.04 265)" }}
            />
            <span
              className="text-xs font-ui"
              style={{ color: "oklch(0.45 0.04 265)" }}
            >
              or
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "oklch(0.28 0.04 265)" }}
            />
          </div>

          {/* Internet Identity */}
          <button
            type="button"
            data-ocid="login.secondary_button"
            onClick={handleIILogin}
            className="w-full py-4 px-6 rounded-2xl text-base font-ui font-semibold flex items-center justify-center gap-2.5 transition-all hover:bg-white/5 border"
            style={{
              background: "oklch(0.16 0.025 265)",
              borderColor: "oklch(0.32 0.08 295 / 0.6)",
              color: "oklch(0.88 0.04 265)",
            }}
          >
            <Shield
              className="w-5 h-5"
              style={{ color: "oklch(0.75 0.18 295)" }}
            />
            Sign in with Internet Identity
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 text-xs"
          style={{ color: "oklch(0.42 0.03 265)" }}
        >
          Secured by the Internet Computer · No passwords · Fully on-chain
        </motion.p>
      </motion.div>

      {/* Footer */}
      <footer
        className="absolute bottom-6 text-xs"
        style={{ color: "oklch(0.38 0.03 265)" }}
      >
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-70 transition-opacity"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
