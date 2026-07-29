import api from "./api"; // Your axios instance

const meetingService = {
  // Upload audio and start AI analysis
  uploadMeeting: async (formData) => {
    const response = await api.post("/meetings/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Get all meetings for the dashboard
  getRecentMeetings: async () => {
    const response = await api.get("/meetings/recent");
    return response.data;
  },
};

export default meetingService;
