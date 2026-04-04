import { type Gender, type Intent, type Orientation, useAuth } from "@/App";
import Layout from "@/components/Layout";
import TipModal, { type TipTarget } from "@/components/TipModal";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronUp,
  Coins,
  Filter,
  Heart,
  MapPin,
  Settings2,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Mock profile data ───
export interface MockProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  orientation: Orientation;
  intent: Intent;
  distance: number; // meters
  bio: string;
  interests: string[];
  photoColor: string;
  photoCount: number;
  photoUrl?: string;
}

const PHOTOS = [
  "/assets/generated/profile-1.dim_400x500.jpg",
  "/assets/generated/profile-2.dim_400x500.jpg",
  "/assets/generated/profile-3.dim_400x500.jpg",
  "/assets/generated/profile-4.dim_400x500.jpg",
  "/assets/generated/profile-5.dim_400x500.jpg",
];

const MOCK_PROFILES: MockProfile[] = [
  {
    id: "1",
    name: "Sofia Martinez",
    age: 27,
    gender: "Female",
    orientation: "Straight",
    intent: "LongTerm",
    distance: 320,
    bio: "Adventure seeker ✨ Coffee addict ☕ Love hiking and discovering hidden city gems.",
    interests: ["Travel", "Photography", "Hiking"],
    photoColor: "#7C3AED",
    photoCount: 4,
    photoUrl: PHOTOS[0],
  },
  {
    id: "2",
    name: "James Chen",
    age: 30,
    gender: "Male",
    orientation: "Straight",
    intent: "Casual",
    distance: 850,
    bio: "Software engineer by day, chef by night 🍳 Passionate about tech and food.",
    interests: ["Tech", "Cooking", "Music"],
    photoColor: "#2563EB",
    photoCount: 2,
    photoUrl: PHOTOS[1],
  },
  {
    id: "3",
    name: "Emma Rosewood",
    age: 25,
    gender: "Female",
    orientation: "Bisexual",
    intent: "FunNow",
    distance: 1200,
    bio: "Artist and yoga teacher living in vivid color 🌈 Let’s make art together.",
    interests: ["Art", "Yoga", "Nature"],
    photoColor: "#DB2777",
    photoCount: 5,
    photoUrl: PHOTOS[2],
  },
  {
    id: "4",
    name: "Luca Romano",
    age: 32,
    gender: "Male",
    orientation: "Straight",
    intent: "LongTerm",
    distance: 2100,
    bio: "Marine biologist 🌊 Surfing, stargazing, writing a novel. Beach adventures await!",
    interests: ["Ocean", "Surfing", "Writing"],
    photoColor: "#0D9488",
    photoCount: 3,
    photoUrl: PHOTOS[3],
  },
  {
    id: "5",
    name: "Aria Thompson",
    age: 28,
    gender: "Female",
    orientation: "Straight",
    intent: "Casual",
    distance: 3500,
    bio: "Fashion designer with a love for vintage finds and indie music 🎵",
    interests: ["Fashion", "Music", "Film"],
    photoColor: "#9333EA",
    photoCount: 5,
    photoUrl: PHOTOS[4],
  },
  {
    id: "6",
    name: "Marcus Webb",
    age: 29,
    gender: "Male",
    orientation: "Gay",
    intent: "LongTerm",
    distance: 600,
    bio: "Theater director who loves Shakespeare and good wine. Let’s debate literature.",
    interests: ["Theater", "Literature", "Wine"],
    photoColor: "#7C3AED",
    photoCount: 2,
  },
  {
    id: "7",
    name: "Yuki Tanaka",
    age: 26,
    gender: "Female",
    orientation: "Gay",
    intent: "FunNow",
    distance: 1800,
    bio: "Game dev and manga enthusiast 🎮 Tokyo native, now exploring the world.",
    interests: ["Gaming", "Anime", "Travel"],
    photoColor: "#EC4899",
    photoCount: 3,
  },
  {
    id: "8",
    name: "Dani Rivera",
    age: 24,
    gender: "Non-binary",
    orientation: "Bisexual",
    intent: "Casual",
    distance: 4200,
    bio: "Poet and barista. I make both espresso and heartfelt verses ☕📝",
    interests: ["Poetry", "Coffee", "Music"],
    photoColor: "#EA580C",
    photoCount: 1,
  },
  {
    id: "9",
    name: "Nina Okafor",
    age: 31,
    gender: "Female",
    orientation: "Straight",
    intent: "LongTerm",
    distance: 5800,
    bio: "ER doctor by day, jazz saxophonist by night 🎷 Life is music.",
    interests: ["Medicine", "Jazz", "Art"],
    photoColor: "#16A34A",
    photoCount: 4,
  },
  {
    id: "10",
    name: "Alex Storm",
    age: 27,
    gender: "Non-binary",
    orientation: "Bisexual",
    intent: "FunNow",
    distance: 2700,
    bio: "Skateboarder 🛹 Street photographer. Chasing golden hour every day.",
    interests: ["Skateboarding", "Photography", "Hip-hop"],
    photoColor: "#D97706",
    photoCount: 3,
  },
  {
    id: "11",
    name: "Ryan McAllister",
    age: 33,
    gender: "Male",
    orientation: "Gay",
    intent: "LongTerm",
    distance: 980,
    bio: "Architect obsessed with sustainable design 🏗️ Kayaking on weekends.",
    interests: ["Architecture", "Nature", "Kayaking"],
    photoColor: "#2563EB",
    photoCount: 2,
  },
  {
    id: "12",
    name: "Priya Sharma",
    age: 26,
    gender: "Female",
    orientation: "Bisexual",
    intent: "Casual",
    distance: 7100,
    bio: "Data scientist 📊 + Bollywood dancer 💃 Numbers and rhythm.",
    interests: ["Data", "Dance", "Travel"],
    photoColor: "#9333EA",
    photoCount: 5,
  },
];

