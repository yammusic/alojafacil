import type { makeStore } from '../../config/store'

export type AppStore = ReturnType<typeof makeStore>['store']
export type AppPersistor = ReturnType<typeof makeStore>['persistor']
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
