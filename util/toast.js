import { BaseToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#2D9F92', borderRadius: 15, width: "90%"}}
      text1Style={{ color: "white" }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#DB1F22', borderRadius: 15, width: "90%"}}
      text1Style={{ color: "white" }}
    />
  )
};