import {constructFrom} from 'date-fns';
import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export default () => {
  const [visible, setVisible] = useState(false);

  function dismiss() {
    Keyboard.dismiss();
    setVisible(false);
  }

  useEffect(() => {
    function onKeyboardDidShow() {
      setVisible(true);
    }

    function onKeyboardDidHide() {
      setVisible(false);
    }
    const show = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hide = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return [visible, dismiss];
};
