import { Provider } from 'react-redux';
import { store } from './store/store';
import Router from './core/navigation/Router';
import  './core/services/locales/localisation'; 
export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
