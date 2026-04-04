import { type Gender, type Intent, type Orientation, useAuth } from "@/App";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@/router";
import { ArrowLeft, Camera, Check, MapPin, Plus, Save, X } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type PhotoSlot = { url: string; file?: File; slotId: string } | null;

const INITIAL_PHOTOS: PhotoSlot[] = [
  { url: "/assets/generated/profile-1.dim_400x500.jpg", slotId: "slot-0" },
  { url: "/assets/generated/profile-3.dim_400x500.jpg", slotId: "slot-1" },
  null,
  null,
  null,
];

export default function EditProfilePage() {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser.name);
  const [age, setAge] = useState("27");
  const [bio, setBio] = useState(
    "Adventure seeker ✨ Coffee addict ☕ Love hiking, photography, and discovering hidden city gems.",
  );
  const [gender, setGender] = useState<Gender>(currentUser.gender);
  const [orientation, setOrientation] = useState<Orientation>(
    currentUser.orientation,
  );
  const [intent, setIntent] = useState<Intent>(currentUser.intent);
  const [interests, setInterests] = useState<string[]>([
    "Photography",
    "Hiking",
    "Travel",
    "Art",
    "Coffee",
  ]);
  const [interestInput, setInterestInput] = useState("");
  const [photos, setPhotos] = useState<PhotoSlot[]>(INITIAL_PHOTOS);
  const [isSaving, setIsSaving] = useState(false);
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePhotoSelect = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotos((prev) => {
      const next = [...prev];
      next[idx] = { url, file, slotId: `slot-${idx}` };
      return next;
    });
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });
  };

  const addInterest = () => {
    const val = interestInput.trim();
    if (!val || interests.includes(val)) return;
    setInterests((prev) => [...prev, val]);
    setInterestInput("");
  };

  const removeInterest = (interest: string) => {
    setInterests((prev) => prev.filter((x) => x !== interest));
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    const ageNum = Number.parseInt(age);
    if (Number.isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      toast.error("Please enter a valid age (18–100)");
      return;
    }
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setCurrentUser({ name: name.trim(), gender, orientation, intent });
    setIsSaving(false);
    toast.success("Profile saved! 💕");
    navigate("/profile");
  };

  function OptionButton<T extends string>({
    value,
    current,
    onClick,
    children,
  }: {
    value: T;
    current: T;
    onClick: (v: T) => void;
    children: React.ReactNode;
  }) {
    const isActive = value === current;
    return (
      <button
        type="button"
        onClick={() => onClick(value)}
        className="flex-1 py-2 px-3 rounded-xl text-sm font-ui font-medium transition-all"
        style={{
          background: isActive
            ? "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))"
            : "oklch(0.18 0.025 265)",
          color: isActive ? "white" : "oklch(0.60 0.04 265)",
          border: isActive ? "none" : "1px solid oklch(0.28 0.04 265)",
          boxShadow: isActive
            ? "0 0 10px oklch(0.55 0.24 295 / 0.35)"
            : undefined,
        }}
      >
        {children}
      </button>
    );
  }

  const IntentCard = ({
    value,
    label,
    icon,
    desc,
  }: { value: Intent; label: string; icon: string; desc: string }) => {
    const isActive = intent === value;
    return (
      <button
        type="button"
        onClick={() => setIntent(value)}
        className="flex-1 p-3 rounded-xl text-left transition-all"
        style={{
          background: isActive
            ? "oklch(0.55 0.24 295 / 0.15)"
            : "oklch(0.18 0.025 265)",
          border: isActive
            ? "1px solid oklch(0.55 0.24 295 / 0.5)"
            : "1px solid oklch(0.28 0.04 265)",
          boxShadow: isActive
            ? "0 0 12px oklch(0.55 0.24 295 / 0.25)"
            : undefined,
        }}
      >
        <div className="text-xl mb-1">{icon}</div>
        <div
          className="text-sm font-ui font-semibold"
          style={{
            color: isActive ? "oklch(0.82 0.18 295)" : "oklch(0.75 0.04 265)",
          }}
        >
          {label}
        </div>
        <div
          className="text-xs mt-0.5"
          style={{ color: "oklch(0.50 0.04 265)" }}
        >
          {desc}
        </div>
        {isActive && (
          <div className="mt-1.5">
            <Check
              className="w-3.5 h-3.5"
              style={{ color: "oklch(0.75 0.20 295)" }}
            />
          </div>
        )}
      </button>
    );
  };

  // Stable slot keys — never change order, so index key is safe here via named IDs
  const SLOT_IDS = ["slot-0", "slot-1", "slot-2", "slot-3", "slot-4"];

  return (
    <Layout>
      <div className="max-w-[640px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
            style={{
              background: "oklch(0.18 0.025 265)",
              border: "1px solid oklch(0.28 0.04 265)",
              color: "oklch(0.75 0.04 265)",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1
            className="font-display text-3xl font-bold"
            data-ocid="profile.panel"
            style={{ color: "oklch(0.96 0.01 265)" }}
          >
            Edit Profile
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 space-y-6"
          style={{
            background: "oklch(0.15 0.025 265 / 0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid oklch(0.28 0.04 265 / 0.6)",
          }}
        >
          {/* 5 Photo Slots */}
          <div>
            <Label
              className="text-sm font-ui font-semibold mb-3 block"
              style={{ color: "oklch(0.70 0.04 265)" }}
            >
              PHOTOS (up to 5)
            </Label>
            <div className="grid grid-cols-5 gap-2">
              {SLOT_IDS.map((slotId, idx) => {
                const slot = photos[idx];
                return (
                  <div key={slotId} className="aspect-square relative">
                    {slot ? (
                      <>
                        <div
                          className="w-full h-full rounded-xl bg-cover bg-center"
                          style={{ backgroundImage: `url(${slot.url})` }}
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{
                            background: "oklch(0.60 0.22 27)",
                            color: "white",
                          }}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        data-ocid={`profile.upload_button.${idx + 1}`}
                        onClick={() => fileRefs.current[idx]?.click()}
                        className="w-full h-full rounded-xl flex items-center justify-center transition-all hover:opacity-70"
                        style={{
                          background: "oklch(0.18 0.025 265)",
                          border: "1px dashed oklch(0.30 0.04 265)",
                        }}
                      >
                        <Plus
                          className="w-5 h-5"
                          style={{ color: "oklch(0.45 0.04 265)" }}
                        />
                      </button>
                    )}
                    <input
                      ref={(el) => {
                        fileRefs.current[idx] = el;
                      }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoSelect(idx, e)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label
              className="text-sm font-ui font-semibold"
              style={{ color: "oklch(0.70 0.04 265)" }}
            >
              NAME *
            </Label>
            <Input
              data-ocid="profile.input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl"
              style={{
                background: "oklch(0.18 0.025 265)",
                borderColor: "oklch(0.28 0.04 265)",
                color: "oklch(0.96 0.01 265)",
              }}
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label
              className="text-sm font-ui font-semibold"
              style={{ color: "oklch(0.70 0.04 265)" }}
            >
              AGE *
            </Label>
            <Input
              type="number"
              min="18"
              max="100"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="rounded-xl"
              style={{
                background: "oklch(0.18 0.025 265)",
                borderColor: "oklch(0.28 0.04 265)",
                color: "oklch(0.96 0.01 265)",
              }}
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label
              className="text-sm font-ui font-semibold"
              style={{ color: "oklch(0.70 0.04 265)" }}
            >
              ABOUT YOU
            </Label>
            <Textarea
              data-ocid="profile.textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="rounded-xl resize-none"
              style={{
                background: "oklch(0.18 0.025 265)",
                borderColor: "oklch(0.28 0.04 265)",
                color: "oklch(0.96 0.01 265)",
              }}
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label
              className="text-sm font-ui font-semibold"
              style={{ color: "oklch(0.70 0.04 265)" }}
            >
              GENDER
            </Label>
            <div className="flex gap-2">
              {(["Male", "Female", "Non-binary"] as Gender[]).map((g) => (
                <OptionButton
                  key={g}
                  value={g}
                  current={gender}
                  onClick={setGender}
                >
                  {g}
                </OptionButton>
              ))}
            </div>
          </div>

          {/* Orientation */}
          <div className="space-y-2">
            <Label
              className="text-sm font-ui font-semibold"
              style={{ color: "oklch(0.70 0.04 265)" }}
            >
              ORIENTATION
            </Label>
            <div className="flex gap-2">
              {(["Straight", "Gay", "Bisexual", "Other"] as Orientation[]).map(
                (o) => (
                  <OptionButton
                    key={o}
                    value={o}
                    current={orientation}
                    onClick={setOrientation}
                  >
                    {o}
                  </OptionButton>
                ),
              )}
            </div>
          </div>

          {/* Intent */}
          <div className="space-y-2">
            <Label
              className="text-sm font-ui font-semibold"
              style={{ color: "oklch(0.70 0.04 265)" }}
            >
              LOOKING FOR
            </Label>
            <div className="flex gap-2">
              <IntentCard
                value="LongTerm"
                label="Long term"
                icon="💑"
                desc="Serious relationship"
              />
              <IntentCard
                value="Casual"
                label="Casual"
                icon="😊"
                desc="Relaxed dating"
              />
              <IntentCard
                value="FunNow"
                label="Fun now"
                icon="⚡"
                desc="Something spontaneous"
              />
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <Label
              className="text-sm font-ui font-semibold"
              style={{ color: "oklch(0.70 0.04 265)" }}
            >
              INTERESTS
            </Label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add interest..."
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addInterest()}
                className="flex-1 px-3 py-2 rounded-xl text-sm font-ui outline-none"
                style={{
                  background: "oklch(0.18 0.025 265)",
                  border: "1px solid oklch(0.28 0.04 265)",
                  color: "oklch(0.96 0.01 265)",
                }}
              />
              <button
                type="button"
                onClick={addInterest}
                className="px-4 py-2 rounded-xl text-sm font-ui font-medium transition-all hover:opacity-80"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
                  color: "white",
                }}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-ui font-medium"
                  style={{
                    background: "oklch(0.55 0.24 295 / 0.15)",
                    border: "1px solid oklch(0.55 0.24 295 / 0.3)",
                    color: "oklch(0.80 0.18 295)",
                  }}
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="hover:opacity-70"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-ui font-medium transition-all hover:opacity-80"
              style={{
                background: "oklch(0.18 0.025 265)",
                border: "1px solid oklch(0.28 0.04 265)",
                color: "oklch(0.70 0.18 295)",
              }}
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    () => toast.success("Location shared! 📍"),
                    () => toast.error("Location access denied"),
                  );
                }
              }}
            >
              <MapPin className="w-4 h-4" />
              Share Location
            </button>
          </div>

          {/* Save */}
          <button
            type="button"
            data-ocid="profile.save_button"
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-4 rounded-xl font-ui font-semibold text-base flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305), oklch(0.62 0.24 340))",
              color: "white",
              boxShadow: "0 0 20px oklch(0.55 0.24 295 / 0.45)",
            }}
          >
            {isSaving ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Profile
              </>
            )}
          </button>
        </motion.div>
      </div>
    </Layout>
  );
}