type GenderFilter = "All" | "Women" | "Men" | "Non-binary";
type IntentFilter = "All" | "LongTerm" | "Casual" | "FunNow";
type DistanceFilter = "1km" | "5km" | "25km" | "Any";

const INTENT_LABELS: Record<string, string> = {
  LongTerm: "💑 Long term",
  Casual: "😊 Casual",
  FunNow: "⚡ Fun now",
};

const GENDER_FILTER_LABELS: GenderFilter[] = [
  "All",
  "Women",
  "Men",
  "Non-binary",
];
const INTENT_FILTER_LABELS: { value: IntentFilter; label: string }[] = [
  { value: "All", label: "All" },
  { value: "LongTerm", label: "💑 Long term" },
  { value: "Casual", label: "😊 Casual" },
  { value: "FunNow", label: "⚡ Fun now" },
];
const DISTANCE_FILTER_LABELS: DistanceFilter[] = ["1km", "5km", "25km", "Any"];

function formatDist(m: number): string {
  return m < 1000 ? `${m}m away` : `${(m / 1000).toFixed(1)}km away`;
}

function FilterChip({
  active,
  onClick,
  children,
  ocid,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ocid?: string;
}) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onClick}
      className="px-4 py-2 rounded-full text-sm font-ui font-medium transition-all whitespace-nowrap"
      style={{
        background: active
          ? "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))"
          : "oklch(0.16 0.025 265)",
        color: active ? "white" : "oklch(0.62 0.04 265)",
        border: active ? "none" : "1px solid oklch(0.28 0.04 265)",
        boxShadow: active ? "0 0 12px oklch(0.55 0.24 295 / 0.35)" : undefined,
      }}
    >
      {children}
    </button>
  );
}

