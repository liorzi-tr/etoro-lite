import { globalStyles } from "../../../styles/constants";
import { StyleSheet, Text, View } from "react-native";
import NumberPicker from "../molecules/NumberPicker";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../store/selectors/themeSelectors";
import PlanixIcon from "../../icons/PlanixIcon";
import Checkbox from "./CheckBox";

interface ProductCardProps {
  product: string;
  mode: 'detailed' | 'compact';
  claimed?: number;
  total?: number;
  style?: object;
}

export default function ProductCard({ product, mode, claimed, total, style }: ProductCardProps) {
  const theme = useSelector(selectTheme);
  const [amount, setAmount] = useState<number>(0);

  const handleAmountChange = (value: number): void => {
    setAmount(value);
  }

  return (
    <>
      {mode === 'detailed' && (
        <View style={[styles.containerDetailed, { backgroundColor: theme.inputBackgroundColor }, style]}>
          <View style={styles.statusContainer}>
            <Text style={{ ...globalStyles.text, color: theme.textColor }}>{product}</Text>
            <Text style={{ ...globalStyles.text, color: theme.textColor, textAlign: 'center' }}>Status</Text>
            <Text style={{ ...globalStyles.text, color: theme.textColor, textAlign: 'center' }}>{claimed}/{total}</Text>
          </View>
          <View style={styles.amountContainer}>
            <NumberPicker value={amount} onValueChange={handleAmountChange} />
          </View>
        </View>
      )}
      {mode === 'compact' && (
        <View style={[styles.containerCompact, { backgroundColor: theme.inputBackgroundColor }, style]}>
          <PlanixIcon iconName={product} size={50} color={theme.textColor} />
          <Text style={{ ...globalStyles.text, color: theme.textColor }}>{product.charAt(0).toUpperCase() + product.slice(1)}</Text>
          <Checkbox />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerDetailed: {
    padding: 16,
    borderRadius: 16,
    elevation: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  containerCompact: {
    padding: 16,
    borderRadius: 16,
    elevation: 5,
    gap: 10,
    alignItems: 'center',
  },
  statusContainer: {
    gap: 10,
  },
  amountContainer: {
    alignSelf: 'center',
  }
});
