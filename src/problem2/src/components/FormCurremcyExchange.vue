<script setup lang="ts">
import CurrencyDropdown from './CurrencyDropdown.vue';
import { computed, ref } from 'vue';
import { Form, Field } from 'vee-validate'
import { formCurrencyConvert } from '../validates/formCurrencyConvert';
import { getCurrencies } from '../utils';
import prices from '../resources/prices.json';
import Swal from 'sweetalert2';

const DEFAULT_SELECTED_CURRENCY = {
    label: 'Select Currency',
    icon: '',
    value: '',
}
const amount = ref(0);
const formRef = ref(null);
const amountConverted = ref(0);
const fromCurrency = ref({...DEFAULT_SELECTED_CURRENCY})
const toCurrency = ref({...DEFAULT_SELECTED_CURRENCY})
const fromCurrencies = computed(() => getCurrencies().filter((currency) => currency.value !== toCurrency.value?.value));
const toCurrencies = computed(() => getCurrencies().filter((currency) => currency.value !== fromCurrency.value?.value));

const handleChangeFromCurrency = (currency: { label: string, icon: string, value: string }) => {
    fromCurrency.value = {...currency};
};
const handleChangeToCurrency = (currency: { label: string, icon: string, value: string }) => {
    toCurrency.value = {...currency};
};
const handleGetConverAmount = () => {
    const fromPrice = prices?.find((price) => price.currency === fromCurrency.value?.value)?.price;
    const toPrice = prices?.find((price) => price.currency === toCurrency.value?.value)?.price;
    if (!fromPrice || !toPrice || isNaN(Number(amount.value))) return 0;
    return (Number(amount.value) * Number(fromPrice)) / Number(toPrice);
}
const handleRevertCurrencies = () => {
    if (!fromCurrency.value?.value && !toCurrency.value?.value) return;
    const temp = {...fromCurrency.value};
    fromCurrency.value = {...toCurrency.value};
    toCurrency.value = {...temp};
}

const handleSubmitForm = () => {
    formRef.value?.validate()?.then(({ errors, valid}) => {
        console.log(errors, valid);
        if (!valid && Object.values(errors).length) {
            Swal?.fire?.({
                title: 'Error',
                text: Object.values(errors)?.[0],
                icon: 'error',
                timer: 3000,
                toast: true,
                showConfirmButton: false,
                position: 'top-end',
            });
            return;
        }
        amountConverted.value = handleGetConverAmount() || 0;
    });
}
</script>
<template>
    <div class="form-currency">
        <h1>Currency Convert</h1><br/>
        <Form
            ref="formRef"
            class="form-currency__form"
            :validation-schema="formCurrencyConvert"
        >
            <div class="form-currency__row">
                <div class="form-currency__row-item">
                    <span>From</span>
                    <CurrencyDropdown
                        :currencies="fromCurrencies"
                        :activeCurrency="fromCurrency"
                        @handleSelectCurrency="handleChangeFromCurrency"
                    />
                </div>
                <div class="form-currency__row-item">
                    <label for="amount">Amount</label>
                    <Field
                        id="amount"
                        class="form-currency__field"
                        name="amount"
                        type="tel"
                        v-model="amount"
                        placeholder="Enter amount"
                        maxlength="10"
                    />
                </div>
            </div>
            <div class="form-currency__swap">
                <div class="form-currency__swap-btn" @click="handleRevertCurrencies">
                    <img src="/images/icons/icon-convert.svg" alt="arrow-right" />
                </div>
            </div>
            <div class="form-currency__row">
                <div class="form-currency__row-item">
                    <span>To</span>
                    <CurrencyDropdown
                        :currencies="toCurrencies"
                        :activeCurrency="toCurrency"
                        @handleSelectCurrency="handleChangeToCurrency"
                    />
                </div>
                <div class="form-currency__row-item">
                    <label for="toCurrency">Amount Converted</label>
                    <Field
                        id="toCurrency"
                        class="form-currency__field"
                        name="toCurrency"
                        type="text"
                        placeholder="0"
                        v-model="amountConverted"
                        disabled
                    />
                </div>
            </div>
            <button
                class="form-currency__submit"
                type="button"
                @click="handleSubmitForm()"
                :disabled="!amount || !toCurrency.value || !fromCurrency.value"
            >
                Convert
            </button>
        </Form>
    </div>
</template>
<style scoped lang="scss">
.form-currency {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: calc(100% - 16px);
    max-width: 400px;
    margin: 0 auto;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    &__form {
        display: flex;
        flex-direction: column;
        gap: 4px;
        justify-content: center;
    }
    &__row {
        display: flex;
        align-items: center;
        gap: 16px;
        &-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
    }
    &__swap {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 8px 0;
        position: relative;
        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #B8BBC2;
            transform: translateY(-50%);
        }
        &-btn {
            position: relative;
            z-index: 2;
            width: 40px;
            height: 40px;
            cursor: pointer;
            transition: .3s;
            &:hover {
                transform: scale(1.04);
            }
        }
    }
    &__field {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 40px;
        border: 1px solid #B8BBC2;
        background: #fff;
        border-radius: 8px;
        width: 100%;
        color: #3C3C3C;
        padding: 0 12px;
        text-overflow: ellipsis;
        &:disabled {
            background-color: #F6F6F6;
            color: #3C3C3C;
        }
    }
    &__submit {
        margin-top: 32px;
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 8px;
        background-color: #1877F2;
        color: #fff;
        cursor: pointer;
        transition: .3s;
        &:hover {
            background-color: #0c62d2;
        }
        &:disabled {
            background-color: #88b6f2;
            pointer-events: none;
        }
    }
}
</style>