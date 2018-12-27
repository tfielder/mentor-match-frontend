export const setMentors = (mentorInfo) => ({
  type: "SET_MENTORS",
  mentors: mentorInfo
});

export const updateChangedMentor = (mentorInfo) => ({
  type: "UPDATE_CHANGED_MENTOR",
  mentor: mentorInfo,
});

export const setMentorModal = (mentorInfo) => ({
  type: "SET_MENTOR_MODAL",
  modalInfo: mentorInfo
})