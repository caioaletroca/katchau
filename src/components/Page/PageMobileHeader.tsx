import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Icon from "../Icon";

type PageMobileHeaderProps = {
	backButton?: boolean;
	title?: string;
}

export default function PageMobileHeader({
	backButton,
	title
}: PageMobileHeaderProps) {
	const router = useRouter();
	
	return (
		<AppBar position="static">
			<Toolbar>
				{
					backButton &&
					<IconButton onClick={() => router.back()}>
						<Icon name="arrow_back" />
					</IconButton>
				}
				<Typography variant="h6">{title}</Typography>
			</Toolbar>
		</AppBar>
	);
}
