import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import pick from 'lodash/pick';

export default function getFormikValues<T = any>(
	initialValues: T,
	data: any,
	keys: string[]
) {
	return Object.assign({}, initialValues, pick(omitBy(data, isNil), keys)) as T;
}
