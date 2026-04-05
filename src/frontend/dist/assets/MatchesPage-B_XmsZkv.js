import { a as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index--RR2uuHP.js";
import { L as Layout, M as MessageCircle } from "./Layout-D0gvy7ZP.js";
import { T as TipModal } from "./TipModal-BWytefuq.js";
import { m as motion } from "./proxy-BsJ5N3Wv.js";
import { H as Heart } from "./heart-DZ9kxm27.js";
import { M as MapPin } from "./map-pin-DCiVeOdq.js";
import "./index-vqmhqKR0.js";
import "./button-DnVfoWhn.js";
import "./index-BLRMywf4.js";
import "./index-Dd1i9p_P.js";
import "./label-DO6Grs1N.js";
import "./index-Bp5K5t2K.js";
import "./check-DDzpqyph.js";
import "./copy-BM63BuCL.js";
const SAMPLE_MATCHES = [
  {
    id: "m1",
    name: "Sofia Martinez",
    age: 27,
    distance: 320,
    bio: "Adventure seeker ✨ Coffee addict ☕",
    lastMsg: "Let's go hiking this weekend! ⛰️",
    photoUrl: "/assets/generated/profile-1.dim_400x500.jpg",
    photoColor: "#7C3AED"
  },
  {
    id: "m2",
    name: "James Chen",
    age: 30,
    distance: 850,
    bio: "Chef & software engineer 🍳",
    lastMsg: "I made homemade pasta tonight, you missed out!",
    photoUrl: "/assets/generated/profile-2.dim_400x500.jpg",
    photoColor: "#2563EB"
  },
  {
    id: "m3",
    name: "Aria Thompson",
    age: 28,
    distance: 3500,
    bio: "Fashion designer 👗 Indie music lover",
    lastMsg: "Your sense of style is incredible!",
    photoUrl: "/assets/generated/profile-5.dim_400x500.jpg",
    photoColor: "#9333EA"
  },
  {
    id: "m4",
    name: "Emma Rosewood",
    age: 25,
    distance: 1200,
    bio: "Artist & yoga teacher 🌈",
    lastMsg: "Let’s make art together sometime 🎨",
    photoUrl: "/assets/generated/profile-3.dim_400x500.jpg",
    photoColor: "#DB2777"
  }
];
function formatDist(m) {
  return m < 1e3 ? `${m}m away` : `${(m / 1e3).toFixed(1)}km away`;
}
function MatchesPage() {
  const navigate = useNavigate();
  const [tipTarget, setTipTarget] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-4 sm:px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider",
            "data-ocid": "matches.page",
            style: { color: "oklch(0.96 0.01 265)" },
            children: "Your Matches"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mt-1", style: { color: "oklch(0.55 0.04 265)" }, children: [
          SAMPLE_MATCHES.length,
          " people who liked you back"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: SAMPLE_MATCHES.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.08, duration: 0.4 },
          "data-ocid": `matches.item.${i + 1}`,
          className: "rounded-2xl overflow-hidden group",
          style: {
            background: "oklch(0.15 0.025 265 / 0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid oklch(0.28 0.04 265 / 0.6)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-52 overflow-hidden", children: [
              m.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105",
                  style: { backgroundImage: `url(${m.photoUrl})` }
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 flex items-center justify-center",
                  style: {
                    background: `linear-gradient(135deg, ${m.photoColor}55, ${m.photoColor}22)`
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display text-6xl font-bold opacity-40",
                      style: { color: m.photoColor },
                      children: m.name[0]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    background: "linear-gradient(to top, oklch(0.12 0.02 265) 0%, transparent 60%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-ui font-bold",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.55 0.24 295 / 0.9), oklch(0.62 0.24 340 / 0.9))",
                    color: "white"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3 fill-white" }),
                    " Match"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-ui font-semibold distance-badge", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                formatDist(m.distance)
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h3",
                {
                  className: "font-display text-lg font-bold mb-0.5",
                  style: { color: "oklch(0.96 0.01 265)" },
                  children: [
                    m.name,
                    ", ",
                    m.age
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs mb-2 line-clamp-1",
                  style: { color: "oklch(0.55 0.04 265)" },
                  children: m.bio
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-xs mb-4 line-clamp-2 p-2 rounded-lg italic",
                  style: {
                    background: "oklch(0.18 0.025 265)",
                    color: "oklch(0.65 0.04 265)",
                    borderLeft: "2px solid oklch(0.55 0.24 295 / 0.4)"
                  },
                  children: [
                    "“",
                    m.lastMsg,
                    "”"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `matches.chat.button.${i + 1}`,
                    onClick: () => navigate("/messages"),
                    className: "flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 text-sm font-ui font-semibold transition-all hover:opacity-90",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
                      color: "white",
                      boxShadow: "0 0 12px oklch(0.55 0.24 295 / 0.35)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                      " Message"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `matches.tip.button.${i + 1}`,
                    onClick: () => setTipTarget({
                      name: m.name,
                      age: m.age,
                      distance: m.distance
                    }),
                    className: "px-4 py-2 rounded-xl text-sm font-ui transition-all hover:opacity-80",
                    style: {
                      background: "oklch(0.18 0.025 265)",
                      border: "1px solid oklch(0.28 0.04 265)",
                      color: "oklch(0.70 0.18 295)"
                    },
                    children: "💰"
                  }
                )
              ] })
            ] })
          ]
        },
        m.id
      )) })
    ] }),
    tipTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TipModal,
      {
        open: true,
        onOpenChange: (open) => !open && setTipTarget(null),
        target: tipTarget
      }
    )
  ] });
}
export {
  MatchesPage as default
};
