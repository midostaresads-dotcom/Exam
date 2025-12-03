import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Student, Exam, ExamResult, Admin } from '../types';
import initialExams from '../data/initialExams.json';
import API_BASE_URL from '../config/api';

interface AppState {
  // Student State
  currentStudent: Student | null;
  registerStudent: (student: Student) => void;
  logoutStudent: () => void;

  // Exam State
  exams: Exam[];
  setExams: (exams: Exam[]) => void;
  addExam: (exam: Exam) => void;
  updateExam: (exam: Exam) => void;
  deleteExam: (examId: string) => void;

  // Results State - Removed, now using Firebase

  // Admin State
  isAdminLoggedIn: boolean;
  adminLogin: () => void;
  adminLogout: () => void;
  
  // Initialization
  initializeExams: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentStudent: null,
      registerStudent: (student) => set({ currentStudent: student }),
      logoutStudent: () => set({ currentStudent: null }),

      exams: [],
      setExams: (exams) => set({ exams }),
      addExam: async (exam) => {
        try {
          const response = await fetch('http://localhost:3001/exams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: exam.title,
              description: exam.description,
              questions_json: JSON.stringify(exam.questions)
            })
          });
          if (response.ok) {
            const result = await response.json();
            const newExam = { ...exam, id: result.id.toString() };
            set((state) => ({ exams: [...state.exams, newExam] }));
          } else {
            console.error('Failed to add exam to backend');
          }
        } catch (error) {
          console.error('Error adding exam:', error);
        }
      },
      updateExam: async (updatedExam) => {
        try {
          const response = await fetch(`${API_BASE_URL}/exams/${updatedExam.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: updatedExam.title,
              description: updatedExam.description,
              questions_json: JSON.stringify(updatedExam.questions)
            })
          });
          if (response.ok) {
            set((state) => ({
              exams: state.exams.map((exam) =>
                exam.id === updatedExam.id ? updatedExam : exam
              ),
            }));
          } else {
            console.error('Failed to update exam in backend');
          }
        } catch (error) {
          console.error('Error updating exam:', error);
        }
      },
      deleteExam: async (examId) => {
        try {
          const response = await fetch(`${API_BASE_URL}/exams/${examId}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            set((state) => ({
              exams: state.exams.filter((exam) => exam.id !== examId),
            }));
          } else {
            console.error('Failed to delete exam from backend');
          }
        } catch (error) {
          console.error('Error deleting exam:', error);
        }
      },



      isAdminLoggedIn: false,
      adminLogin: () => set({ isAdminLoggedIn: true }),
      adminLogout: () => set({ isAdminLoggedIn: false }),

      initializeExams: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/exams`);
          if (response.ok) {
            const rawExams = await response.json();
            const exams = rawExams.map((exam: any) => ({
              ...exam,
              id: exam.id.toString(),
              questions: JSON.parse(exam.questions_json),
              duration: Math.floor(exam.time_limit / 60), // Convert seconds to minutes
              isActive: true, // Assuming all exams from backend are active
              createdAt: exam.created_at
            }));
            set({ exams });
          } else {
            console.error('Failed to fetch exams from backend');
            // Fallback to initial data if backend fails
            set({ exams: initialExams as Exam[] });
          }
        } catch (error) {
           console.error('Error fetching exams:', error);
          // Fallback to initial data if backend fails
          set({ exams: initialExams as Exam[] });
        }
      },
    }),
    {
      name: 'british-council-storage',
    }
  )
);
