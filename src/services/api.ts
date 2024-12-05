import { User } from "@/types/interfaces/user";
import { SignInRequest, SignInResponse } from "@/types/requests/sign_in";
import { SignUpRequest, SignUpResponse } from "@/types/requests/sign_up";
import { getCookies } from "@/misc/injection";
import axios from "axios";
import { CreateProjectDto } from "@/types/requests/create-project-dto";
import { Project } from "@/types/interfaces/project";
import { CreatePhaseDto } from "@/types/requests/create-phase-dto";
import { Phase } from "@/types/interfaces/phase";
import { CreateTaskDto } from "@/types/requests/create-task-dto";
import { Task } from "@/types/interfaces/task";

enum METHOD {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  }

  private async makeRequest<T>(
    url: string,
    method: METHOD,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: { [key: string]: any },
    isFormData: boolean = false,
    queryParams?: { [key: string]: string }
  ): Promise<T> {
    const userToken = getCookies().retrieveToken();

    const headers: HeadersInit = {};

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    } else {
      headers["Content-Type"] = "multipart/form-data";
    }

    if (userToken) {
      headers["Authorization"] = `Bearer ${userToken}`;
    }

    headers["Access-Control-Allow-Origin"] = "*";
    const body = isFormData ? data : JSON.stringify(data);

    try {
      const response = await axios({
        method,
        url,
        data: body,
        headers,
        params: queryParams,
      });
      if (response.status > 300) {
        const errorResponse = await response.data;

        console.log("errorResponse", errorResponse);

        if (response.status === 400) {
          // Check if the error structure is an object with a 'message' field
          if (typeof errorResponse === "object" && "message" in errorResponse) {
            throw { statusCode: 400, errors: errorResponse.message };
          }
          // Assuming errorResponse is an array of { field, message }
          else if (Array.isArray(errorResponse)) {
            throw { statusCode: 400, errors: errorResponse };
          }
          // Handle other possible structures here
          // ...
        } else {
          // Handle other error statuses
          throw new Error(
            errorResponse.message || `HTTP Error! Status: ${response.status}`
          );
        }
      }

      return (await response.data) as T;
    } catch (error) {
      console.error("Error in makeRequest", error);
      throw error;
    }
  }

  async signup(data: SignUpRequest): Promise<SignUpResponse> {
    const url = `${this.baseUrl}/auth/register`;

    return this.makeRequest(url, METHOD.POST, data);
  }

  async signin(data: SignInRequest): Promise<SignInResponse> {
    const url = `${this.baseUrl}/auth/login`;
    return this.makeRequest(url, METHOD.POST, data);
  }
  async retrieveUser(): Promise<User> {
    const url = `${this.baseUrl}/users`;
    return this.makeRequest(url, METHOD.GET);
  }
  async createProject(data: CreateProjectDto): Promise<Project> {
    const url = `${this.baseUrl}/projects`;
    return this.makeRequest<Project>(url, METHOD.POST, data);
  }

  async getProjects(): Promise<Project[]> {
    const url = `${this.baseUrl}/projects`;
    return this.makeRequest<Project[]>(url, METHOD.GET);
  }
  async getProjectById(id: string): Promise<Project> {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.makeRequest<Project>(url, METHOD.GET);
  }

  async updateProject(id: string, data: CreateProjectDto): Promise<Project> {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.makeRequest<Project>(url, METHOD.PATCH, data);
  }
  async deleteProjectById(id: string): Promise<void> {
    const url = `${this.baseUrl}/projects/${id}`;
    return this.makeRequest(url, METHOD.DELETE);
  }

  async createPhase(projectId: string, data: CreatePhaseDto): Promise<Phase> {
    const url = `${this.baseUrl}/projects/${projectId}/phases`;
    return this.makeRequest<Phase>(url, METHOD.POST, data);
  }
  async getPhasesByProjectId(projectId: string): Promise<Phase[]> {
    const url = `${this.baseUrl}/projects/${projectId}/phases`;
    return this.makeRequest<Phase[]>(url, METHOD.GET);
  }

  async getPhaseById(phaseId: string): Promise<Phase> {
    const url = `${this.baseUrl}/phases/${phaseId}`;
    return this.makeRequest<Phase>(url, METHOD.GET);
  }

  async updatePhase(phaseId: string, data: CreatePhaseDto): Promise<Phase> {
    const url = `${this.baseUrl}/phases/${phaseId}`;
    return this.makeRequest<Phase>(url, METHOD.PATCH, data);
  }

  async deletePhaseById(phaseId: string): Promise<void> {
    const url = `${this.baseUrl}/phases/${phaseId}`;
    return this.makeRequest(url, METHOD.DELETE);
  }

  async createTask(phaseId: string, data: CreateTaskDto): Promise<Task> {
    const url = `${this.baseUrl}/phases/${phaseId}/tasks`;
    return this.makeRequest<Task>(url, METHOD.POST, data);
  }

  async getTasksByPhaseId(phaseId: string): Promise<Task[]> {
    const url = `${this.baseUrl}/phases/${phaseId}/tasks`;
    return this.makeRequest<Task[]>(url, METHOD.GET);
  }

  async getTaskById(taskId: string): Promise<Task> {
    const url = `${this.baseUrl}/tasks/${taskId}`;
    return this.makeRequest<Task>(url, METHOD.GET);
  }

  async updateTask(taskId: string, data: CreateTaskDto): Promise<Task> {
    const url = `${this.baseUrl}/tasks/${taskId}`;
    return this.makeRequest<Task>(url, METHOD.PATCH, data);
  }

  async deleteTaskById(taskId: string): Promise<void> {
    const url = `${this.baseUrl}/tasks/${taskId}`;
    return this.makeRequest(url, METHOD.DELETE);
  }
}
