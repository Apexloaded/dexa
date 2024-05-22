import { uploadApi } from "./api.service";

export async function updateProfile(payload: FormData) {
  const response = await uploadApi("user/update", payload);
  return response;
}
