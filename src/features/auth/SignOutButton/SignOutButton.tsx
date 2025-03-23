import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../../entities/user/model/userSlice';


export function SignOutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <Button variant="outlined" color="secondary" onClick={handleLogout}>
      Выйти
    </Button>
  );
}
