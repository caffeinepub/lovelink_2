import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Skeleton } from "./index--RR2uuHP.js";
import { L as Layout } from "./Layout-D0gvy7ZP.js";
import { C as Coins, B as Button, L as LoaderCircle } from "./button-DnVfoWhn.js";
import { T as Textarea } from "./textarea-S3DW-plp.js";
import { u as useGetReviews, a as useGetAverageRating, b as useSubmitReview } from "./useQueries-PLQIWETV.js";
import { c as createLucideIcon, m as motion } from "./proxy-BsJ5N3Wv.js";
import { M as MapPin } from "./map-pin-DCiVeOdq.js";
import { C as Camera } from "./camera-XrNRsahX.js";
import { H as Heart } from "./heart-DZ9kxm27.js";
import { A as AnimatePresence } from "./index-Bp5K5t2K.js";
import "./index-vqmhqKR0.js";
import "./index-BLRMywf4.js";
import "./useActor-C-OR18B7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$1);
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
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const SAMPLE_PHOTOS = [
  { url: "/assets/generated/profile-1.dim_400x500.jpg", id: "sp1" },
  { url: "/assets/generated/profile-3.dim_400x500.jpg", id: "sp2" },
  { url: "/assets/generated/profile-5.dim_400x500.jpg", id: "sp3" }
];
const EMPTY_SLOTS = ["e1", "e2"];
const SAMPLE_INTERESTS = ["Photography", "Hiking", "Travel", "Art", "Coffee"];
const SAMPLE_REVIEWS = [
  {
    key: "r1",
    name: "Alex M.",
    rating: 5,
    text: "Amazing person, super genuine and fun to talk to! Highly recommend.",
    time: "2 days ago"
  },
  {
    key: "r2",
    name: "Jordan K.",
    rating: 4,
    text: "Great vibes, interesting conversations. Would match again!",
    time: "5 days ago"
  },
  {
    key: "r3",
    name: "Sam R.",
    rating: 5,
    text: "One of the most authentic profiles on here. Loved the chat!",
    time: "1 week ago"
  }
];
const SKELETON_IDS = ["sk-review-1", "sk-review-2", "sk-review-3"];
function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md"
}) {
  const [hovered, setHovered] = reactExports.useState(0);
  const px = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((star) => {
    const filled = readonly ? star <= value : star <= (hovered || value);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled: readonly,
        onClick: () => !readonly && (onChange == null ? void 0 : onChange(star)),
        onMouseEnter: () => !readonly && setHovered(star),
        onMouseLeave: () => !readonly && setHovered(0),
        className: readonly ? "cursor-default" : "cursor-pointer transition-transform hover:scale-110",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            className: px,
            style: {
              color: filled ? "oklch(0.78 0.18 85)" : "oklch(0.32 0.03 265)",
              fill: filled ? "oklch(0.78 0.18 85)" : "transparent"
            }
          }
        )
      },
      star
    );
  }) });
}
function ReviewForm({
  onSubmit,
  onCancel,
  isPending
}) {
  const [rating, setRating] = reactExports.useState(5);
  const [text, setText] = reactExports.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) onSubmit(rating, text.trim());
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.form,
    {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      onSubmit: handleSubmit,
      className: "rounded-2xl p-5 space-y-4",
      style: {
        background: "oklch(0.18 0.035 295 / 0.40)",
        border: "1px solid oklch(0.55 0.24 295 / 0.30)"
      },
      "data-ocid": "reviews.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-sm font-ui font-semibold",
              style: { color: "oklch(0.85 0.06 295)" },
              children: "Write a Review"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onCancel,
              className: "text-xs hover:opacity-70 transition-opacity",
              style: { color: "oklch(0.55 0.04 265)" },
              "data-ocid": "reviews.close_button",
              children: "Cancel"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-ui block",
              style: { color: "oklch(0.55 0.04 265)" },
              children: "Your rating"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: rating, onChange: setRating })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "review-text",
              className: "text-xs font-ui",
              style: { color: "oklch(0.55 0.04 265)" },
              children: "Your review"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "review-text",
              value: text,
              onChange: (e) => setText(e.target.value),
              placeholder: "Share your experience with this person...",
              rows: 3,
              maxLength: 500,
              "data-ocid": "reviews.textarea",
              className: "text-sm resize-none",
              style: {
                background: "oklch(0.14 0.025 265)",
                border: "1px solid oklch(0.30 0.04 265)",
                color: "oklch(0.88 0.02 265)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-right text-xs",
              style: { color: "oklch(0.45 0.03 265)" },
              children: [
                text.length,
                "/500"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: isPending || !text.trim(),
            "data-ocid": "reviews.submit_button",
            className: "w-full font-ui font-semibold text-sm",
            style: {
              background: "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
              color: "white",
              boxShadow: "0 0 12px oklch(0.55 0.24 295 / 0.35)",
              border: "none"
            },
            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
              " Submitting..."
            ] }) : "Submit Review"
          }
        )
      ]
    }
  );
}
function ProfilePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = reactExports.useState(false);
  const { data: reviews = [], isLoading: reviewsLoading } = useGetReviews();
  const { data: avgRating } = useGetAverageRating();
  const submitReview = useSubmitReview();
  const handleSubmitReview = (rating, text) => {
    submitReview.mutate(
      { target: null, rating, text },
      {
        onSuccess: () => {
          setShowReviewForm(false);
        }
      }
    );
  };
  const INTENT_LABELS = {
    LongTerm: "💑 Long term",
    Casual: "😊 Casual",
    FunNow: "⚡ Fun now"
  };
  const displayReviews = reviews.length > 0 ? reviews.map((r, i) => ({
    key: `${r.reviewerId.toString()}-${i}`,
    name: `${r.reviewerId.toString().slice(0, 8)}...`,
    rating: Number(r.rating),
    text: r.text,
    time: new Date(Number(r.timestamp) / 1e6).toLocaleDateString()
  })) : SAMPLE_REVIEWS;
  const displayAvgRating = avgRating !== void 0 && avgRating > 0 ? avgRating.toFixed(1) : SAMPLE_REVIEWS.reduce((s, r) => s + r.rating, 0) / SAMPLE_REVIEWS.length ? (SAMPLE_REVIEWS.reduce((s, r) => s + r.rating, 0) / SAMPLE_REVIEWS.length).toFixed(1) : "5.0";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[800px] mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "font-display text-3xl sm:text-4xl font-bold",
          "data-ocid": "profile.page",
          style: { color: "oklch(0.96 0.01 265)" },
          children: "My Profile"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "profile.edit_button",
          onClick: () => navigate("/profile/edit"),
          className: "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-ui font-medium transition-all hover:opacity-80",
          style: {
            background: "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
            color: "white",
            boxShadow: "0 0 12px oklch(0.55 0.24 295 / 0.35)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4" }),
            " Edit Profile"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "space-y-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl overflow-hidden",
              style: {
                background: "oklch(0.15 0.025 265 / 0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(0.28 0.04 265 / 0.6)"
              },
              "data-ocid": "profile.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-36 relative",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.55 0.24 295 / 0.3), oklch(0.62 0.24 340 / 0.3))"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute inset-0",
                        style: {
                          background: "linear-gradient(to top, oklch(0.15 0.025 265) 0%, transparent 60%)"
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-4 -mt-12 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-4 bg-cover bg-center",
                        style: {
                          backgroundImage: `url(${SAMPLE_PHOTOS[0].url})`,
                          borderColor: "oklch(0.15 0.025 265)",
                          boxShadow: "0 0 20px oklch(0.55 0.24 295 / 0.3)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "h2",
                        {
                          className: "font-display text-3xl font-bold",
                          style: { color: "oklch(0.96 0.01 265)" },
                          children: [
                            currentUser.name,
                            ", 27"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "inline-flex items-center gap-1 text-xs font-ui font-medium px-2 py-0.5 rounded-full",
                            style: {
                              background: "oklch(0.55 0.24 295 / 0.15)",
                              border: "1px solid oklch(0.55 0.24 295 / 0.3)",
                              color: "oklch(0.80 0.18 295)"
                            },
                            children: INTENT_LABELS[currentUser.intent]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "text-xs",
                            style: { color: "oklch(0.55 0.04 265)" },
                            children: [
                              currentUser.gender,
                              " · ",
                              currentUser.orientation
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "flex items-center gap-1 text-xs",
                            style: { color: "oklch(0.55 0.04 265)" },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                              " Internet Computer"
                            ]
                          }
                        )
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm leading-relaxed mb-5",
                      style: { color: "oklch(0.72 0.04 265)" },
                      children: "Adventure seeker ✨ Coffee addict ☕ Love hiking, photography, and discovering hidden city gems. Looking for someone genuine to share new experiences with."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SAMPLE_INTERESTS.map((interest) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "px-3 py-1 rounded-full text-xs font-ui font-medium",
                      style: {
                        background: "oklch(0.20 0.03 265)",
                        border: "1px solid oklch(0.28 0.04 265)",
                        color: "oklch(0.72 0.04 265)"
                      },
                      children: interest
                    },
                    interest
                  )) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-5",
              style: {
                background: "oklch(0.15 0.025 265 / 0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(0.28 0.04 265 / 0.6)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h3",
                  {
                    className: "font-ui font-semibold text-sm mb-4 flex items-center gap-2",
                    style: { color: "oklch(0.75 0.04 265)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Camera,
                        {
                          className: "w-4 h-4",
                          style: { color: "oklch(0.70 0.18 295)" }
                        }
                      ),
                      "PHOTOS (",
                      SAMPLE_PHOTOS.length,
                      "/5)"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 sm:grid-cols-5 gap-3", children: [
                  SAMPLE_PHOTOS.map(({ url, id }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "aspect-square rounded-xl overflow-hidden bg-cover bg-center",
                      style: { backgroundImage: `url(${url})` }
                    },
                    id
                  )),
                  EMPTY_SLOTS.map((slotId) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "aspect-square rounded-xl flex items-center justify-center",
                      style: {
                        background: "oklch(0.18 0.025 265)",
                        border: "1px dashed oklch(0.30 0.04 265)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Camera,
                        {
                          className: "w-6 h-6",
                          style: { color: "oklch(0.40 0.04 265)" }
                        }
                      )
                    },
                    slotId
                  ))
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl p-5 text-center",
                style: {
                  background: "oklch(0.15 0.025 265 / 0.75)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid oklch(0.28 0.04 265 / 0.6)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "text-3xl font-display font-bold mb-1",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      },
                      children: "4"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "text-sm flex items-center justify-center gap-1",
                      style: { color: "oklch(0.55 0.04 265)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Heart,
                          {
                            className: "w-3.5 h-3.5",
                            style: { color: "oklch(0.62 0.24 340)" }
                          }
                        ),
                        " ",
                        "Matches"
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl p-5 text-center",
                style: {
                  background: "oklch(0.15 0.025 265 / 0.75)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid oklch(0.28 0.04 265 / 0.6)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "text-3xl font-display font-bold mb-1",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      },
                      children: "1.2K"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "text-sm flex items-center justify-center gap-1",
                      style: { color: "oklch(0.55 0.04 265)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Coins,
                          {
                            className: "w-3.5 h-3.5",
                            style: { color: "oklch(0.70 0.20 295)" }
                          }
                        ),
                        " ",
                        "AFUK Received"
                      ]
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl overflow-hidden",
              style: {
                background: "oklch(0.15 0.025 265 / 0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(0.28 0.04 265 / 0.6)"
              },
              "data-ocid": "reviews.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between px-5 py-4 border-b",
                    style: { borderColor: "oklch(0.22 0.03 265)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            MessageSquare,
                            {
                              className: "w-4.5 h-4.5",
                              style: { color: "oklch(0.70 0.18 295)" }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "font-ui font-semibold text-sm",
                              style: { color: "oklch(0.85 0.04 265)" },
                              children: "Reviews"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-center gap-1.5 px-3 py-1 rounded-full",
                            style: {
                              background: "oklch(0.20 0.04 295 / 0.50)",
                              border: "1px solid oklch(0.55 0.24 295 / 0.25)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Star,
                                {
                                  className: "w-3.5 h-3.5",
                                  style: {
                                    color: "oklch(0.78 0.18 85)",
                                    fill: "oklch(0.78 0.18 85)"
                                  }
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-xs font-bold",
                                  style: { color: "oklch(0.88 0.06 265)" },
                                  children: displayAvgRating
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "span",
                                {
                                  className: "text-xs",
                                  style: { color: "oklch(0.50 0.03 265)" },
                                  children: [
                                    "(",
                                    displayReviews.length,
                                    ")"
                                  ]
                                }
                              )
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowReviewForm((v) => !v),
                          "data-ocid": "reviews.open_modal_button",
                          className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-ui font-semibold transition-all hover:opacity-80",
                          style: {
                            background: "linear-gradient(135deg, oklch(0.55 0.24 295 / 0.20), oklch(0.62 0.24 340 / 0.20))",
                            border: "1px solid oklch(0.55 0.24 295 / 0.35)",
                            color: "oklch(0.80 0.18 295)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5" }),
                            "Write Review"
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showReviewForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ReviewForm,
                  {
                    onSubmit: handleSubmitReview,
                    onCancel: () => setShowReviewForm(false),
                    isPending: submitReview.isPending
                  }
                ) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-4", children: reviewsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "reviews.loading_state", children: SKELETON_IDS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Skeleton,
                  {
                    className: "h-20 rounded-xl",
                    style: { background: "oklch(0.20 0.03 265)" }
                  },
                  id
                )) }) : displayReviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "py-8 text-center",
                    "data-ocid": "reviews.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Star,
                        {
                          className: "w-8 h-8 mx-auto mb-2 opacity-20",
                          style: { color: "oklch(0.55 0.24 295)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm",
                          style: { color: "oklch(0.50 0.03 265)" },
                          children: "No reviews yet. Be the first!"
                        }
                      )
                    ]
                  }
                ) : displayReviews.map((review, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.05 * idx },
                    className: "rounded-xl p-4 space-y-2",
                    style: {
                      background: "oklch(0.18 0.03 265 / 0.60)",
                      border: "1px solid oklch(0.25 0.03 265)"
                    },
                    "data-ocid": `reviews.item.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-sm font-ui font-semibold",
                            style: { color: "oklch(0.82 0.04 265)" },
                            children: review.name
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs",
                            style: { color: "oklch(0.45 0.03 265)" },
                            children: review.time
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: review.rating, readonly: true, size: "sm" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm leading-relaxed",
                          style: { color: "oklch(0.70 0.04 265)" },
                          children: review.text
                        }
                      )
                    ]
                  },
                  review.key
                )) })
              ]
            }
          )
        ]
      }
    )
  ] }) });
}
export {
  ProfilePage as default
};
