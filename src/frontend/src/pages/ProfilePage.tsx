import { useAuth } from "@/App";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetAverageRating,
  useGetReviews,
  useSubmitReview,
} from "@/hooks/useQueries";
import { useNavigate } from "@/router";
import {
  Camera,
  Coins,
  Edit3,
  Heart,
  Loader2,
  MapPin,
  MessageSquare,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const SAMPLE_PHOTOS = [
  { url: "/assets/generated/profile-1.dim_400x500.jpg", id: "sp1" },
  { url: "/assets/generated/profile-3.dim_400x500.jpg", id: "sp2" },
  { url: "/assets/generated/profile-5.dim_400x500.jpg", id: "sp3" },
];

const EMPTY_SLOTS = ["e1", "e2"];

const SAMPLE_INTERESTS = ["Photography", "Hiking", "Travel", "Art", "Coffee"];

const SAMPLE_REVIEWS = [
  {
    key: "r1",
    name: "Alex M.",
    rating: 5,
    text: "Amazing person, super genuine and fun to talk to! Highly recommend.",
    time: "2 days ago",
  },
  {
    key: "r2",
    name: "Jordan K.",
    rating: 4,
    text: "Great vibes, interesting conversations. Would match again!",
    time: "5 days ago",
  },
  {
    key: "r3",
    name: "Sam R.",
    rating: 5,
    text: "One of the most authentic profiles on here. Loved the chat!",
    time: "1 week ago",
  },
];

const SKELETON_IDS = ["sk-review-1", "sk-review-2", "sk-review-3"];

function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: {
  value: number;
  onChange?: (val: number) => void;
  readonly?: boolean;
  size?: "sm" | "md";
}) {
  const [hovered, setHovered] = useState(0);
  const px = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = readonly ? star <= value : star <= (hovered || value);
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onChange?.(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
            className={
              readonly
                ? "cursor-default"
                : "cursor-pointer transition-transform hover:scale-110"
            }
          >
            <Star
              className={px}
              style={{
                color: filled ? "oklch(0.78 0.18 85)" : "oklch(0.32 0.03 265)",
                fill: filled ? "oklch(0.78 0.18 85)" : "transparent",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

function ReviewForm({
  onSubmit,
  onCancel,
  isPending,
}: {
  onSubmit: (rating: number, text: string) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) onSubmit(rating, text.trim());
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      onSubmit={handleSubmit}
      className="rounded-2xl p-5 space-y-4"
      style={{
        background: "oklch(0.18 0.035 295 / 0.40)",
        border: "1px solid oklch(0.55 0.24 295 / 0.30)",
      }}
      data-ocid="reviews.dialog"
    >
      <div className="flex items-center justify-between">
        <span
          className="text-sm font-ui font-semibold"
          style={{ color: "oklch(0.85 0.06 295)" }}
        >
          Write a Review
        </span>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs hover:opacity-70 transition-opacity"
          style={{ color: "oklch(0.55 0.04 265)" }}
          data-ocid="reviews.close_button"
        >
          Cancel
        </button>
      </div>

      <div className="space-y-1">
        <span
          className="text-xs font-ui block"
          style={{ color: "oklch(0.55 0.04 265)" }}
        >
          Your rating
        </span>
        <StarRating value={rating} onChange={setRating} />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="review-text"
          className="text-xs font-ui"
          style={{ color: "oklch(0.55 0.04 265)" }}
        >
          Your review
        </label>
        <Textarea
          id="review-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience with this person..."
          rows={3}
          maxLength={500}
          data-ocid="reviews.textarea"
          className="text-sm resize-none"
          style={{
            background: "oklch(0.14 0.025 265)",
            border: "1px solid oklch(0.30 0.04 265)",
            color: "oklch(0.88 0.02 265)",
          }}
        />
        <p
          className="text-right text-xs"
          style={{ color: "oklch(0.45 0.03 265)" }}
        >
          {text.length}/500
        </p>
      </div>

      <Button
        type="submit"
        disabled={isPending || !text.trim()}
        data-ocid="reviews.submit_button"
        className="w-full font-ui font-semibold text-sm"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
          color: "white",
          boxShadow: "0 0 12px oklch(0.55 0.24 295 / 0.35)",
          border: "none",
        }}
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </Button>
    </motion.form>
  );
}

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);

  // We pass null here since this is the viewer's own profile page
  // In a full implementation this would take a principal param
  const { data: reviews = [], isLoading: reviewsLoading } = useGetReviews(null);
  const { data: avgRating } = useGetAverageRating(null);

  const submitReview = useSubmitReview();

  const handleSubmitReview = (rating: number, text: string) => {
    submitReview.mutate(
      { target: null as any, rating, text },
      {
        onSuccess: () => {
          setShowReviewForm(false);
        },
      },
    );
  };

  const INTENT_LABELS: Record<string, string> = {
    LongTerm: "\u{1F491} Long term",
    Casual: "\u{1F60A} Casual",
    FunNow: "\u26A1 Fun now",
  };

  const displayReviews =
    reviews.length > 0
      ? reviews.map((r, i) => ({
          key: `${r.reviewerId.toString()}-${i}`,
          name: `${r.reviewerId.toString().slice(0, 8)}...`,
          rating: Number(r.rating),
          text: r.text,
          time: new Date(Number(r.timestamp) / 1_000_000).toLocaleDateString(),
        }))
      : SAMPLE_REVIEWS;

  const displayAvgRating =
    avgRating !== undefined && avgRating > 0
      ? avgRating.toFixed(1)
      : SAMPLE_REVIEWS.reduce((s, r) => s + r.rating, 0) / SAMPLE_REVIEWS.length
        ? (
            SAMPLE_REVIEWS.reduce((s, r) => s + r.rating, 0) /
            SAMPLE_REVIEWS.length
          ).toFixed(1)
        : "5.0";

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

          {/* ─── Reviews Section ─── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.15 0.025 265 / 0.75)",
              backdropFilter: "blur(16px)",
              border: "1px solid oklch(0.28 0.04 265 / 0.6)",
            }}
            data-ocid="reviews.panel"
          >
            {/* Reviews header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: "oklch(0.22 0.03 265)" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <MessageSquare
                    className="w-4.5 h-4.5"
                    style={{ color: "oklch(0.70 0.18 295)" }}
                  />
                  <span
                    className="font-ui font-semibold text-sm"
                    style={{ color: "oklch(0.85 0.04 265)" }}
                  >
                    Reviews
                  </span>
                </div>
                {/* Average rating badge */}
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{
                    background: "oklch(0.20 0.04 295 / 0.50)",
                    border: "1px solid oklch(0.55 0.24 295 / 0.25)",
                  }}
                >
                  <Star
                    className="w-3.5 h-3.5"
                    style={{
                      color: "oklch(0.78 0.18 85)",
                      fill: "oklch(0.78 0.18 85)",
                    }}
                  />
                  <span
                    className="text-xs font-bold"
                    style={{ color: "oklch(0.88 0.06 265)" }}
                  >
                    {displayAvgRating}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "oklch(0.50 0.03 265)" }}
                  >
                    ({displayReviews.length})
                  </span>
                </div>
              </div>

              {/* Write review button — hidden on own profile in real app */}
              <button
                type="button"
                onClick={() => setShowReviewForm((v) => !v)}
                data-ocid="reviews.open_modal_button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-ui font-semibold transition-all hover:opacity-80"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.24 295 / 0.20), oklch(0.62 0.24 340 / 0.20))",
                  border: "1px solid oklch(0.55 0.24 295 / 0.35)",
                  color: "oklch(0.80 0.18 295)",
                }}
              >
                <Star className="w-3.5 h-3.5" />
                Write Review
              </button>
            </div>

            {/* Review form (inline) */}
            <AnimatePresence>
              {showReviewForm && (
                <div className="px-5 pt-4">
                  <ReviewForm
                    onSubmit={handleSubmitReview}
                    onCancel={() => setShowReviewForm(false)}
                    isPending={submitReview.isPending}
                  />
                </div>
              )}
            </AnimatePresence>

            {/* Reviews list */}
            <div className="p-5 space-y-4">
              {reviewsLoading ? (
                <div className="space-y-3" data-ocid="reviews.loading_state">
                  {SKELETON_IDS.map((id) => (
                    <Skeleton
                      key={id}
                      className="h-20 rounded-xl"
                      style={{ background: "oklch(0.20 0.03 265)" }}
                    />
                  ))}
                </div>
              ) : displayReviews.length === 0 ? (
                <div
                  className="py-8 text-center"
                  data-ocid="reviews.empty_state"
                >
                  <Star
                    className="w-8 h-8 mx-auto mb-2 opacity-20"
                    style={{ color: "oklch(0.55 0.24 295)" }}
                  />
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.50 0.03 265)" }}
                  >
                    No reviews yet. Be the first!
                  </p>
                </div>
              ) : (
                displayReviews.map((review, idx) => (
                  <motion.div
                    key={review.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="rounded-xl p-4 space-y-2"
                    style={{
                      background: "oklch(0.18 0.03 265 / 0.60)",
                      border: "1px solid oklch(0.25 0.03 265)",
                    }}
                    data-ocid={`reviews.item.${idx + 1}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-ui font-semibold"
                        style={{ color: "oklch(0.82 0.04 265)" }}
                      >
                        {review.name}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.45 0.03 265)" }}
                      >
                        {review.time}
                      </span>
                    </div>
                    <StarRating value={review.rating} readonly size="sm" />
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.70 0.04 265)" }}
                    >
                      {review.text}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
