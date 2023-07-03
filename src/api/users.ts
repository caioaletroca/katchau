import { useLazySWR } from "@/hooks/useLazySWR"
import { User } from "@prisma/client";
import api from "."

export function useUserSearch() {
	return useLazySWR<User[]>(async (url) => (await api.get(url)).data);
}
