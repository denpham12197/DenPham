<script setup lang="ts">
import { type PropType, ref, toRefs } from 'vue';
import { onClickOutside } from '@vueuse/core';

const emits = defineEmits(['handleSelectCurrency']);
const props = defineProps({
    currencies: {
        type: Array as PropType<{ label: string, icon: string, value: string }[]>,
        required: true,
    },
    activeCurrency: {
        type: Object as PropType<{ label: string, icon: string, value: string }>,
        required: true
    }
})

const showMenu = ref(false);
const menuRef = ref<HTMLDivElement | null>(null);
onClickOutside(menuRef, () => {
    showMenu.value = false;
});
const { currencies, activeCurrency } = toRefs(props);

const toggleMenu = () => {
    showMenu.value = !showMenu.value;
};

const handleSelectCurrency = (currency: { label: string, icon: string, value: string }) => {
    activeCurrency.value = {...currency};
    showMenu.value = false;
    emits('handleSelectCurrency', currency);
};
</script>
<template>
    <div class="currency-dropdown" ref="menuRef">
        <div :class="{ showMenu: showMenu }" class="currency-dropdown__toggle" @click.stop="toggleMenu">
            <div v-if="activeCurrency.icon" class="currency-dropdown__toggle-icon">
                <img :src="activeCurrency.icon" alt="currency" />
            </div>
            <div class="currency-dropdown__toggle-name">
                {{ activeCurrency.label }}
            </div>
            <div class="currency-dropdown__arrow">
                <img src="/images/icons/arrow-down.svg" alt="arrow-down" />
            </div>
        </div>
        <div
            v-show="showMenu"
            class="currency-dropdown__menu"
            :class="{ show: showMenu }"
        >
            <div
                v-for="currency in currencies"
                :key="currency.value"
                class="currency-dropdown__item"
                @click="handleSelectCurrency(currency)"
                :class="{ active: activeCurrency.value === currency.value }"
            >
                <div class="currency-dropdown__item-icon">
                    <img :src="currency.icon" alt="currency" />
                </div>
                <div class="currency-dropdown__item-name">
                    {{ currency.label }}
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.currency-dropdown {
    position: relative;
    &__toggle {
        position: relative;
        cursor: pointer;
        height: 40px;
        padding: 0 12px;
        border: 1px solid #B8BBC2;
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 8px;
        background-color: #fff;
        width: auto;
        overflow: hidden;
        &.showMenu {
            .currency-dropdown__arrow {
                transform: translateY(-50%) rotate(180deg);
            }
        }
        &-icon {
            width: 20px;
            height: 20px;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        &-name {
            font-size: 14px;
            font-weight: 500;
            color: #3C3C3C;
        }
    }
    &__arrow {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        line-height: 0;
        transition: .3s;
    }
    &__menu {
        display: none;
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        width: 100%;
        background-color: #fff;
        border: 1px solid #B8BBC2;
        border-radius: 8px;
        overflow: hidden auto;
        z-index: 100;
        max-height: 200px;
        transform: .3s;
        @keyframes slideDown {
            from {
                max-height: 0;
            }
            to {
                max-height: 100px;
            }
        }
        &::-webkit-scrollbar {
            width: 4px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #e0e0e0;
            border-radius: 4px;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
        }
        &.show {
            display: block;
        }
    }
    &__item {
        padding: 8px 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        position: relative;
        &:hover {
            background-color: #F6F6F6;
        }
        &-icon {
            width: 20px;
            height: 20px;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        &-name {
            font-size: 14px;
            font-weight: 500;
            color: #3C3C3C;
        }
        &.maintainance {
            pointer-events: none;
            .currency-dropdown__item-name {
                color: #939191;
            }
        }
        &.active {
            .currency-dropdown__item-name {
                color: rgb(219, 60, 60);
            }
        }
    }
}
</style>