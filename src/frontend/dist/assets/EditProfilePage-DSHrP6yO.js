import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue, E as ExternalBlob } from "./index--RR2uuHP.js";
import { L as Layout } from "./Layout-D0gvy7ZP.js";
import { L as Label, X, I as Input } from "./label-DO6Grs1N.js";
import { T as Textarea } from "./textarea-S3DW-plp.js";
import { u as useActor } from "./useActor-C-OR18B7.js";
import { A as ArrowLeft, F as FolderOpen } from "./folder-open-DPd7Eekk.js";
import { c as createLucideIcon, m as motion } from "./proxy-BsJ5N3Wv.js";
import { M as MapPin } from "./map-pin-DCiVeOdq.js";
import { C as Check } from "./check-DDzpqyph.js";
import { C as Camera } from "./camera-XrNRsahX.js";
import { A as AnimatePresence } from "./index-Bp5K5t2K.js";
import "./index-vqmhqKR0.js";
import "./heart-DZ9kxm27.js";
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
const INITIAL_PHOTOS = [
  { url: "/assets/generated/profile-1.dim_400x500.jpg", slotId: "slot-0" },
  { url: "/assets/generated/profile-3.dim_400x500.jpg", slotId: "slot-1" },
  null,
  null,
  null
];
function ImageSourceSheet({
  onChooseLibrary,
  onTakePhoto,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-end justify-center",
      style: {
        background: "oklch(0.05 0.015 265 / 0.75)",
        backdropFilter: "blur(4px)"
      },
      onClick: onCancel,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
          transition: { type: "spring", damping: 28, stiffness: 300 },
          className: "w-full max-w-sm mb-6 mx-4 rounded-2xl overflow-hidden",
          style: {
            background: "oklch(0.17 0.028 265)",
            border: "1px solid oklch(0.30 0.06 295 / 0.5)",
            boxShadow: "0 -8px 40px oklch(0.10 0.02 265 / 0.8)"
          },
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pt-5 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs font-ui font-semibold uppercase tracking-widest text-center",
                style: { color: "oklch(0.55 0.06 295)" },
                children: "Add Photo"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "profile.upload_button",
                  onClick: onChooseLibrary,
                  className: "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-ui font-medium transition-all hover:opacity-80 active:scale-[0.98]",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.55 0.24 295 / 0.2), oklch(0.62 0.24 340 / 0.2))",
                    border: "1px solid oklch(0.55 0.24 295 / 0.4)",
                    color: "oklch(0.90 0.12 295)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-5 h-5" }),
                    "Choose from Library"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "profile.camera_button",
                  onClick: onTakePhoto,
                  className: "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-ui font-medium transition-all hover:opacity-80 active:scale-[0.98]",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.55 0.24 295 / 0.2), oklch(0.62 0.24 340 / 0.2))",
                    border: "1px solid oklch(0.55 0.24 295 / 0.4)",
                    color: "oklch(0.90 0.12 295)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-5 h-5" }),
                    "Take Photo"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "profile.cancel_button",
                  onClick: onCancel,
                  className: "w-full px-4 py-3 rounded-xl text-sm font-ui font-medium transition-all hover:opacity-70",
                  style: {
                    background: "oklch(0.22 0.025 265)",
                    border: "1px solid oklch(0.30 0.04 265)",
                    color: "oklch(0.60 0.04 265)"
                  },
                  children: "Cancel"
                }
              )
            ] })
          ]
        }
      )
    },
    "image-sheet-overlay"
  );
}
function EditProfilePage() {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const { actor } = useActor();
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
  const [sheetSlot, setSheetSlot] = reactExports.useState(null);
  const libraryRefs = reactExports.useRef([]);
  const cameraRefs = reactExports.useRef([]);
  const uploadPhoto = async (idx, file) => {
    const previewUrl = URL.createObjectURL(file);
    setPhotos((prev) => {
      const next = [...prev];
      next[idx] = { url: previewUrl, slotId: `slot-${idx}`, uploading: true };
      return next;
    });
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      if (actor) {
        await actor.setProfilePicture(blob);
      }
      const finalUrl = blob.getDirectURL();
      setPhotos((prev) => {
        const next = [...prev];
        next[idx] = { url: finalUrl, slotId: `slot-${idx}`, uploading: false };
        return next;
      });
      ue.success("Photo uploaded! 🖼️");
    } catch (err) {
      console.error(err);
      ue.error("Upload failed. Please try again.");
      setPhotos((prev) => {
        const next = [...prev];
        next[idx] = {
          url: previewUrl,
          slotId: `slot-${idx}`,
          uploading: false
        };
        return next;
      });
    }
  };
  const handleFileChange = (idx, e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    e.target.value = "";
    uploadPhoto(idx, file);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[640px] mx-auto px-4 sm:px-6 py-8", children: [
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
                    slot.uploading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute inset-0 rounded-xl flex items-center justify-center",
                        style: {
                          background: "oklch(0.10 0.02 265 / 0.65)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin",
                            "data-ocid": `profile.loading_state.${idx + 1}`
                          }
                        )
                      }
                    ),
                    !slot.uploading && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                      onClick: () => setSheetSlot(idx),
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
                        libraryRefs.current[idx] = el;
                      },
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: (e) => handleFileChange(idx, e)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: (el) => {
                        cameraRefs.current[idx] = el;
                      },
                      type: "file",
                      accept: "image/*",
                      capture: "environment",
                      className: "hidden",
                      onChange: (e) => handleFileChange(idx, e)
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
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: sheetSlot !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImageSourceSheet,
      {
        onChooseLibrary: () => {
          const idx = sheetSlot;
          setSheetSlot(null);
          setTimeout(() => {
            var _a;
            return (_a = libraryRefs.current[idx]) == null ? void 0 : _a.click();
          }, 50);
        },
        onTakePhoto: () => {
          const idx = sheetSlot;
          setSheetSlot(null);
          setTimeout(() => {
            var _a;
            return (_a = cameraRefs.current[idx]) == null ? void 0 : _a.click();
          }, 50);
        },
        onCancel: () => setSheetSlot(null)
      }
    ) })
  ] });
}
export {
  EditProfilePage as default
};