function ProfileCard({
  profile,
  index,
  onTip,
  onLike,
  onDislike,
}: {
  profile: MockProfile;
  index: number;
  onTip: () => void;
  onLike: () => void;
  onDislike: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      data-ocid={`explore.card.item.${index + 1}`}
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "oklch(0.15 0.025 265 / 0.75)",
        backdropFilter: "blur(16px)",
        border: "1px solid oklch(0.28 0.04 265 / 0.6)",
        boxShadow: "0 4px 24px oklch(0.05 0.01 265 / 0.5)",
      }}
    >
      {/* Photo area */}
      <div className="relative h-56 overflow-hidden">
        {profile.photoUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${profile.photoUrl})` }}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${profile.photoColor}66 0%, ${profile.photoColor}33 100%)`,
            }}
          >
            <span
              className="font-display text-7xl font-bold opacity-40"
              style={{ color: profile.photoColor }}
            >
              {profile.name[0]}
            </span>
          </div>
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.12 0.02 265) 0%, transparent 60%)",
          }}
        />

        {/* Distance badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-ui font-semibold distance-badge">
            <MapPin className="w-3 h-3" />
            {formatDist(profile.distance)}
          </span>
        </div>

        {/* Photo count */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-ui font-medium"
            style={{
              background: "oklch(0.12 0.02 265 / 0.85)",
              color: "oklch(0.70 0.04 265)",
              backdropFilter: "blur(8px)",
            }}
          >
            {profile.photoCount} 📷
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3
            className="font-display text-xl font-bold"
            style={{ color: "oklch(0.96 0.01 265)" }}
          >
            {profile.name}, {profile.age}
          </h3>
        </div>

        {/* Intent label */}
        <span
          className="inline-flex w-fit items-center px-2.5 py-1 rounded-full text-xs font-ui font-semibold mb-2"
          style={{
            background: "oklch(0.55 0.24 295 / 0.15)",
            border: "1px solid oklch(0.55 0.24 295 / 0.3)",
            color: "oklch(0.80 0.18 295)",
          }}
        >
          {INTENT_LABELS[profile.intent]}
        </span>

        <p
          className="text-xs leading-relaxed mb-3 line-clamp-2 flex-1"
          style={{ color: "oklch(0.65 0.04 265)" }}
        >
          {profile.bio}
        </p>

        {/* Interests */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {profile.interests.slice(0, 3).map((i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-full text-xs font-ui"
              style={{
                background: "oklch(0.20 0.03 265)",
                color: "oklch(0.68 0.04 265)",
                border: "1px solid oklch(0.28 0.04 265)",
              }}
            >
              {i}
            </span>
          ))}
        </div>

        {/* Like / Dislike */}
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            data-ocid={`explore.dislike.button.${index + 1}`}
            onClick={onDislike}
            className="flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 text-sm font-ui transition-all hover:opacity-80"
            style={{
              background: "oklch(0.18 0.025 265)",
              border: "1px solid oklch(0.28 0.04 265)",
              color: "oklch(0.65 0.22 27)",
            }}
          >
            <X className="w-4 h-4" /> Pass
          </button>
          <button
            type="button"
            data-ocid={`explore.like.button.${index + 1}`}
            onClick={onLike}
            className="flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 text-sm font-ui transition-all hover:opacity-80"
            style={{
              background: "oklch(0.18 0.025 265)",
              border: "1px solid oklch(0.65 0.20 155 / 0.4)",
              color: "oklch(0.65 0.20 155)",
            }}
          >
            <Heart className="w-4 h-4" /> Like
          </button>
        </div>

        {/* Tip button - PURPLE */}
        <button
          type="button"
          data-ocid={`explore.tip.button.${index + 1}`}
          onClick={onTip}
          className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-ui font-semibold transition-all hover:opacity-90"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305), oklch(0.62 0.24 340))",
            color: "white",
            boxShadow: "0 0 14px oklch(0.55 0.24 295 / 0.4)",
          }}
        >
          <img
            src="/assets/afuktokenlogo1-019d58aa-bef5-707a-b33c-a98d6dbac4d8.png"
            alt="AFUK"
            className="w-4 h-4 object-contain rounded-full"
          />
          Tip with AFUK
        </button>
      </div>
    </motion.div>
  );
}

