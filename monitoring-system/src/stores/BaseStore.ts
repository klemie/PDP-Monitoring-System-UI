import { makeAutoObservable } from 'mobx'

export const enum SegmentKeys {
    DASHBOARD = "DASHBOARD",
    INSTRUMENTATION_ONLY = "INSTRUMENTATION",
    CONTROLS_ONLY = "CONTROLS",
    SETTINGS = "SETTINGS",
    REPLAY = "REPLAY"
}

export type breadcrumbs = {
    segment: string;
    title: string;
} 

export class BaseStore {

    navigation: breadcrumbs[] = [
        { segment: SegmentKeys.DASHBOARD, title: 'Dashboard' },
        { segment: SegmentKeys.SETTINGS, title: 'Settings' },
        { segment: SegmentKeys.REPLAY, title: 'Replay' }
    ]

    // phone: 

    constructor() {
        makeAutoObservable(this)

    }

    // getViewKey() {
    //     return this.viewKey
    // }

    // setViewKey(key: ViewKeys) {
    //     this.viewKey = key
    // }

}