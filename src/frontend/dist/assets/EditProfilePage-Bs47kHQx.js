import { j as jsxRuntimeExports, c as cn, u as useAuth, a as useNavigate, r as reactExports, b as ue } from "./index-VuP7z-8C.js";
import { L as Layout } from "./Layout-C5EoH42h.js";
import { L as Label, X, I as Input } from "./label-byuGifbp.js";
import { A as ArrowLeft } from "./arrow-left-BIDzdM1F.js";
import { c as createLucideIcon, m as motion } from "./proxy-A24e9-ZM.js";
import { M as MapPin } from "./map-pin-Bbv46cBl.js";
import { C as Check } from "./check-C7lCs4HX.js";
import "./index-auF4jfXf.js";
import "./heart-C3grFkaB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const INITIAL_PHOTOS = [
  { url: "/assets/generated/profile-1.dim_400x500.jpg", slotId: "slot-0" },
  { url: "/assets/generated/profile-3.dim_400x500.jpg", slotId: "slot-1" },
  null,
  null,
  null
];
function EditProfilePage() {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = reactExports.useState(currentUser.name);
  const [age, setAge] = reactExports.useState("27");
  const [bio, setBio] = reactExports.useState(
    "Adventure seeker ✨ Coffee addict ☕ Love hiking, photography, and discovering hidden city gems."
  );
  const [gender, setGender] = reactExports.useState(currentUser.gender);
  const [orientation, setOrientation] = reactExports.useState(
    currentUser.orientation
  );
  const [intent, setIntent] = reactExports.useState(currentUser.intent);
  const [interests, setInterests] = reactExports.useState([
    "Photography",
    "Hiking",
    "Travel",
    "Art",
    "Coffee"
  ]);
  const [interestInput, setInterestInput] = reactExports.useState("");
  const [photos, setPhotos] = reactExports.useState(INITIAL_PHOTOS);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const fileRefs = reactExports.useRef([]);
  const handlePhotoSelect = (idx, e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotos((prev) => {
      const next = [...prev];
      next[idx] = { url, file, slotId: `slot-${idx}` };
      return next;
    });
  };
  const removePhoto = (idx) => {
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
  const removeInterest = (interest) => {
    setInterests((prev) => prev.filter((x) => x !== interest));
  };
  const handleSave = async () => {
    if (!name.trim()) {
      ue.error("Name is required");
      return;
    }
    const ageNum = Number.parseInt(age);
    if (Number.isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      ue.error("Please enter a valid age (18–100)");
      return;
    }
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setCurrentUser({ name: name.trim(), gender, orientation, intent });
    setIsSaving(false);
    ue.success("Profile saved! 💕");
    navigate("/profile");
  };
  function OptionButton({
    value,
    current,
    onClick,
    children
  }) {
    const isActive = value === current;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onClick(value),
        className: "flex-1 py-2 px-3 rounded-xl text-sm font-ui font-medium transition-all",
        style: {
          background: isActive ? "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))" : "oklch(0.18 0.025 265)",
          color: isActive ? "white" : "oklch(0.60 0.04 265)",
          border: isActive ? "none" : "1px solid oklch(0.28 0.04 265)",
          boxShadow: isActive ? "0 0 10px oklch(0.55 0.24 295 / 0.35)" : void 0
        },
        children
      }
    );
  }
  const IntentCard = ({
    value,
    label,
    icon,
    desc
  }) => {
    const isActive = intent === value;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIntent(value),
        className: "flex-1 p-3 rounded-xl text-left transition-all",
        style: {
          background: isActive ? "oklch(0.55 0.24 295 / 0.15)" : "oklch(0.18 0.025 265)",
          border: isActive ? "1px solid oklch(0.55 0.24 295 / 0.5)" : "1px solid oklch(0.28 0.04 265)",
          boxShadow: isActive ? "0 0 12px oklch(0.55 0.24 295 / 0.25)" : void 0
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl mb-1", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-sm font-ui font-semibold",
              style: {
                color: isActive ? "oklch(0.82 0.18 295)" : "oklch(0.75 0.04 265)"
              },
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-xs mt-0.5",
              style: { color: "oklch(0.50 0.04 265)" },
              children: desc
            }
          ),
          isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Check,
            {
              className: "w-3.5 h-3.5",
              style: { color: "oklch(0.75 0.20 295)" }
            }
          ) })
        ]
      }
    );
  };
  const SLOT_IDS = ["slot-0", "slot-1", "slot-2", "slot-3", "slot-4"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[640px] mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate("/profile"),
          className: "w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-80",
          style: {
            background: "oklch(0.18 0.025 265)",
            border: "1px solid oklch(0.28 0.04 265)",
            color: "oklch(0.75 0.04 265)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "font-display text-3xl font-bold",
          "data-ocid": "profile.panel",
          style: { color: "oklch(0.96 0.01 265)" },
          children: "Edit Profile"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "rounded-2xl p-6 space-y-6",
        style: {
          background: "oklch(0.15 0.025 265 / 0.75)",
          backdropFilter: "blur(16px)",
          border: "1px solid oklch(0.28 0.04 265 / 0.6)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                className: "text-sm font-ui font-semibold mb-3 block",
                style: { color: "oklch(0.70 0.04 265)" },
                children: "PHOTOS (up to 5)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: SLOT_IDS.map((slotId, idx) => {
              const slot = photos[idx];
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square relative", children: [
                slot ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full h-full rounded-xl bg-cover bg-center",
                      style: { backgroundImage: `url(${slot.url})` }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removePhoto(idx),
                      className: "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center",
                      style: {
                        background: "oklch(0.60 0.22 27)",
                        color: "white"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `profile.upload_button.${idx + 1}`,
                    onClick: () => {
                      var _a;
                      return (_a = fileRefs.current[idx]) == null ? void 0 : _a.click();
                    },
                    className: "w-full h-full rounded-xl flex items-center justify-center transition-all hover:opacity-70",
                    style: {
                      background: "oklch(0.18 0.025 265)",
                      border: "1px dashed oklch(0.30 0.04 265)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Plus,
                      {
                        className: "w-5 h-5",
                        style: { color: "oklch(0.45 0.04 265)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: (el) => {
                      fileRefs.current[idx] = el;
                    },
                    type: "file",
                    accept: "image/*",
                    className: "hidden",
                    onChange: (e) => handlePhotoSelect(idx, e)
                  }
                )
              ] }, slotId);
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                className: "text-sm font-ui font-semibold",
                style: { color: "oklch(0.70 0.04 265)" },
                children: "NAME *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "profile.input",
                value: name,
                onChange: (e) => setName(e.target.value),
                className: "rounded-xl",
                style: {
                  background: "oklch(0.18 0.025 265)",
                  borderColor: "oklch(0.28 0.04 265)",
                  color: "oklch(0.96 0.01 265)"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                className: "text-sm font-ui font-semibold",
                style: { color: "oklch(0.70 0.04 265)" },
                children: "AGE *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "18",
                max: "100",
                value: age,
                onChange: (e) => setAge(e.target.value),
                className: "rounded-xl",
                style: {
                  background: "oklch(0.18 0.025 265)",
                  borderColor: "oklch(0.28 0.04 265)",
                  color: "oklch(0.96 0.01 265)"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                className: "text-sm font-ui font-semibold",
                style: { color: "oklch(0.70 0.04 265)" },
                children: "ABOUT YOU"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                "data-ocid": "profile.textarea",
                value: bio,
                onChange: (e) => setBio(e.target.value),
                rows: 3,
                className: "rounded-xl resize-none",
                style: {
                  background: "oklch(0.18 0.025 265)",
                  borderColor: "oklch(0.28 0.04 265)",
                  color: "oklch(0.96 0.01 265)"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                className: "text-sm font-ui font-semibold",
                style: { color: "oklch(0.70 0.04 265)" },
                children: "GENDER"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["Male", "Female", "Non-binary"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              OptionButton,
              {
                value: g,
                current: gender,
                onClick: setGender,
                children: g
              },
              g
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                className: "text-sm font-ui font-semibold",
                style: { color: "oklch(0.70 0.04 265)" },
                children: "ORIENTATION"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["Straight", "Gay", "Bisexual", "Other"].map(
              (o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                OptionButton,
                {
                  value: o,
                  current: orientation,
                  onClick: setOrientation,
                  children: o
                },
                o
              )
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                className: "text-sm font-ui font-semibold",
                style: { color: "oklch(0.70 0.04 265)" },
                children: "LOOKING FOR"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                IntentCard,
                {
                  value: "LongTerm",
                  label: "Long term",
                  icon: "💑",
                  desc: "Serious relationship"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                IntentCard,
                {
                  value: "Casual",
                  label: "Casual",
                  icon: "😊",
                  desc: "Relaxed dating"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                IntentCard,
                {
                  value: "FunNow",
                  label: "Fun now",
                  icon: "⚡",
                  desc: "Something spontaneous"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                className: "text-sm font-ui font-semibold",
                style: { color: "oklch(0.70 0.04 265)" },
                children: "INTERESTS"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Add interest...",
                  value: interestInput,
                  onChange: (e) => setInterestInput(e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && addInterest(),
                  className: "flex-1 px-3 py-2 rounded-xl text-sm font-ui outline-none",
                  style: {
                    background: "oklch(0.18 0.025 265)",
                    border: "1px solid oklch(0.28 0.04 265)",
                    color: "oklch(0.96 0.01 265)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: addInterest,
                  className: "px-4 py-2 rounded-xl text-sm font-ui font-medium transition-all hover:opacity-80",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
                    color: "white"
                  },
                  children: "Add"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: interests.map((interest) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-ui font-medium",
                style: {
                  background: "oklch(0.55 0.24 295 / 0.15)",
                  border: "1px solid oklch(0.55 0.24 295 / 0.3)",
                  color: "oklch(0.80 0.18 295)"
                },
                children: [
                  interest,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeInterest(interest),
                      className: "hover:opacity-70",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                    }
                  )
                ]
              },
              interest
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-ui font-medium transition-all hover:opacity-80",
              style: {
                background: "oklch(0.18 0.025 265)",
                border: "1px solid oklch(0.28 0.04 265)",
                color: "oklch(0.70 0.18 295)"
              },
              onClick: () => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    () => ue.success("Location shared! 📍"),
                    () => ue.error("Location access denied")
                  );
                }
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
                "Share Location"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "profile.save_button",
              onClick: handleSave,
              disabled: isSaving,
              className: "w-full py-4 rounded-xl font-ui font-semibold text-base flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60",
              style: {
                background: "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305), oklch(0.62 0.24 340))",
                color: "white",
                boxShadow: "0 0 20px oklch(0.55 0.24 295 / 0.45)"
              },
              children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                " ",
                "Saving..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                " Save Profile"
              ] })
            }
          )
        ]
      }
    )
  ] }) });
}
export {
  EditProfilePage as default
};
