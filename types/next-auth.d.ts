import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: DefaultSession['user'] &
			User & {
				id: string;
			};
	}

	interface User {
		username?: string;
	}

	interface JWT {
		username?: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		username?: string;
	}
}
