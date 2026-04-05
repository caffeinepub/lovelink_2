import { ExternalBlob } from "@/backend";
import Layout from "@/components/Layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useActor } from "@/hooks/useActor";
import {
  ArrowLeft,
  Camera,
  FolderOpen,
  Heart,
  ImageIcon,
  Lock,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CONTACTS = [
  {
    id: "c1",
    name: "Sofia Martinez",
    age: 27,
    photoUrl: "/assets/generated/profile-1.dim_400x500.jpg",
    photoColor: "#7C3AED",
    online: true,
  },
  {
    id: "c2",
    name: "James Chen",
    age: 30,
    photoUrl: "/assets/generated/profile-2.dim_400x500.jpg",
    photoColor: "#2563EB",
    online: false,
  },
  {
    id: "c3",
    name: "Aria Thompson",
    age: 28,
    photoUrl: "/assets/generated/profile-5.dim_400x500.jpg",
    photoColor: "#9333EA",
    online: true,
  },
];

type MsgKind = "text" | "viewOnce";
type ViewOnceState = "unseen" | "viewing" | "viewed";

interface ChatMessage {
  id: string;
  content: string;
  isSelf: boolean;
  time: string;
  kind: MsgKind;
  viewOnceState?: ViewOnceState;
  viewOnceBg?: string;
  imageUrl?: string;
}

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  c1: [
    {
      id: "1",
      content: "Hey! I saw your profile and love that you're into hiking! ⛰️",
      isSelf: false,
      time: "10:22",
      kind: "text",
    },
    {
      id: "2",
      content:
        "Thanks! Yes, I hike every weekend. Have you done any trails nearby?",
      isSelf: true,
      time: "10:25",
      kind: "text",
    },
    {
      id: "3",
      content: "I did the Pacific Crest last month 😍 So beautiful!",
      isSelf: false,
      time: "10:27",
      kind: "text",
    },
    {
      id: "4",
      content: "",
      isSelf: false,
      time: "10:30",
      kind: "viewOnce",
      viewOnceState: "unseen",
      viewOnceBg: "#7C3AED",
    },
    {
      id: "5",
      content: "That's on my bucket list! We should plan a trip sometime 💕",
      isSelf: true,
      time: "10:31",
      kind: "text",
    },
  ],
  c2: [
    {
      id: "1",
      content: "Love your bio about cooking! What's your specialty dish?",
      isSelf: true,
      time: "09:15",
      kind: "text",
    },
    {
      id: "2",
      content: "Homemade pasta from scratch 🍝 I'll cook for you sometime!",
      isSelf: false,
      time: "09:18",
      kind: "text",
    },
    {
      id: "3",
      content: "",
      isSelf: true,
      time: "09:20",
      kind: "viewOnce",
      viewOnceState: "viewed",
      viewOnceBg: "#2563EB",
    },
  ],
  c3: [
    {
      id: "1",
      content:
        "Your sense of style is incredible! Do you design your own clothes?",
      isSelf: false,
      time: "Yesterday",
      kind: "text",
    },
    {
      id: "2",
      content: "Thank you! I actually do – it's been my passion since school.",
      isSelf: true,
      time: "Yesterday",
      kind: "text",
    },
    {
      id: "3",
      content: "You should start a brand! I'd totally buy your pieces 😍",
      isSelf: false,
      time: "Yesterday",
      kind: "text",
    },
  ],
};

