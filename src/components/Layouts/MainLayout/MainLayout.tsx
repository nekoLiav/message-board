import { StyledMainLayout, RouteContainer } from './style';
import { Header } from 'pages/Header';
import { Sidebar } from 'pages/Sidebar';

type Props = {
  children: React.ReactElement;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <StyledMainLayout>
      <Header />
      <RouteContainer>{children}</RouteContainer>
      <Sidebar />
    </StyledMainLayout>
  );
};
