"use client";

import React from "react";
import { useUserSearch } from "@/api/users";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "@/lib/intl/client";
import { CircularProgress, List, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { User } from "@prisma/client";
import { useIntl } from "react-intl";

const EmptyScreen = () => {
	const intl = useIntl();

	return (
		<div className="flex h-full items-center justify-center">
			<Typography color='grey' variant='body2'>
				{intl.formatMessage({
					id: "search.noResultsFound",
					defaultMessage: "No results found"
				})}
			</Typography>
		</div>
	);
}

const LoadingScreen = () => (
	<div className="flex h-full items-center justify-center">
		<CircularProgress />
	</div>
);

export default function Content() {
	const intl = useIntl();
	const router = useRouter();
	const [search, setSearch] = React.useState("");
	const { data: users, isLoading, trigger } = useUserSearch();

	useDebounce(async () => {
		trigger(`/users?name=${search}`);
	}, 300, [search]);

	const handleClick = (user: User) => {
		router.push(`/users/${user.id}`);
	}
	
	return (
		<div className="flex flex-col px-2 h-full">
			<TextField
				name='search'
				placeholder={intl.formatMessage({
					id: "search.searchFieldPlaceholder",
					defaultMessage: "Search for someone..."
				})}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				fullWidth
			/>
			{
				isLoading ?
				<LoadingScreen /> :
				!isLoading && users?.length === 0 ?
				<EmptyScreen /> :
				<List>
					{users?.map(user => (
						<ListItemButton key={user.id} onClick={() => handleClick(user)}>
							<ListItemText primary={user.name} />
						</ListItemButton>
					))}
				</List>
			}
		</div>
	);
}