// ── ImageSourceSheet ────────────────────────────────────────────────────────
function ImageSourceSheet({
  onChooseLibrary,
  onTakePhoto,
  onCancel,
}: {
  onChooseLibrary: () => void;
  onTakePhoto: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      key="msg-sheet-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{
        background: "oklch(0.05 0.015 265 / 0.75)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="w-full max-w-sm mb-6 mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "oklch(0.17 0.028 265)",
          border: "1px solid oklch(0.30 0.06 295 / 0.5)",
          boxShadow: "0 -8px 40px oklch(0.10 0.02 265 / 0.8)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 pt-5 pb-2">
          <p
            className="text-xs font-ui font-semibold uppercase tracking-widest text-center"
            style={{ color: "oklch(0.55 0.06 295)" }}
          >
            Send View-Once Image
          </p>
        </div>
        <div className="px-4 pb-4 space-y-2">
          <button
            type="button"
            data-ocid="messages.upload_button"
            onClick={onChooseLibrary}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-ui font-medium transition-all hover:opacity-80 active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.24 295 / 0.2), oklch(0.62 0.24 340 / 0.2))",
              border: "1px solid oklch(0.55 0.24 295 / 0.4)",
              color: "oklch(0.90 0.12 295)",
            }}
          >
            <FolderOpen className="w-5 h-5" />
            Choose from Library
          </button>
          <button
            type="button"
            data-ocid="messages.camera_button"
            onClick={onTakePhoto}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-ui font-medium transition-all hover:opacity-80 active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.24 295 / 0.2), oklch(0.62 0.24 340 / 0.2))",
              border: "1px solid oklch(0.55 0.24 295 / 0.4)",
              color: "oklch(0.90 0.12 295)",
            }}
          >
            <Camera className="w-5 h-5" />
            Take Photo
          </button>
          <button
            type="button"
            data-ocid="messages.cancel_button"
            onClick={onCancel}
            className="w-full px-4 py-3 rounded-xl text-sm font-ui font-medium transition-all hover:opacity-70"
            style={{
              background: "oklch(0.22 0.025 265)",
              border: "1px solid oklch(0.30 0.04 265)",
              color: "oklch(0.60 0.04 265)",
            }}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── ViewOnceMessage ─────────────────────────────────────────────────────────
