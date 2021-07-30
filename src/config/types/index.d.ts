import { IStore } from '@/config/store/index';

declare module '@vue/runtime-core' {
  // Declare your own store states.
  //interface State {
  //Missions: data;
  //}

  interface ComponentCustomProperties {
    $store: IStore;
  }
}
