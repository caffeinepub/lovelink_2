import { ExternalBlob } from "@/backend";
import type { Profile } from "@/backend.d";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSaveProfile, useSetProfilePicture } from "@/hooks/useQueries";
import { ArrowRight, Camera, Loader2, X } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function ProfileSetupPage() {
  const saveProfile = useSaveProfile();
  const setPicture = useSetProfilePicture();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBlob, setPhotoBlob] = useState<Uint8Array | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLoading = saveProfile.isPending || setPicture.isPending;

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
    const bytes = new Uint8Array((await file.arrayBuffer()) as ArrayBuffer);
    setPhotoBlob(bytes);
  };

  const getGeolocation = (): Promise<{
    latitude: number;
    longitude: number;
  } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        () => resolve(null),
        { timeout: 5000 },
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !age || !bio.trim()) {
      toast.error("Please fill in name, age, and bio");
      return;
    }
    const ageNum = Number.parseInt(age);
    if (Number.isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      toast.error("Please enter a valid age (18–100)");
      return;
    }
    try {
      const geoLocation = await getGeolocation();

      const profile: Profile = {
        name: name.trim(),
        age: BigInt(ageNum),
        bio: bio.trim(),
        interests: interests
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        createdAt: BigInt(Date.now()) * 1_000_000n,
        updatedAt: BigInt(Date.now()) * 1_000_000n,
        isComplete: true,
        ...(geoLocation
          ? { latitude: geoLocation.latitude, longitude: geoLocation.longitude }
          : {}),
      };

      await saveProfile.mutateAsync(profile);

      if (photoBlob) {
        const blob = ExternalBlob.fromBytes(
          photoBlob as Uint8Array<ArrayBuffer>,
        ).withUploadProgress((pct) => {
          setUploadProgress(pct);
        });
        await setPicture.mutateAsync(blob);
        setUploadProgress(null);
      }

      toast.success("Profile created! Welcome to LoveLink 💕");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save profile");
    }
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full opacity-15 blur-3xl"
          style={{ background: "oklch(0.58 0.22 265)" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "oklch(0.60 0.23 340)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 overflow-hidden"
            style={{
              background: "oklch(0.13 0.025 252)",
              border: "1px solid oklch(0.35 0.10 85 / 0.5)",
              boxShadow: "0 0 24px oklch(0.78 0.18 85 / 0.3)",
            }}
          >
            <img
              src="/assets/afuktokenlogo1-019d58aa-bef5-707a-b33c-a98d6dbac4d8.png"
              alt="AFUK"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Set Up Your Profile
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Let others know who you are
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <Avatar
                  className="w-24 h-24 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {photoPreview ? (
                    <AvatarImage src={photoPreview} className="object-cover" />
                  ) : null}
                  <AvatarFallback
                    className="text-2xl font-display font-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.55 0.24 300), oklch(0.60 0.23 340))",
                      color: "white",
                    }}
                  >
                    {initials || <Camera className="w-8 h-8" />}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center transition-opacity"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.58 0.22 265), oklch(0.60 0.23 340))",
                  }}
                >
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoSelect}
                data-ocid="profile.upload_button"
              />
              {uploadProgress !== null && (
                <div className="text-xs text-muted-foreground">
                  Uploading photo... {uploadProgress}%
                </div>
              )}
              {photoPreview && (
                <button
                  type="button"
                  onClick={() => {
                    setPhotoPreview(null);
                    setPhotoBlob(null);
                  }}
                  className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <X className="w-3 h-3" /> Remove photo
                </button>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-ui font-medium text-foreground/80"
              >
                Full Name *
              </Label>
              <Input
                id="name"
                data-ocid="profile.input"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label
                htmlFor="age"
                className="text-sm font-ui font-medium text-foreground/80"
              >
                Age *
              </Label>
              <Input
                id="age"
                type="number"
                min="18"
                max="100"
                placeholder="Your age (18+)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label
                htmlFor="bio"
                className="text-sm font-ui font-medium text-foreground/80"
              >
                About You *
              </Label>
              <Textarea
                id="bio"
                data-ocid="profile.textarea"
                placeholder="Tell people a bit about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground resize-none"
                required
              />
            </div>

            {/* Interests */}
            <div className="space-y-2">
              <Label
                htmlFor="interests"
                className="text-sm font-ui font-medium text-foreground/80"
              >
                Interests
              </Label>
              <Input
                id="interests"
                placeholder="Art, Travel, Music, Tech (comma-separated)"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple interests with commas
              </p>
            </div>

            <Button
              type="submit"
              data-ocid="profile.submit_button"
              disabled={isLoading}
              className="w-full py-5 text-base font-ui font-semibold rounded-xl btn-gradient border-0"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {setPicture.isPending
                    ? "Uploading photo..."
                    : "Creating profile..."}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Start Exploring
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
