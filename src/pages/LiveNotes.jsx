import { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";

const LiveNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [notes]);

  const addNote = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addDoc(collection(db, "notes"), {
      text,
      user: user?.username || "Anonymous",
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  const initials = (name) =>
    name?.slice(0, 2).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl flex flex-col h-[80vh]">

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Live Notes
            </h2>
            <p className="text-sm text-gray-500">
              Real-time team notes synced instantly
            </p>
          </div>

          <span className="text-xs text-green-600 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            Live
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {notes.map((note, index) => {
            const isMe = note.user === user?.username;
            const showUser =
              index === 0 || notes[index - 1]?.user !== note.user;

            return (
              <div
                key={note.id}
                className={`flex gap-3 ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                {!isMe && showUser && (
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    {initials(note.user)}
                  </div>
                )}

                <div
                  className={`max-w-[70%] px-4 py-3 rounded-lg border text-sm
                  ${
                    isMe
                      ? "bg-indigo-50 border-indigo-200 text-gray-800"
                      : "bg-gray-50 border-gray-200 text-gray-700"
                  }`}
                >
                  {showUser && (
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      {note.user}
                    </p>
                  )}
                  <p>{note.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={addNote}
          className="px-6 py-4 border-t border-gray-200 bg-white flex gap-3"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a note..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-lg font-medium transition"
          >
            Send
          </button>
        </form>

      </div>
    </div>
  );
};

export default LiveNotes;
