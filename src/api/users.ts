import { useLazySWR } from "@/hooks/useLazySWR"
import { User } from "@prisma/client";
import useSWR from "swr";
import api from "."

export function useUser({ user_id }: { user_id: string }) {
	return useSWR<User>(`/users/${user_id}`, async (url) => (await api.get(url)).data);
}

export function useUserSearch() {
	return useLazySWR<User[]>(async (url) => (await api.get(url)).data);
}
