import dayjs from 'dayjs';
import { RefinementCtx, z } from 'zod';

const date = {
	type: z
		.custom<dayjs.Dayjs>((value) => dayjs(value as any).isValid(), {
			params: {
				id: 'custom_date_invalid',
			},
		})
		.superRefine((value: dayjs.Dayjs, ctx: RefinementCtx) => {
			// TODO: remove if not needed
			// Validated again and stop later refines
			// if(!dayjs(value).isValid()) {
			// 	ctx.addIssue({
			// 		code: z.ZodIssueCode.invalid_type,
			// 		expected: "date",
			// 		received: "null",
			// 		fatal: true
			// 	});
			// 	return z.NEVER;
			// }
		}),

	min:
		(minDate: string | dayjs.Dayjs) =>
		(value: dayjs.Dayjs, ctx: RefinementCtx) => {
			if (value.isBefore(dayjs(minDate))) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_small,
					type: 'date',
					minimum: dayjs(minDate).unix(),
					inclusive: false,
				});
			}
		},

	max:
		(maxDate: string | dayjs.Dayjs) =>
		(value: dayjs.Dayjs, ctx: RefinementCtx) => {
			if (value.isAfter(dayjs(maxDate))) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_big,
					type: 'date',
					maximum: dayjs(maxDate).unix(),
					inclusive: false,
				});
			}
		},
};

export default date;
