import LogList from '../logs/LogList';
import UserList from '../users/UserList';

export const useContentSwitch = (url: string) => {
  switch (url) {
    case '/dashboard/users':
      return <UserList />;
    case '/dashboard/logs':
      return <LogList />;
    default:
      return (
        <>
          <div>Nothing to show</div>
        </>
      );
  }
};
