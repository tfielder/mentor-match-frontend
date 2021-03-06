import { setLocale, setSearch, toggleShowingMentors } from './search-reducers';
import { setMentors, setMentorModal, isLoading, isEditable, hasErrored, setToken } from './mentors-reducers';
import { setStudents, setRelationships } from './students-reducers';
import { changeMentorFilters } from './preferences-reducers';

describe('isLoading', () => {
  it('should update state with the isLoading boolean', () => {
    const mockAction = { 
      type: "IS_LOADING",
      isLoading: true 
    }
    const expected = true

    const result = isLoading(false, mockAction)
    expect(result).toEqual(expected)
  });

  it('should return default state if nothing is passed in', () => {
    const mockAction = {
      isLoading: true
    }
    const expected = false

    const result = isLoading(undefined, mockAction)
    expect(result).toEqual(expected)
  });
});

describe('hasErrored', () => {
  it('should update state with the hasErrored boolean', () => {
    const mockAction = {
      type: "HAS_ERRORED",
      hasErrored: true
    }
    const expected = true

    const result = hasErrored(false, mockAction)
    expect(result).toEqual(expected)
  });

  it('should return default state if nothing is passed in', () => {
    const mockAction = {
      hasErrored: true
    }
    const expected = false

    const result = hasErrored(undefined, mockAction)
    expect(result).toEqual(expected)
  });
});

describe('isEditable reducer', () => {
  it('should update state with the isEditable boolean', () => {
    const mockAction = {
      type: "IS_EDITABLE",
      isEditable: true
    }
    const expected = true

    const result = isEditable(undefined, mockAction)
    expect(result).toEqual(expected)
  });

  it('should return default state if nothing is passed in', () => {
    const mockAction = {
      isEditable: true
    }
    const expected = false

    const result = isEditable(undefined, mockAction)
    expect(result).toEqual(expected)
  });
});

describe('setToken reducer', () => {
  it('should update state with token that is passed in', () => {
    const mockAction = {
      type: "SET_TOKEN",
      token: '1234ABCD'
    }
    const expected = '1234ABCD'

    const result = setToken(undefined, mockAction)
    expect(result).toEqual(expected)
  });

  it('should return default state if nothing is passed in', () => {
    const mockAction = {
      token: '1234ABCD'
    }
    
    const result = setToken(undefined, mockAction)
    expect(result).toEqual('')
  });
});

describe('setLocale reducer', () => {
  it('should update state with the locale passed in', () => {
    const mockAction = {
        type: "SET_LOCALE",
        locale: 'Remote'
    }
    const expected = 'Remote'

    const result = setLocale('', mockAction)
    expect(result).toEqual(expected)
  });

  it('should return original state as default', () => {
    const mockLocale = 'Remote'

    const result = setLocale(undefined, mockLocale)
    expect(result).toEqual('')
  });
});

describe('setSearch', () => {
  it('should update state with the search terms', () => {
    const mockAction = {
      type: "SET_SEARCH",
      searchTerm: 'skwijb'
    }
    const expected = 'skwijb'

    const result = setSearch('', mockAction)
    expect(result).toEqual(expected)
  });

  it('should return original state as default', () => {
    const mockSearchTerm = 'skwijb'

    const result = setSearch(undefined, mockSearchTerm)
    expect(result).toEqual('')
  });
});

describe('toggleShowingMentors', () => {
  it('should toggle the state if all mentors are showing', () => {
    const mockAction = {
      type: "TOGGLE_SHOWING_MENTORS",
      showingAllMentors: true
    }

    const result = toggleShowingMentors(undefined, mockAction)
    expect(result).toEqual(true)
  });

  it('should return false as the default state', () => {
    const mockAction = {
      showingAllMentors: true
    }

    const result = toggleShowingMentors(undefined, mockAction)
    expect(result).toEqual(false)
  });
});

describe('setMentors', () => {
  it('should update state with the array of mentors', () => {
    const mockAction = {
      type: "SET_MENTORS",
      mentors: [ { name: 'Stannis', preferences: { title: 'Doin\' stuff' } } ]
    }
    const expected = [ { name: 'Stannis', preferences: { title: 'Doin\' stuff' } } ]

    const result = setMentors([], mockAction)
    expect(result).toEqual(expected)
  });

  it('should update existing mentor array in state with changes', () => {
    const mockState = [ 
      { id: 2, name: 'Stannis', preferences: { title: 'Doin\' stuff' } },
      { id: 3, name: 'Maurey', preferences: { title: 'Doin\' more stuff' } }
    ]
    const mockAction = {
      type: "UPDATE_CHANGED_MENTOR",
      mentor: { id: 2, name: 'Robert', preferences: { title: 'Doin\' stuff' } }
    }
    const expected = [ 
      { id: 2, name: 'Robert', preferences: { title: 'Doin\' stuff' } },
      { id: 3, name: 'Maurey', preferences: { title: 'Doin\' more stuff' } }
    ]

    const result = setMentors(mockState, mockAction)
    expect(result).toEqual(expected)
  });

  it('should return original state as default', () => {
    const mockAction = {
      mentors: [ { name: 'Stannis', preferences: { title: 'Doin\' stuff' } } ]
    }
    const expected = []

    const result = setMentors(undefined, mockAction)
    expect(result).toEqual(expected)
  });
});

