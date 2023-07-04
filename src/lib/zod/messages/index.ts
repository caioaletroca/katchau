import { defineMessages } from "react-intl";

const messages = defineMessages({
	"invalid_type": {
		id: "errors.invalid_type",
		defaultMessage: "",
	},
	"invalid_type_received_undefined": {
		id: "errors.invalid_type_received_undefined",
		defaultMessage: "Required field"
	},
	"too_small_string_exact": {
		id: "errors.too_small.string.exact",
		defaultMessage: "Field must contain exactly {minimum} characters",
	},
	"too_small_string_inclusive": {
		id: "errors.too_small.string.inclusive",
		defaultMessage: "Field must contain at least {minimum} characters",
	},
	"too_small_string_not_inclusive": {
		id: "errors.too_small.string.not_inclusive",
		defaultMessage: "Field must contain over {minimum} characters",
	},
	"too_big_string_exact": {
		id: "errors.too_big.string.exact",
		defaultMessage: "Field must contain exactly {maximum} characters",
	},
	"too_big_string_inclusive": {
		id: "errors.too_big.string.inclusive",
		defaultMessage: "Field must contain at most {maximum} characters",
	},
	"too_big_string_not_inclusive": {
		id: "errors.too_big.string.not_inclusive",
		defaultMessage: "Field must contain under {maximum} characters",
	},
})

export default messages;
