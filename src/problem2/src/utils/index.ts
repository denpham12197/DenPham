import prices from '../resources/prices.json';
export const getCurrencies = () => {
    const modules = import.meta.glob('/public/images/tokens/*.{png,jpg,jpeg,svg}');
    const files: string[] = Object.keys(modules).map(path => {
        return path.match(/([^/]+)\.(png|jpg|jpeg|svg)$/i)?.[1] || '';
    });
    return files.map((currency) => ({
        label: currency,
        icon: `/images/tokens/${currency}.svg`,
        value: currency,
        isMaintainance: !prices?.some((price) => price.currency === currency),
    })).sort((a, b) => {
        if (a.isMaintainance && !b.isMaintainance) return 1;
        if (!a.isMaintainance && b.isMaintainance) return -1;
        return 0;
    });
}