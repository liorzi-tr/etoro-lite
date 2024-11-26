import { View, Text, StyleSheet } from 'react-native';
import { PlanixRoutes, PlanixScreenProps } from '../../core/@planix/types';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/selectors/themeSelectors';

export default function AccountScreen({ navigation }: PlanixScreenProps<PlanixRoutes.Account>) {
    const theme = useSelector(selectTheme);
    return (
        <View style={[styles.container, { backgroundColor: theme.topBackgroundColor }]}>
            <Text style={[styles.text, { color: theme.textColor }]}>Account Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {

    }

});
