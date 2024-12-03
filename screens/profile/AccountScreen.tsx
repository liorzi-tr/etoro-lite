import { View, Text, StyleSheet, Button } from 'react-native';
import { PlanixRoutes, PlanixScreenProps } from '../../core/@planix/types';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useWebView } from '../../core/webview/WebViewContext';

export default function AccountScreen({ navigation }: PlanixScreenProps<PlanixRoutes.Account>) {
    const theme = useSelector(selectTheme);
    const { openWebView } = useWebView();
    return (
        <View style={[styles.container, { backgroundColor: theme.topBackgroundColor }]}>
            <Text style={[styles.text, { color: theme.textColor }]}>Account Screen1</Text>
            <Button title="Open WebView" onPress={() => openWebView('https://testenv-2688-1.front.preprod.etoro.com')} />
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
