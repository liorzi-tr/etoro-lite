import { Platform, Pressable } from "react-native";
import EtoroIcon from "../../../../assets/icons/EtoroIcon";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../store/selectors/themeSelectors";

interface BiometricButtonProp {
  onPress: () => void;
  color: string;
  style?: object;
}

export default function BiometricButton({ onPress, style, color }: BiometricButtonProp) {
  const theme = useSelector(selectTheme)

  return (
    <Pressable style={[style]} onPress={onPress}>
      <EtoroIcon iconName={Platform.OS === 'ios' ? 'faceId' : 'fingerPrint'} color={color} size={50} />
    </Pressable>
  )
}