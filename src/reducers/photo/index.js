import { handleActions } from 'redux-actions'
import flow from 'lodash/fp/flow'
import set from 'lodash/fp/set'
import {
    // fetch the list of photos
    fetchPhotoListRequest,
    fetchPhotoListSuccess,
    fetchphotoListFailure,

    // favorite the photo
    favoritePhotoRequest,
} from '../../actions/photo'

const defaultState = {
    photoList: [],
    favoriteList: [],
    loading: false,
    error: '',
}

export default handleActions(
    {
        // fetch the list of photos
        [fetchPhotoListRequest](state) {
            return set(['loading'], true, state)
        },
        [fetchPhotoListSuccess](state, action) {
            const photoList = action.payload
            return flow(
                set(['loading'], false),
                set(['photoList'], photoList)
            )(state)
        },
        [fetchphotoListFailure](state, action) {
            const { message } = action.payload
            return flow(
                set(['loading'], false),
                set(['error'], message)
            )(state)
        },

        // favorite the photo
        [favoritePhotoRequest](state, action) {
            const photoId = action.payload
            const { favoriteList } = state
            if (favoriteList.includes(photoId))
                // unfavorite if it is favorited
                return set(
                    ['favoriteList'],
                    [
                        ...new Set([
                            ...favoriteList.filter(id => id !== photoId),
                        ]),
                    ],
                    state
                )
            return set(
                ['favoriteList'],
                [...new Set([...favoriteList, photoId])],
                state
            )
        },
    },
    defaultState
)
