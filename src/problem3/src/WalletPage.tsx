import { useMemo } from 'react';
import { WalletRow } from './WalletRow';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted?: string;
}

interface Props {
  [key: string]: string | number | undefined | React.ReactNode;
}

const useWalletBalances = (): WalletBalance[] => {
  // logic here
  return [];
}

const usePrices = (): Record<string, number> => {
  // logic here
  return {};
}

const blockchainMapping = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
}

const DEFAULT_PRIORITY = -99;

const getPriority = (blockchain: string): number => {
  return blockchainMapping?.[blockchain as keyof typeof blockchainMapping] || DEFAULT_PRIORITY;
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { classes, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances?.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      return balancePriority > -99 && balance.amount <= 0;
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
      return 0;
    });
  }, [balances]);

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = (prices?.[balance?.currency] || 0) * balance?.amount;
    return (
      <WalletRow 
        className={classes?.row || ''}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance?.formatted || ''}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}

export default WalletPage;