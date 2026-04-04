import { u as useAuth, a as useNavigate, j as jsxRuntimeExports } from "./index-VuP7z-8C.js";
import { L as Layout } from "./Layout-C5EoH42h.js";
import { c as createLucideIcon, m as motion } from "./proxy-A24e9-ZM.js";
import { M as MapPin } from "./map-pin-Bbv46cBl.js";
import { C as Camera } from "./camera-C1icb58i.js";
import { H as Heart } from "./heart-C3grFkaB.js";
import { C as Coins } from "./coins-BFQcXQv6.js";
import "./index-auF4jfXf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode);
const SAMPLE_PHOTOS = [
  { url: "/assets/generated/profile-1.dim_400x500.jpg", id: "sp1" },
  { url: "/assets/generated/profile-3.dim_400x500.jpg", id: "sp2" },
  { url: "/assets/generated/profile-5.dim_400x500.jpg", id: "sp3" }
];
const EMPTY_SLOTS = ["e1", "e2"];
const SAMPLE_INTERESTS = ["Photography", "Hiking", "Travel", "Art", "Coffee"];
function ProfilePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const INTENT_LABELS = {
    LongTerm: "💑 Long term",
    Casual: "😊 Casual",
    FunNow: "⚡ Fun now"
  };
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
          ] })
        ]
      }
    )
  ] }) });
}
export {
  ProfilePage as default
};
