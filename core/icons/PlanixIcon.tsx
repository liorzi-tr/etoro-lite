import Apple from './Apple';
import Apples from './Apples';
import BachelorParty from './BachelorParty';
import Barbecue from './Barbecue';
import Birthday from './Birthday';
import Bread from './Bread';
import Camping from './Camping';
import Chat from './Chat';
import ChevronRight from './ChevronRight';
import Close from './Close';
import CloseSmall from './CloseSmall';
import CreditCard from './CreditCard';
import Cucumbers from './Cucumbers';
import Cups from './Cups';
import Eggs from './Eggs';
import Falafel from './Falafel';
import Forks from './Forks';
import Heart from './Heart';
import Knives from './Knives';
import Logout from './Logout';
import Mail from './Mail';
import Map from './Map';
import Oranges from './Oranges';
import Pargit from './Pargit';
import Peppers from './Peppers';
import Picnic from './Picnic';
import Plates from './Plates';
import Plus from './Plus';
import Settings from './Settings';
import Spoons from './Spoons';
import Tomatos from './Tomatos';
import User from './User';

interface PlanixIconProps {
  iconName: string;
  color?: string;
  size?: number;
}

const icons: any = {
  map: Map,
  plus: Plus,
  user: User,
  settings: Settings,
  logout: Logout,
  chevronRight: ChevronRight,
  creditCard: CreditCard,
  heart: Heart,
  chat: Chat,
  apple: Apple,
  mail: Mail,
  close: Close,
  closeSmall: CloseSmall,
  birthday: Birthday,
  picnic: Picnic,
  camping: Camping,
  bachelorparty: BachelorParty,
  barbecue: Barbecue,
  cups: Cups,
  forks: Forks,
  knives: Knives,
  spoons: Spoons,
  plates: Plates,
  pargit: Pargit,
  bread: Bread,
  eggs: Eggs,
  falafel: Falafel,
  apples: Apples,
  oranges: Oranges,
  peppers: Peppers,
  cucumbers: Cucumbers,
  tomatos: Tomatos
};

export default function PlanixIcon({ iconName, color, size }: PlanixIconProps) {
  const Icon: any = icons[iconName];

  if (!Icon) {
    return null;
  }

  return <Icon size={size} color={color} />;
}
