import { apiClient } from "@/lib/api/client";
import type { User } from "@/types/challenge";

export const DEMO_OWNER_ID = "demo-user-1";

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await apiClient.get<User[]>("/users", { signal });
  return response.data;
}

export async function getUser(
  userId: string,
  signal?: AbortSignal,
): Promise<User> {
  const response = await apiClient.get<User>("/users/" + userId, { signal });
  return response.data;
}

export async function deductBalance(
  userId: string,
  amount: number,
): Promise<User> {
  const response = await apiClient.get<User>("/users/" + userId);
  const user = response.data;

  if (user.balance < amount) {
    throw new Error("보유 머니가 부족합니다.");
  }

  const updated = await apiClient.patch<User>("/users/" + userId, {
    balance: user.balance - amount,
  });
  return updated.data;
}
