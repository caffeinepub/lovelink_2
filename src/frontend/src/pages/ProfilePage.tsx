import { useAuth } from "@/App";
import Layout from "@/components/Layout";
import { useNavigate } from "@/router";
import { Camera, Coins, Edit3, Heart, MapPin } from "lucide-react";
import { motion } from "motion/react";

const SAMPLE_PHOTOS = [
  { url: "/assets/generated/profile-1.dim_400x500.jpg", id: "sp1" },
  { url: "/assets/generated/profile-3.dim_400x500.jpg", id: "sp2" },
  { url: "/assets/generated/profile-5.dim_400x500.jpg", id: "sp3" },
];

const EMPTY_SLOTS = ["e1", "e2"];

const SAMPLE_INTERESTS = ["Photography", "Hiking", "Travel", "Art", "Coffee"];

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const INTENT_LABELS: Record<string, string> = {
    LongTerm: "💑 Long term",
    Casual: "😊 Casual",
    FunNow: "⚡ Fun now",
  };

  return (
    <Layout>
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1
            className="font-display text-3xl sm:text-4xl font-bold"
            data-ocid="profile.page"
            style={{ color: "oklch(0.96 0.01 265)" }}
          >
            My Profile
          </h1>
          <button
            type="button"
            data-ocid="profile.edit_button"
            onClick={() => navigate("/profile/edit")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-ui font-medium transition-all hover:opacity-80"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
              color: "white",
              boxShadow: "0 0 12px oklch(0.55 0.24 295 / 0.35)",
            }}
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          {/* Header card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.15 0.025 265 / 0.75)",
              backdropFilter: "blur(16px)",
              border: "1px solid oklch(0.28 0.04 265 / 0.6)",
            }}
            data-ocid="profile.panel"
          >
            <div
              className="h-36 relative"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.24 295 / 0.3), oklch(0.62 0.24 340 / 0.3))",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.15 0.025 265) 0%, transparent 60%)",
                }}
              />
            </div>

            <div className="px-6 pb-6">
              <div className="flex items-end gap-4 -mt-12 mb-4">
                <div
                  className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-4 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${SAMPLE_PHOTOS[0].url})`,
                    borderColor: "oklch(0.15 0.025 265)",
                    boxShadow: "0 0 20px oklch(0.55 0.24 295 / 0.3)",
                  }}
                />
                <div className="pb-1">
                  <h2
                    className="font-display text-3xl font-bold"
                    style={{ color: "oklch(0.96 0.01 265)" }}
                  >
                    {currentUser.name}, 27
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-ui font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.55 0.24 295 / 0.15)",
                        border: "1px solid oklch(0.55 0.24 295 / 0.3)",
                        color: "oklch(0.80 0.18 295)",
                      }}
                    >
                      {INTENT_LABELS[currentUser.intent]}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.55 0.04 265)" }}
                    >
                      {currentUser.gender} · {currentUser.orientation}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "oklch(0.55 0.04 265)" }}
                    >
                      <MapPin className="w-3 h-3" /> Internet Computer
                    </span>
                  </div>
                </div>
              </div>

              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "oklch(0.72 0.04 265)" }}
              >
                Adventure seeker ✨ Coffee addict ☕ Love hiking, photography,
                and discovering hidden city gems. Looking for someone genuine to
                share new experiences with.
              </p>

              <div className="flex flex-wrap gap-2">
                {SAMPLE_INTERESTS.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 rounded-full text-xs font-ui font-medium"
                    style={{
                      background: "oklch(0.20 0.03 265)",
                      border: "1px solid oklch(0.28 0.04 265)",
                      color: "oklch(0.72 0.04 265)",
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 5-photo gallery */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "oklch(0.15 0.025 265 / 0.75)",
              backdropFilter: "blur(16px)",
              border: "1px solid oklch(0.28 0.04 265 / 0.6)",
            }}
          >
            <h3
              className="font-ui font-semibold text-sm mb-4 flex items-center gap-2"
              style={{ color: "oklch(0.75 0.04 265)" }}
            >
              <Camera
                className="w-4 h-4"
                style={{ color: "oklch(0.70 0.18 295)" }}
              />
              PHOTOS ({SAMPLE_PHOTOS.length}/5)
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {SAMPLE_PHOTOS.map(({ url, id }) => (
                <div
                  key={id}
                  className="aspect-square rounded-xl overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url(${url})` }}
                />
              ))}
              {EMPTY_SLOTS.map((slotId) => (
                <div
                  key={slotId}
                  className="aspect-square rounded-xl flex items-center justify-center"
                  style={{
                    background: "oklch(0.18 0.025 265)",
                    border: "1px dashed oklch(0.30 0.04 265)",
                  }}
                >
                  <Camera
                    className="w-6 h-6"
                    style={{ color: "oklch(0.40 0.04 265)" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="rounded-2xl p-5 text-center"
              style={{
                background: "oklch(0.15 0.025 265 / 0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(0.28 0.04 265 / 0.6)",
              }}
            >
              <div
                className="text-3xl font-display font-bold mb-1"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                4
              </div>
              <div
                className="text-sm flex items-center justify-center gap-1"
                style={{ color: "oklch(0.55 0.04 265)" }}
              >
                <Heart
                  className="w-3.5 h-3.5"
                  style={{ color: "oklch(0.62 0.24 340)" }}
                />{" "}
                Matches
              </div>
            </div>
            <div
              className="rounded-2xl p-5 text-center"
              style={{
                background: "oklch(0.15 0.025 265 / 0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(0.28 0.04 265 / 0.6)",
              }}
            >
              <div
                className="text-3xl font-display font-bold mb-1"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                1.2K
              </div>
              <div
                className="text-sm flex items-center justify-center gap-1"
                style={{ color: "oklch(0.55 0.04 265)" }}
              >
                <Coins
                  className="w-3.5 h-3.5"
                  style={{ color: "oklch(0.70 0.20 295)" }}
                />{" "}
                AFUK Received
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
