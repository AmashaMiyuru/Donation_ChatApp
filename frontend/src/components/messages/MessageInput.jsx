import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaRegSmile, FaPaperclip } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !file) return;

    // Handle message submission
    if (message) {
      await sendMessage(message);
      setMessage("");
    }
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Unsupported file type. Please upload a JPEG, PNG, or PDF.");
        return;
      }

      if (selectedFile.size > maxSize) {
        alert("File is too large. Maximum size allowed is 5MB.");
        return;
      }

      setFile(selectedFile);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="relative flex items-center">
        {/* Emoji Picker Toggle */}
        <button
          type="button"
          className="mr-2 text-lg"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        >
          <FaRegSmile />
        </button>

        {/* File Input Trigger */}
        <label htmlFor="file-upload" className="mr-2 cursor-pointer text-lg">
          <FaPaperclip />
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Text Input */}
        <input
          type="text"
          className="flex-1 border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Send Button */}
        <button
          type="submit"
          className="ml-2 text-lg"
        >
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-12 left-0 z-10">
            <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
          </div>
        )}
      </div>
    </form>
  );
};

export default MessageInput;
