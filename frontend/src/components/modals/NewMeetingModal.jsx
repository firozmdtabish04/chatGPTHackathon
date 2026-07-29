import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Mic, FileAudio, Loader2, Sparkles } from "lucide-react";
import meetingService from "../../services/meetingService";

const NewMeetingModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !title) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);

      await meetingService.uploadMeeting(formData);
      onUploadSuccess();
      onClose();
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20">
                <Mic className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                Process New Meeting
              </h2>
            </div>

            <div className="space-y-6">
              {/* Meeting Title */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">
                  Session Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Q4 Strategy Sync"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:ring-2 focus:ring-blue-500/40 outline-none transition-all"
                />
              </div>

              {/* Upload Zone */}
              <div
                className={`border-2 border-dashed rounded-[2rem] p-10 flex flex-col items-center justify-center transition-all ${
                  file
                    ? "border-blue-500 bg-blue-500/5"
                    : "border-slate-800 hover:border-slate-700 bg-slate-950/30"
                }`}
              >
                <input
                  type="file"
                  id="audio-upload"
                  className="hidden"
                  accept="audio/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="audio-upload"
                  className="cursor-pointer flex flex-col items-center text-center"
                >
                  {file ? (
                    <>
                      <FileAudio size={48} className="text-blue-500 mb-4" />
                      <p className="text-sm font-bold text-white">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-slate-500 uppercase mt-1">
                        Click to change file
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-white/5">
                        <Upload size={24} className="text-slate-400" />
                      </div>
                      <p className="text-sm font-bold text-slate-300">
                        Drop audio file or{" "}
                        <span className="text-blue-500">browse</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Supports MP3, WAV, M4A (Max 25MB)
                      </p>
                    </>
                  )}
                </label>
              </div>

              {/* AI Notice */}
              <div className="bg-blue-600/5 border border-blue-500/10 rounded-2xl p-4 flex gap-3">
                <Sparkles className="text-blue-500 shrink-0" size={18} />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  MinutesMind AI will transcribe your audio, generate a
                  high-level summary, and automatically extract action items for
                  your Focus List.
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={handleUpload}
                disabled={!file || !title || uploading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 transition-all"
              >
                {uploading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Processing AI
                    Insights...
                  </>
                ) : (
                  "Start Analysis"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewMeetingModal;
