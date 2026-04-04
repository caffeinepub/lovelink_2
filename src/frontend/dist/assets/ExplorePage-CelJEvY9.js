import { r as reactExports, j as jsxRuntimeExports, u as useAuth } from "./index-VuP7z-8C.js";
import { c as createContextScope, P as Primitive, u as useLayoutEffect2, L as Layout } from "./Layout-C5EoH42h.js";
import { u as useControllableState, a as useId, T as TipModal } from "./TipModal-CjGeXBXV.js";
import { c as composeEventHandlers, P as Presence } from "./index-Byn3Q2lS.js";
import { u as useComposedRefs } from "./index-auF4jfXf.js";
import { M as MapPin } from "./map-pin-Bbv46cBl.js";
import { c as createLucideIcon, m as motion } from "./proxy-A24e9-ZM.js";
import { H as Heart } from "./heart-C3grFkaB.js";
import { X } from "./label-byuGifbp.js";
import "./index-BZqUWHNL.js";
import "./index-CMm0yFNY.js";
import "./coins-BFQcXQv6.js";
import "./check-C7lCs4HX.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode);
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      onOpenChange,
      ...collapsibleProps
    } = props;
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: COLLAPSIBLE_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollapsibleProvider,
      {
        scope: __scopeCollapsible,
        disabled,
        contentId: useId(),
        open,
        onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            "data-state": getState(open),
            "data-disabled": disabled ? "" : void 0,
            ...collapsibleProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Collapsible$1.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME = "CollapsibleTrigger";
var CollapsibleTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME, __scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-controls": context.contentId,
        "aria-expanded": context.open || false,
        "data-state": getState(context.open),
        "data-disabled": context.disabled ? "" : void 0,
        disabled: context.disabled,
        ...triggerProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
CollapsibleTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "CollapsibleContent";
var CollapsibleContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME, props.__scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContentImpl, { ...contentProps, ref: forwardedRef, present }) });
  }
);
CollapsibleContent$1.displayName = CONTENT_NAME;
var CollapsibleContentImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME, __scopeCollapsible);
  const [isPresent, setIsPresent] = reactExports.useState(present);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = reactExports.useRef(0);
  const height = heightRef.current;
  const widthRef = reactExports.useRef(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = reactExports.useRef(isOpen);
  const originalStylesRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
    return () => cancelAnimationFrame(rAF);
  }, []);
  useLayoutEffect2(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [context.open, present]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-state": getState(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      id: context.contentId,
      hidden: !isOpen,
      ...contentProps,
      ref: composedRefs,
      style: {
        [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
        [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
        ...props.style
      },
      children: isOpen && children
    }
  );
});
function getState(open) {
  return open ? "open" : "closed";
}
var Root = Collapsible$1;
function Collapsible({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "collapsible", ...props });
}
function CollapsibleTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CollapsibleTrigger$1,
    {
      "data-slot": "collapsible-trigger",
      ...props
    }
  );
}
function CollapsibleContent({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CollapsibleContent$1,
    {
      "data-slot": "collapsible-content",
      ...props
    }
  );
}
const PHOTOS = [
  "/assets/generated/profile-1.dim_400x500.jpg",
  "/assets/generated/profile-2.dim_400x500.jpg",
  "/assets/generated/profile-3.dim_400x500.jpg",
  "/assets/generated/profile-4.dim_400x500.jpg",
  "/assets/generated/profile-5.dim_400x500.jpg"
];
const MOCK_PROFILES = [
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
    photoUrl: PHOTOS[0]
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
    photoUrl: PHOTOS[1]
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
    photoUrl: PHOTOS[2]
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
    photoUrl: PHOTOS[3]
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
    photoUrl: PHOTOS[4]
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
    photoCount: 2
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
    photoCount: 3
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
    photoCount: 1
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
    photoCount: 4
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
    photoCount: 3
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
    photoCount: 2
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
    photoCount: 5
  }
];
const INTENT_LABELS = {
  LongTerm: "💑 Long term",
  Casual: "😊 Casual",
  FunNow: "⚡ Fun now"
};
const GENDER_FILTER_LABELS = [
  "All",
  "Women",
  "Men",
  "Non-binary"
];
const INTENT_FILTER_LABELS = [
  { value: "All", label: "All" },
  { value: "LongTerm", label: "💑 Long term" },
  { value: "Casual", label: "😊 Casual" },
  { value: "FunNow", label: "⚡ Fun now" }
];
const DISTANCE_FILTER_LABELS = ["1km", "5km", "25km", "Any"];
function formatDist(m) {
  return m < 1e3 ? `${m}m away` : `${(m / 1e3).toFixed(1)}km away`;
}
function FilterChip({
  active,
  onClick,
  children,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "data-ocid": ocid,
      onClick,
      className: "px-4 py-2 rounded-full text-sm font-ui font-medium transition-all whitespace-nowrap",
      style: {
        background: active ? "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))" : "oklch(0.16 0.025 265)",
        color: active ? "white" : "oklch(0.62 0.04 265)",
        border: active ? "none" : "1px solid oklch(0.28 0.04 265)",
        boxShadow: active ? "0 0 12px oklch(0.55 0.24 295 / 0.35)" : void 0
      },
      children
    }
  );
}
function ProfileCard({
  profile,
  index,
  onTip,
  onLike,
  onDislike
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05, duration: 0.4 },
      "data-ocid": `explore.card.item.${index + 1}`,
      className: "rounded-2xl overflow-hidden flex flex-col",
      style: {
        background: "oklch(0.15 0.025 265 / 0.75)",
        backdropFilter: "blur(16px)",
        border: "1px solid oklch(0.28 0.04 265 / 0.6)",
        boxShadow: "0 4px 24px oklch(0.05 0.01 265 / 0.5)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-56 overflow-hidden", children: [
          profile.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center",
              style: { backgroundImage: `url(${profile.photoUrl})` }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 flex items-center justify-center",
              style: {
                background: `linear-gradient(135deg, ${profile.photoColor}66 0%, ${profile.photoColor}33 100%)`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display text-7xl font-bold opacity-40",
                  style: { color: profile.photoColor },
                  children: profile.name[0]
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-ui font-semibold distance-badge", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
            formatDist(profile.distance)
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-ui font-medium",
              style: {
                background: "oklch(0.12 0.02 265 / 0.85)",
                color: "oklch(0.70 0.04 265)",
                backdropFilter: "blur(8px)"
              },
              children: [
                profile.photoCount,
                " 📷"
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h3",
            {
              className: "font-display text-xl font-bold",
              style: { color: "oklch(0.96 0.01 265)" },
              children: [
                profile.name,
                ", ",
                profile.age
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-flex w-fit items-center px-2.5 py-1 rounded-full text-xs font-ui font-semibold mb-2",
              style: {
                background: "oklch(0.55 0.24 295 / 0.15)",
                border: "1px solid oklch(0.55 0.24 295 / 0.3)",
                color: "oklch(0.80 0.18 295)"
              },
              children: INTENT_LABELS[profile.intent]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs leading-relaxed mb-3 line-clamp-2 flex-1",
              style: { color: "oklch(0.65 0.04 265)" },
              children: profile.bio
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: profile.interests.slice(0, 3).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2 py-0.5 rounded-full text-xs font-ui",
              style: {
                background: "oklch(0.20 0.03 265)",
                color: "oklch(0.68 0.04 265)",
                border: "1px solid oklch(0.28 0.04 265)"
              },
              children: i
            },
            i
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `explore.dislike.button.${index + 1}`,
                onClick: onDislike,
                className: "flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 text-sm font-ui transition-all hover:opacity-80",
                style: {
                  background: "oklch(0.18 0.025 265)",
                  border: "1px solid oklch(0.28 0.04 265)",
                  color: "oklch(0.65 0.22 27)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                  " Pass"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `explore.like.button.${index + 1}`,
                onClick: onLike,
                className: "flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 text-sm font-ui transition-all hover:opacity-80",
                style: {
                  background: "oklch(0.18 0.025 265)",
                  border: "1px solid oklch(0.65 0.20 155 / 0.4)",
                  color: "oklch(0.65 0.20 155)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4" }),
                  " Like"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `explore.tip.button.${index + 1}`,
              onClick: onTip,
              className: "w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-ui font-semibold transition-all hover:opacity-90",
              style: {
                background: "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305), oklch(0.62 0.24 340))",
                color: "white",
                boxShadow: "0 0 14px oklch(0.55 0.24 295 / 0.4)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/afuktokenlogo1-019d58aa-bef5-707a-b33c-a98d6dbac4d8.png",
                    alt: "AFUK",
                    className: "w-4 h-4 object-contain rounded-full"
                  }
                ),
                "Tip with AFUK"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ExplorePage() {
  const { currentUser } = useAuth();
  const [genderFilter, setGenderFilter] = reactExports.useState("All");
  const [intentFilter, setIntentFilter] = reactExports.useState("All");
  const [distanceFilter, setDistanceFilter] = reactExports.useState("Any");
  const [prefOrientation, setPrefOrientation] = reactExports.useState(
    currentUser.orientation
  );
  const [prefOpen, setPrefOpen] = reactExports.useState(false);
  const [liked, setLiked] = reactExports.useState(/* @__PURE__ */ new Set());
  const [disliked, setDisliked] = reactExports.useState(/* @__PURE__ */ new Set());
  const [tipTarget, setTipTarget] = reactExports.useState(null);
  const maxDistance = distanceFilter === "1km" ? 1e3 : distanceFilter === "5km" ? 5e3 : distanceFilter === "25km" ? 25e3 : Number.POSITIVE_INFINITY;
  const filtered = MOCK_PROFILES.filter((p) => {
    if (liked.has(p.id) || disliked.has(p.id)) return false;
    const userOrientation = prefOrientation;
    if (userOrientation === "Straight") {
      if (currentUser.gender === "Male" && p.gender === "Male") return false;
      if (currentUser.gender === "Female" && p.gender === "Female")
        return false;
    } else if (userOrientation === "Gay") {
      if (p.gender !== currentUser.gender) return false;
    }
    if (genderFilter === "Women" && p.gender !== "Female") return false;
    if (genderFilter === "Men" && p.gender !== "Male") return false;
    if (genderFilter === "Non-binary" && p.gender !== "Non-binary")
      return false;
    if (intentFilter !== "All" && p.intent !== intentFilter) return false;
    if (p.distance > maxDistance) return false;
    return true;
  });
  const sorted = [...filtered].sort((a, b) => a.distance - b.distance);
  const handleLike = (id) => {
    setLiked((prev) => /* @__PURE__ */ new Set([...prev, id]));
  };
  const handleDislike = (id) => {
    setDisliked((prev) => /* @__PURE__ */ new Set([...prev, id]));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-4 sm:px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider mb-1",
            "data-ocid": "explore.page",
            style: { color: "oklch(0.96 0.01 265)" },
            children: "Discover Matches Nearby"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-sm flex items-center gap-1.5",
            style: { color: "oklch(0.58 0.04 265)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MapPin,
                {
                  className: "w-4 h-4",
                  style: { color: "oklch(0.70 0.18 295)" }
                }
              ),
              "Profiles sorted by proximity, closest first"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-wrap gap-2 mb-4",
          "data-ocid": "explore.filter.tab",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-ui font-medium mr-1",
                style: { color: "oklch(0.55 0.04 265)" },
                children: "Gender:"
              }
            ),
            GENDER_FILTER_LABELS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterChip,
              {
                active: genderFilter === g,
                onClick: () => setGenderFilter(g),
                children: g
              },
              g
            ))
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-ui font-medium mr-1",
            style: { color: "oklch(0.55 0.04 265)" },
            children: "Intent:"
          }
        ),
        INTENT_FILTER_LABELS.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterChip,
          {
            active: intentFilter === value,
            onClick: () => setIntentFilter(value),
            children: label
          },
          value
        ))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-ui font-medium mr-1",
            style: { color: "oklch(0.55 0.04 265)" },
            children: "Distance:"
          }
        ),
        DISTANCE_FILTER_LABELS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterChip,
          {
            active: distanceFilter === d,
            onClick: () => setDistanceFilter(d),
            children: d
          },
          d
        ))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Collapsible,
        {
          open: prefOpen,
          onOpenChange: setPrefOpen,
          className: "mb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "explore.preferences.toggle",
                className: "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-ui font-medium transition-all",
                style: {
                  background: "oklch(0.16 0.025 265)",
                  border: "1px solid oklch(0.28 0.04 265)",
                  color: "oklch(0.75 0.04 265)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "w-4 h-4" }),
                  "Preferences",
                  prefOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5 ml-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5 ml-1" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mt-2 p-4 rounded-2xl",
                style: {
                  background: "oklch(0.14 0.025 265 / 0.85)",
                  border: "1px solid oklch(0.26 0.04 265 / 0.6)",
                  backdropFilter: "blur(12px)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-ui font-semibold mb-3",
                      style: { color: "oklch(0.70 0.04 265)" },
                      children: "I’M INTERESTED IN"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["Straight", "Gay", "Bisexual", "Other"].map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FilterChip,
                    {
                      active: prefOrientation === o,
                      onClick: () => setPrefOrientation(o),
                      ocid: `explore.orientation.${o.toLowerCase()}.toggle`,
                      children: o
                    },
                    o
                  )) })
                ]
              }
            ) })
          ]
        }
      ),
      sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "explore.empty_state",
          className: "text-center py-20 rounded-2xl",
          style: {
            background: "oklch(0.14 0.025 265 / 0.7)",
            border: "1px solid oklch(0.26 0.04 265 / 0.5)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Heart,
              {
                className: "w-16 h-16 mx-auto mb-4 opacity-20",
                style: { color: "oklch(0.62 0.24 340)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-display text-2xl font-bold mb-2",
                style: { color: "oklch(0.96 0.01 265)" },
                children: "No matches nearby"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "oklch(0.55 0.04 265)" }, children: "Try adjusting your filters or expanding the distance" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: sorted.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProfileCard,
        {
          profile: p,
          index: i,
          onTip: () => setTipTarget({
            name: p.name,
            age: p.age,
            distance: p.distance
          }),
          onLike: () => handleLike(p.id),
          onDislike: () => handleDislike(p.id)
        },
        p.id
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
  ExplorePage as default
};
