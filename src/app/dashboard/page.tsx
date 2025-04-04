import { Metadata } from 'next';
import DashboardView from './DashboardView';

export const metadata: Metadata = {title: "dashboard", description: "página de dashboard"}
const DashboardPage = () => {

  return <DashboardView />
};

export default DashboardPage;