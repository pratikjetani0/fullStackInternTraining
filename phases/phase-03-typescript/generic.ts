//! This is Generic for the POST request and it only the UI(frontend) part and there is not any server created if future we can also update this with server.

// Types

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T; // null with UNION
}

interface LoginRequest {
  email: string;
  password: string;
  otp?: string;
}

interface LoginResponse {
  token?: string;
  expiresIn?: number;
}

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
};

interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignupResponse {
  user?: User;
}

// Generic POST

async function apiPost<TBody, TResponse>(
  url: string,
  body: TBody,
): Promise<ApiResponse<TResponse>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const jsonData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: jsonData ?? "Request failed",
      };
    }

    return jsonData as ApiResponse<TResponse>;
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}

// check for LoginRequest and LoginResponse

const loginRes = await apiPost<LoginRequest, LoginResponse>(
  "http://localhost:3000/auth/login",
  {
    email: "pratik@blob.com",
    password: "secret123",
  },
);

if (loginRes.success && loginRes?.data?.token) {
  console.log("Token : ", loginRes?.data?.token);
  console.log("Expires in : ", loginRes?.data?.expiresIn);
} else {
  console.error("Login failed : ", loginRes.message);
}

// check for SignupRequest and SignupResponse

const signupRes = await apiPost<SignupRequest, SignupResponse>(
  "http://localhost:3000/auth/signup",
  {
    email: "pratik@blob.com",
    password: "secret123",
    firstName: "Pratik",
    lastName: "Jetani",
  },
);

if (signupRes.success && signupRes?.data?.user) {
  console.log("User created:", signupRes?.data?.user?.firstName);
  console.log("Email:", signupRes?.data?.user?.email);
} else {
  console.error("Signup failed:", signupRes.message);
}
