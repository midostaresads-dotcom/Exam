export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
  image?: string; // Optional image for the question
  timeLimit?: number; // Optional time limit in seconds
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
  isActive: boolean;
  createdAt: string;
}

export interface Student {
  id: string;
  fullName: string;
  governorate: string;
  phone: string;
  registeredAt: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  examTitle: string; // Added exam title
  studentId: string;
  studentName: string; // Denormalized for easier display
  studentPhone: string;
  studentGovernorate: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: { questionId: string; selectedOption: number; isCorrect: boolean }[];
  timeSpent: number; // in seconds
  completedAt: string;
  attempts: number; // Number of times user tried to exit/blur
}

export interface Admin {
  username: string;
  passwordHash: string; // Simple hash for demo
}
