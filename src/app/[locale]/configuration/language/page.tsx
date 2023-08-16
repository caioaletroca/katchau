'use client';

import Icon from '@/components/Icon';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import { useLanguages, useRouter, useSetLocale } from '@/lib/intl/client';
import { Language } from '@/lib/intl/languages';
import {
	IconButton,
	InputAdornment,
	List,
	ListItemButton,
	ListItemText,
	TextField,
} from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';

export default function ConfigurationLanguagePage() {
	const intl = useIntl();
	const router = useRouter();
	const languages = useLanguages();
	const setLocale = useSetLocale();
	const [search, setSearch] = React.useState('');

	const handleBack = () => router.push('/configuration');

	const handleSelectLanguage = (language: Language) => {
		setLocale(language.locale, '/configuration');
	};

	const filteredLanguages = React.useMemo(() => {
		if (search === '') {
			return languages;
		}

		return languages.filter(
			(language) =>
				(language?.name.toLowerCase().search(search.toLowerCase()) as number) >
				-1
		);
	}, [search, languages]);

	return (
		<PageMobile>
			<PageMobileHeader
				onBackClick={handleBack}
				title={intl.formatMessage({
					id: 'language.title',
					defaultMessage: 'App Language',
				})}
			/>
			<div className="flex flex-col p-2">
				<TextField
					placeholder={intl.formatMessage({
						id: 'common.search',
						defaultMessage: 'Search',
					})}
					value={search}
					onChange={(event) => setSearch(event.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Icon name="search" />
							</InputAdornment>
						),
						endAdornment:
							search !== '' ? (
								<InputAdornment position="end">
									<IconButton onClick={() => setSearch('')}>
										<Icon name="close" />
									</IconButton>
								</InputAdornment>
							) : null,
					}}
					fullWidth
				/>
			</div>
			<List>
				{filteredLanguages.map((language) => (
					<ListItemButton
						data-cy={`language-locale-${language?.locale}`}
						key={language?.name}
						onClick={() => handleSelectLanguage(language!)}>
						<ListItemText
							primary={language?.name}
							secondary={intl.formatMessage(language?.localizedName!)}
						/>
					</ListItemButton>
				))}
			</List>
		</PageMobile>
	);
}
