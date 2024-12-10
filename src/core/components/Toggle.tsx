import { Switch } from "react-native";
import { selectTheme } from "../../store/selectors/themeSelectors";
import { useSelector } from "react-redux";

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export default function Toggle({ value, onValueChange }: ToggleProps) {
  const theme = useSelector(selectTheme);
  return (
    <Switch
      trackColor={{ false: theme.textColor, true: theme.primaryColor }}
      thumbColor={'#fff'}
      value={value}
      onValueChange={onValueChange}
    />
  )
}

