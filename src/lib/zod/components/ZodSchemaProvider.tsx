"use client";

import React from "react";
import { useIntl } from "react-intl";
import { defaultErrorMap, ErrorMapCtx, z, ZodIssueCode, ZodIssueOptionalMessage, ZodParsedType } from "zod";
import messages from "../messages";

export default function ZodSchemaProvider({
	children
}: React.PropsWithChildren) {
	const intl = useIntl();

	React.useEffect(() => {
		z.setErrorMap((issue: ZodIssueOptionalMessage, ctx: ErrorMapCtx) => {
			let message: string = defaultErrorMap(issue, ctx).message;
		
			switch (issue.code) {
				case ZodIssueCode.invalid_type:
					if(issue.received === ZodParsedType.undefined) {
						message = intl.formatMessage(messages.invalid_type_received_undefined);
					}
					break;
				case ZodIssueCode.too_small:
					const minimum = issue.type === 'date' ? new Date(issue.minimum as number) : issue.minimum;
					const precisionMinimum = issue.exact ? "exact" : issue.inclusive ? "inclusive" : "not_inclusive";
					message = intl.formatMessage(messages[`too_small_${issue.type}_${precisionMinimum}`], { minimum });
					break;
				case ZodIssueCode.too_big:
					const maximum = issue.type === 'date' ? new Date(issue.maximum as number) : issue.maximum;
					const precisionMaximum = issue.exact ? "exact" : issue.inclusive ? "inclusive" : "not_inclusive";
					message = intl.formatMessage(messages[`too_small_${issue.type}_${precisionMaximum}`], { maximum });
					break;
			}
	
			return { message };
		});
	}, [intl]);

	return (
		<>
			{children}
		</>
	);
}
