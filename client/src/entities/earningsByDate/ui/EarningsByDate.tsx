import { SDate, SSumContainer, SCurrencySymbol, SSum } from "../styles";

interface IProps {
  date: string;
  amount: string;
}

function EarningsByDate({ date, amount }: IProps) {
  return (
    <div>
      <SDate>{date}</SDate>
      <SSumContainer>
        <SCurrencySymbol>$</SCurrencySymbol> <SSum>{amount}</SSum>
      </SSumContainer>
    </div>
  );
}

export { EarningsByDate };
