// USER
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}
// AUTH
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

export interface LoginErrors {
  email: string;
  password: string;
}

export interface SignupErrors {
  username: string;
  email: string;
  password: string;
}

// TEST
export interface TestResult {
  id: string;
  userId: string;
  username: string;
  wpm: number;
  cpm: number;
  accuracy: number;
  mistakes: number;
  duration: number;
  date: string;
}
