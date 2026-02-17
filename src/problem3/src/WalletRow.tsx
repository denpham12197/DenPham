interface WalletRowProps {
    className: string;
    amount: number | string;
    usdValue: number | string;
    formattedAmount: string;
}

const WalletRow = (props: WalletRowProps) => {
    const { className = '', amount, usdValue, formattedAmount } = props;
    return (
        <div>
            <div>className: {className}</div><br/>
            <div>amount: {amount}</div><br/>
            <div>usdValue: {usdValue}</div><br/>
            <div>formattedAmount: {formattedAmount}</div>
        </div>
    )
}

export { WalletRow };