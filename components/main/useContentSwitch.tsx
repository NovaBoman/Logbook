import LogList from '../logs/LogList';
import NewLog from '../logs/NewLog';
import UserList from '../users/UserList';

export const useContentSwitch = (url: string) => {
  switch (url) {
    case '/dashboard/users':
      return <UserList />;
    case '/dashboard/logs':
      return <LogList />;
    case '/dashboard/logs/new':
      return <NewLog />;
    default:
      return (
        <>
          <div>Nothing to show</div>
        </>
      );
  }
};
