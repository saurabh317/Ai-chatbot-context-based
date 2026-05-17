export const headers = {
  "Content-Type": "application/json",
};

export const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const handleError = (error: Error) => {
  console.error(error);
  throw error;
};

export const handleSuccess = (data: any) => {
  console.log(data);
  return data;
};

export const handleRequest = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  return handleResponse(response);
};

export const Methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;
