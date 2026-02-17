import * as yup from 'yup';

export const formCurrencyConvert = yup.object().shape({
    amount: yup.string()
        .required('Amount is required')
        .matches(/^-?\d+(\.\d+)?$/, 'Amount must be a number')
        .test('min', 'Amount must be greater than 0', (value) => {
            return Number(value) > 0;
        })
});