function ViewOnceMessage({
  msg,
  onView,
}: {
  msg: ChatMessage;
  onView: (id: string) => void;
}) {
  if (msg.viewOnceState === "viewed") {
    return (
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-ui"
        style={{
          background: "oklch(0.18 0.025 265)",
          color: "oklch(0.50 0.04 265)",
          border: "1px solid oklch(0.26 0.04 265)",
          borderRadius: msg.isSelf
            ? "18px 18px 4px 18px"
            : "18px 18px 18px 4px",
        }}
      >
        <Lock className="w-4 h-4" />
        <span>Image viewed</span>
      </div>
    );
  }
  if (msg.viewOnceState === "viewing") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-48 h-48 rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${msg.viewOnceBg}99, ${msg.viewOnceBg}44)`,
        }}
      >
        {msg.imageUrl ? (
          <img
            src={msg.imageUrl}
            alt="View once"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-4xl opacity-60">📸</span>
          </div>
        )}
      </motion.div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onView(msg.id)}
      className="flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-ui font-medium transition-all hover:opacity-80"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.55 0.24 295 / 0.2), oklch(0.62 0.24 340 / 0.2))",
        border: "1px solid oklch(0.55 0.24 295 / 0.4)",
        color: "oklch(0.82 0.18 295)",
        borderRadius: msg.isSelf ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
      }}
    >
      <Camera className="w-4 h-4" />
      <span>📷 Tap to view (1x)</span>
    </button>
  );
}

// ── ChatWindow ───────────────────────────────────────────────────────────────
function ChatWindow({
  contact,
  messages,
  onSend,
  onSendViewOnce,
  onViewOnce,
  onBack,
}: {
  contact: (typeof CONTACTS)[0];
  messages: ChatMessage[];
  onSend: (text: string) => void;
  onSendViewOnce: (imageUrl: string) => void;
  onViewOnce: (msgId: string) => void;
  onBack: () => void;
}) {
  const [text, setText] = useState("");
  const [showSheet, setShowSheet] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const libraryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const { actor } = useActor();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleImageFile = async (file: File) => {
    setIsUploading(true);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);

      if (actor) {
        // Upload via blob storage – setProfilePicture is the available upload method
        // We use the blob's local URL for display in this context
        await actor.setProfilePicture(blob);
      }

      const imageUrl = blob.getDirectURL();
      onSendViewOnce(imageUrl);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    await handleImageFile(file);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b flex-shrink-0"
        style={{ borderColor: "oklch(0.26 0.04 265)" }}
      >
        <button
          type="button"
          onClick={onBack}
          data-ocid="messages.back.button"
          className="md:hidden mr-1 transition-colors"
          style={{ color: "oklch(0.60 0.04 265)" }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div
          className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${contact.photoUrl})`,
            background: !contact.photoUrl
              ? `linear-gradient(135deg, ${contact.photoColor}66, ${contact.photoColor}33)`
              : undefined,
          }}
        />
        <div>
          <p
            className="font-ui font-semibold"
            style={{ color: "oklch(0.96 0.01 265)" }}
          >
            {contact.name}
          </p>
          <p
            className="text-xs flex items-center gap-1"
            style={{
              color: contact.online
                ? "oklch(0.65 0.20 155)"
                : "oklch(0.50 0.04 265)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: contact.online
                  ? "oklch(0.65 0.20 155)"
                  : "oklch(0.40 0.04 265)",
              }}
            />
            {contact.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-5 py-4">
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx < 5 ? idx * 0.04 : 0 }}
                className={`flex ${msg.isSelf ? "justify-end" : "justify-start"}`}
              >
                {msg.kind === "viewOnce" ? (
                  <ViewOnceMessage msg={msg} onView={onViewOnce} />
                ) : (
                  <div
                    className="max-w-[75%] px-4 py-2.5 text-sm leading-relaxed"
                    style={{
                      background: msg.isSelf
                        ? "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.50 0.26 305))"
                        : "oklch(0.18 0.025 265)",
                      color: msg.isSelf ? "white" : "oklch(0.85 0.02 265)",
                      borderRadius: msg.isSelf
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                      border: msg.isSelf
                        ? "none"
                        : "1px solid oklch(0.26 0.04 265)",
                    }}
                  >
                    {msg.content}
                    <div className="text-xs mt-1 opacity-60 text-right">
                      {msg.time}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div ref={endRef} />
      </ScrollArea>

      {/* Input */}
      <div
        className="px-4 py-4 border-t flex-shrink-0"
        style={{ borderColor: "oklch(0.26 0.04 265)" }}
      >
        <div className="flex gap-2 items-center">
          <button
            type="button"
            data-ocid="messages.upload_button"
            onClick={() => setShowSheet(true)}
            disabled={isUploading}
            title="Send view-once image"
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors hover:opacity-80 disabled:opacity-40"
            style={{
              background: "oklch(0.18 0.025 265)",
              border: "1px solid oklch(0.26 0.04 265)",
              color: "oklch(0.65 0.18 295)",
            }}
          >
            {isUploading ? (
              <span
                className="w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"
                data-ocid="messages.loading_state"
              />
            ) : (
              <ImageIcon className="w-4 h-4" />
            )}
          </button>
          <input
            data-ocid="messages.input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Message ${contact.name}...`}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-ui outline-none"
            style={{
              background: "oklch(0.18 0.025 265)",
              border: "1px solid oklch(0.26 0.04 265)",
              color: "oklch(0.96 0.01 265)",
            }}
          />
          <button
            type="button"
            data-ocid="messages.submit_button"
            onClick={handleSend}
            disabled={!text.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:opacity-90 disabled:opacity-40"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.24 295), oklch(0.62 0.24 340))",
              boxShadow: "0 0 12px oklch(0.55 0.24 295 / 0.4)",
            }}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p
          className="text-xs mt-2 text-center"
          style={{ color: "oklch(0.45 0.04 265)" }}
        >
          📷 Camera icon sends a view-once image that disappears after viewing
        </p>
      </div>

      {/* Hidden file inputs – images only */}
      <input
        ref={libraryRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Image Source Sheet */}
      <AnimatePresence>
        {showSheet && (
          <ImageSourceSheet
            onChooseLibrary={() => {
              setShowSheet(false);
              setTimeout(() => libraryRef.current?.click(), 50);
            }}
            onTakePhoto={() => {
              setShowSheet(false);
              setTimeout(() => cameraRef.current?.click(), 50);
            }}
            onCancel={() => setShowSheet(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string>(CONTACTS[0].id);
  const [showChat, setShowChat] = useState(false);
  const [allMessages, setAllMessages] =
    useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);

  const selectedContact =
    CONTACTS.find((c) => c.id === selectedId) ?? CONTACTS[0];
  const messages = allMessages[selectedId] ?? [];

  const handleSend = (text: string) => {
    const newMsg: ChatMessage = {
      id: `${Date.now()}`,
      content: text,
      isSelf: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      kind: "text",
    };
    setAllMessages((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] ?? []), newMsg],
    }));
  };

  const handleSendViewOnce = (imageUrl: string) => {
    const newMsg: ChatMessage = {
      id: `${Date.now()}`,
      content: "",
      isSelf: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      kind: "viewOnce",
      viewOnceState: "unseen",
      viewOnceBg: "#7C3AED",
      imageUrl,
    };
    setAllMessages((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] ?? []), newMsg],
    }));
  };

  const handleViewOnce = (msgId: string) => {
    setAllMessages((prev) => ({
      ...prev,
      [selectedId]: (prev[selectedId] ?? []).map((m) =>
        m.id === msgId
          ? { ...m, viewOnceState: "viewing" as ViewOnceState }
          : m,
      ),
    }));
    setTimeout(() => {
      setAllMessages((prev) => ({
        ...prev,
        [selectedId]: (prev[selectedId] ?? []).map((m) =>
          m.id === msgId
            ? { ...m, viewOnceState: "viewed" as ViewOnceState }
            : m,
        ),
      }));
    }, 3000);
  };

  const lastMsgOf = (id: string) => {
    const msgs = allMessages[id] ?? [];
    return msgs[msgs.length - 1];
  };

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            height: "calc(100vh - 140px)",
            background: "oklch(0.14 0.025 265 / 0.8)",
            backdropFilter: "blur(16px)",
            border: "1px solid oklch(0.26 0.04 265 / 0.6)",
          }}
        >
          <div className="flex h-full">
            {/* Sidebar */}
            <div
              className={`${
                showChat ? "hidden md:flex" : "flex"
              } flex-col w-full md:w-72 border-r flex-shrink-0`}
              style={{ borderColor: "oklch(0.26 0.04 265)" }}
            >
              <div
                className="px-4 py-4 border-b flex-shrink-0"
                style={{ borderColor: "oklch(0.26 0.04 265)" }}
              >
                <h2
                  className="font-display text-xl font-bold"
                  style={{ color: "oklch(0.96 0.01 265)" }}
                >
                  Messages
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
                {CONTACTS.length === 0 ? (
                  <div
                    data-ocid="messages.empty_state"
                    className="p-8 text-center"
                  >
                    <Heart
                      className="w-12 h-12 mx-auto mb-3 opacity-20"
                      style={{ color: "oklch(0.62 0.24 340)" }}
                    />
                    <p
                      className="text-sm"
                      style={{ color: "oklch(0.55 0.04 265)" }}
                    >
                      No conversations yet
                    </p>
                  </div>
                ) : (
                  CONTACTS.map((c, i) => {
                    const isSelected = selectedId === c.id;
                    const lastMsg = lastMsgOf(c.id);
                    return (
                      <button
                        type="button"
                        key={c.id}
                        data-ocid={`messages.contact.item.${i + 1}`}
                        onClick={() => {
                          setSelectedId(c.id);
                          setShowChat(true);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-left"
                        style={{
                          background: isSelected
                            ? "oklch(0.55 0.24 295 / 0.12)"
                            : "transparent",
                          borderLeft: isSelected
                            ? "2px solid oklch(0.70 0.20 295)"
                            : "2px solid transparent",
                        }}
                      >
                        <div className="relative flex-shrink-0">
                          <div
                            className="w-12 h-12 rounded-full overflow-hidden bg-cover bg-center"
                            style={{ backgroundImage: `url(${c.photoUrl})` }}
                          />
                          <div
                            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
                            style={{
                              background: c.online
                                ? "oklch(0.65 0.20 155)"
                                : "oklch(0.40 0.04 265)",
                              borderColor: "oklch(0.14 0.025 265)",
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p
                              className="text-sm font-ui font-semibold"
                              style={{ color: "oklch(0.96 0.01 265)" }}
                            >
                              {c.name}
                            </p>
                            {lastMsg && (
                              <span
                                className="text-xs"
                                style={{ color: "oklch(0.45 0.04 265)" }}
                              >
                                {lastMsg.time}
                              </span>
                            )}
                          </div>
                          {lastMsg && (
                            <p
                              className="text-xs truncate mt-0.5"
                              style={{ color: "oklch(0.55 0.04 265)" }}
                            >
                              {lastMsg.isSelf ? "You: " : ""}
                              {lastMsg.kind === "viewOnce"
                                ? "📷 Photo"
                                : lastMsg.content}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Chat window */}
            <div
              className={`flex-1 flex flex-col min-w-0 ${
                !showChat ? "hidden md:flex" : "flex"
              }`}
            >
              {selectedContact ? (
                <ChatWindow
                  contact={selectedContact}
                  messages={messages}
                  onSend={handleSend}
                  onSendViewOnce={handleSendViewOnce}
                  onViewOnce={handleViewOnce}
                  onBack={() => setShowChat(false)}
                />
              ) : (
                <div
                  data-ocid="messages.empty_state"
                  className="flex-1 flex flex-col items-center justify-center"
                >
                  <MessageCircle
                    className="w-16 h-16 mb-4 opacity-10"
                    style={{ color: "oklch(0.96 0.01 265)" }}
                  />
                  <p style={{ color: "oklch(0.55 0.04 265)" }}>
                    Select a conversation
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