describe('setMentorModal', () => {
  it('should update state with new mentor object for the modal', () => {
    const mockAction = {
      type: "SET_MENTOR_MODAL",
      modalInfo: { name: 'carrie hairy', city: 'halle berry', preferences: { title: 'Doin\' Stuff' } }
    }
    const expected = { name: 'carrie hairy', city: 'halle berry', preferences: { title: 'Doin\' Stuff' } }

    const result = setMentorModal({}, mockAction)
    expect(result).toEqual(expected)
  });

  it('should edit the mentees assigned to a mentor', () => {
    const mockAction = {
      type: "ADD_MODAL_MENTEES",
      modalMentees: {
        name: 'carrie hairy', 
        city: 'halle berry', 
        preferences: { title: 'Doin\' Stuff' },
        mentees: [ { name: 'Jake Paralta' } ]
      }
    }
    const expected = {
      name: 'carrie hairy', 
      city: 'halle berry', 
      preferences: { title: 'Doin\' Stuff' },
      mentees: [ { name: 'Jake Paralta' } ]
    }

    const result = setMentorModal({}, mockAction)
    expect(result).toEqual(expected)
  });

  it('should return state of null as a default', () => {
    const mockAction = {
      modalInfo: { name: 'carrie hairy', city: 'halle berry', preferences: { title: 'Doin\' Stuff' } }
    }
    
    const result = setMentorModal(undefined, mockAction)
    expect(result).toEqual(null)
  });
});

describe('changeMentorFilters', () => {
  it('should update state with new mentorFilters', () => {
    const mockAction = {
      type: "CHANGE_MENTOR_FILTERS",
      mentorFilters: {
        backEnd: false,
        female: false,
        frontEnd: false,
        lgbtq: true,
        male: false,
        parent: false,
        veteran: false
      }
    }
    let mockFilters = {
      backEnd: false,
      female: false,
      frontEnd: false,
      lgbtq: true,
      male: false,
      parent: false,
      veteran: false
    }

    const result = changeMentorFilters(undefined, mockAction)
    expect(result).toEqual(mockFilters)
  });

  it('should return state of an empty object as a default', () => {
    const mockAction = {
      mentorFilters: {
        backEnd: false,
        female: false,
        frontEnd: false,
        lgbtq: true,
        male: false,
        parent: false,
        veteran: false
      }
    }

    const result = changeMentorFilters(undefined, mockAction)
    expect(result).toEqual({})
  });
});

describe('setStudents', () => {
  it('should set state with the students array', () => {
    let mockStudentAction = {
      type: "SET_STUDENTS",
      students: [
        {
          name: 'Casey'
        },
        {
          name: 'Alex'
        }
      ]
    }
    let expected = [
      {
        name: 'Casey'
      },
      {
        name: 'Alex'
      }
    ]

    const result = setStudents(undefined, mockStudentAction)
    expect(result).toEqual(expected)
  });

  it('should update a student in state', () => {
    let mockStudentAction = {
      type: "UPDATE_CHANGED_STUDENT",
      student : { id: 2, name: 'Gunther' }
    }
    let mockStudentState = [
      {
        id: 1,
        name: 'Dieter'
      },
      {
        id: 2,
        name: 'Heinrich'
      }
    ]
    let expected = [
      {
        id: 1,
        name: 'Dieter'
      },
      {
        id: 2,
        name: 'Gunther'
      }
    ]

    const result = setStudents(mockStudentState, mockStudentAction)
    expect(result).toEqual(expected)
  });

  it('should toggle an existing student to inactive/matched status', () => {
    let mockStudentAction = {
      type: "MAKE_STUDENT_INACTIVE",
      studentId: 2
    }
    let mockStudentState = [
      {
        id: 1,
        name: 'Casey',
        active: true,
        matched: false
      },
      {
        id: 2,
        name: 'Alex',
        active: true,
        matched: false
      }
    ]
    let expected = [
      {
        id: 1,
        name: 'Casey',
        active: true,
        matched: false
      },
      {
        id: 2,
        name: 'Alex',
        active: false,
        matched: true
      }
    ]

    const result = setStudents(mockStudentState, mockStudentAction)
    expect(result).toEqual(expected)
  });

  it('should return default state', () => {
    let mockStudentAction = {
      students: [
        {
          name: 'Casey'
        },
        {
          name: 'Alex'
        }
      ]
    }

    const result = setStudents(undefined, mockStudentAction)
    expect(result).toEqual([])
  });
});

describe('setRelationships', () => {
  it('should set relationships array to state', () => {
    let mockRelationshipAction = {
      type: "SET_RELATIONSHIPS",
      relationships: [
        {
          mentor_id: 2,
          student_id: 9,
          active: true
        },
        {
          mentor_id: 15,
          student_id: 20,
          active: true
        }
      ]
    }
    let expected = [
      {
        mentor_id: 2,
        student_id: 9,
        active: true
      },
      {
        mentor_id: 15,
        student_id: 20,
        active: true
      }
    ]

    const result = setRelationships(undefined, mockRelationshipAction)
    expect(result).toEqual(expected)
  });

  it('should return original state as a default', () => {
    let mockRelationshipAction = {
      relationships: [
        {
          mentor_id: 2,
          student_id: 9,
          active: true
        },
        {
          mentor_id: 15,
          student_id: 20,
          active: true
        }
      ]
    }

      const result = setRelationships(undefined, mockRelationshipAction)
      expect(result).toEqual([])
  });
});