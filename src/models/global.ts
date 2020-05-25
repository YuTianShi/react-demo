import { getWindowHeight } from '@/utils/util';
import { Reducer } from 'redux';
import { Subscription } from 'umi';

export interface GlobalModelStateType {
  height: number;
}

export interface GlobalModelType {
  namespace: string;
  state: GlobalModelStateType;
  reducers: {
    saveHeight: Reducer<GlobalModelStateType>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    height: getWindowHeight(),
  },
  reducers: {
    saveHeight() {
      return { height: getWindowHeight() };
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      window.onresize = () => {
        dispatch({ type: 'saveHeight' });
      };
    },
  },
};
export default GlobalModel;