export default function ExplorePage() {
  const { currentUser } = useAuth();
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("All");
  const [intentFilter, setIntentFilter] = useState<IntentFilter>("All");
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>("Any");
  const [prefOrientation, setPrefOrientation] = useState<Orientation>(
    currentUser.orientation,
  );
  const [prefOpen, setPrefOpen] = useState(false);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [disliked, setDisliked] = useState<Set<string>>(new Set());
  const [tipTarget, setTipTarget] = useState<TipTarget | null>(null);

  const maxDistance =
    distanceFilter === "1km"
      ? 1000
      : distanceFilter === "5km"
        ? 5000
        : distanceFilter === "25km"
          ? 25000
          : Number.POSITIVE_INFINITY;

  const filtered = MOCK_PROFILES.filter((p) => {
    // Skip liked/disliked
    if (liked.has(p.id) || disliked.has(p.id)) return false;

    // Orientation-based filter (can be overridden by preferences panel)
    const userOrientation = prefOrientation;
    if (userOrientation === "Straight") {
      if (currentUser.gender === "Male" && p.gender === "Male") return false;
      if (currentUser.gender === "Female" && p.gender === "Female")
        return false;
    } else if (userOrientation === "Gay") {
      if (p.gender !== currentUser.gender) return false;
    }
    // Bisexual / Other: show all

    // Gender filter chip override
    if (genderFilter === "Women" && p.gender !== "Female") return false;
    if (genderFilter === "Men" && p.gender !== "Male") return false;
    if (genderFilter === "Non-binary" && p.gender !== "Non-binary")
      return false;

    // Intent filter
    if (intentFilter !== "All" && p.intent !== intentFilter) return false;

    // Distance filter
    if (p.distance > maxDistance) return false;

    return true;
  });

  // Sort by distance
  const sorted = [...filtered].sort((a, b) => a.distance - b.distance);

  const handleLike = (id: string) => {
    setLiked((prev) => new Set([...prev, id]));
  };
  const handleDislike = (id: string) => {
    setDisliked((prev) => new Set([...prev, id]));
  };

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        {/* Heading */}
        <div className="mb-6">
          <h1
            className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider mb-1"
            data-ocid="explore.page"
            style={{ color: "oklch(0.96 0.01 265)" }}
          >
            Discover Matches Nearby
          </h1>
          <p
            className="text-sm flex items-center gap-1.5"
            style={{ color: "oklch(0.58 0.04 265)" }}
          >
            <MapPin
              className="w-4 h-4"
              style={{ color: "oklch(0.70 0.18 295)" }}
            />
            Profiles sorted by proximity, closest first
          </p>
        </div>

        {/* Filter chips row */}
        <div
          className="flex flex-wrap gap-2 mb-4"
          data-ocid="explore.filter.tab"
        >
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="text-xs font-ui font-medium mr-1"
              style={{ color: "oklch(0.55 0.04 265)" }}
            >
              Gender:
            </span>
            {GENDER_FILTER_LABELS.map((g) => (
              <FilterChip
                key={g}
                active={genderFilter === g}
                onClick={() => setGenderFilter(g)}
              >
                {g}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="text-xs font-ui font-medium mr-1"
              style={{ color: "oklch(0.55 0.04 265)" }}
            >
              Intent:
            </span>
            {INTENT_FILTER_LABELS.map(({ value, label }) => (
              <FilterChip
                key={value}
                active={intentFilter === value}
                onClick={() => setIntentFilter(value)}
              >
                {label}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="text-xs font-ui font-medium mr-1"
              style={{ color: "oklch(0.55 0.04 265)" }}
            >
              Distance:
            </span>
            {DISTANCE_FILTER_LABELS.map((d) => (
              <FilterChip
                key={d}
                active={distanceFilter === d}
                onClick={() => setDistanceFilter(d)}
              >
                {d}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* Preferences collapsible */}
        <Collapsible
          open={prefOpen}
          onOpenChange={setPrefOpen}
          className="mb-6"
        >
          <CollapsibleTrigger asChild>
            <button
              type="button"
              data-ocid="explore.preferences.toggle"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-ui font-medium transition-all"
              style={{
                background: "oklch(0.16 0.025 265)",
                border: "1px solid oklch(0.28 0.04 265)",
                color: "oklch(0.75 0.04 265)",
              }}
            >
              <Settings2 className="w-4 h-4" />
              Preferences
              {prefOpen ? (
                <ChevronUp className="w-3.5 h-3.5 ml-1" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 ml-1" />
              )}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div
              className="mt-2 p-4 rounded-2xl"
              style={{
                background: "oklch(0.14 0.025 265 / 0.85)",
                border: "1px solid oklch(0.26 0.04 265 / 0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p
                className="text-xs font-ui font-semibold mb-3"
                style={{ color: "oklch(0.70 0.04 265)" }}
              >
                I’M INTERESTED IN
              </p>
              <div className="flex gap-2 flex-wrap">
                {(
                  ["Straight", "Gay", "Bisexual", "Other"] as Orientation[]
                ).map((o) => (
                  <FilterChip
                    key={o}
                    active={prefOrientation === o}
                    onClick={() => setPrefOrientation(o)}
                    ocid={`explore.orientation.${o.toLowerCase()}.toggle`}
                  >
                    {o}
                  </FilterChip>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Cards grid */}
        {sorted.length === 0 ? (
          <div
            data-ocid="explore.empty_state"
            className="text-center py-20 rounded-2xl"
            style={{
              background: "oklch(0.14 0.025 265 / 0.7)",
              border: "1px solid oklch(0.26 0.04 265 / 0.5)",
            }}
          >
            <Heart
              className="w-16 h-16 mx-auto mb-4 opacity-20"
              style={{ color: "oklch(0.62 0.24 340)" }}
            />
            <h3
              className="font-display text-2xl font-bold mb-2"
              style={{ color: "oklch(0.96 0.01 265)" }}
            >
              No matches nearby
            </h3>
            <p className="text-sm" style={{ color: "oklch(0.55 0.04 265)" }}>
              Try adjusting your filters or expanding the distance
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sorted.map((p, i) => (
              <ProfileCard
                key={p.id}
                profile={p}
                index={i}
                onTip={() =>
                  setTipTarget({
                    name: p.name,
                    age: p.age,
                    distance: p.distance,
                  })
                }
                onLike={() => handleLike(p.id)}
                onDislike={() => handleDislike(p.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Tip Modal */}
      {tipTarget && (
        <TipModal
          open
          onOpenChange={(open) => !open && setTipTarget(null)}
          target={tipTarget}
        />
      )}
    </Layout>
  );
}
