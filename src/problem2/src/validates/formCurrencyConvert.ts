import * as yup from 'yup';

export const formCurrencyConvert = yup.object().shape({
    amount: yup.string().required('Amount is required').min(1, 'Amount must be greater than 0'),
});