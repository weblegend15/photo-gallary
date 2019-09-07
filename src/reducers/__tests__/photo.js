import { deepFreeze } from '../../helpers/deepFreeze'
import {
    // fetch the list of photos
    fetchPhotoListRequest,
    fetchPhotoListSuccess,
    fetchphotoListFailure,

    // favorite the photo
    favoritePhotoRequest,
} from '../../actions/photo'

import reducer from '../photo'
import * as testData from '../__data__/testData'

const defaultState = reducer(undefined, { type: undefined })

deepFreeze(defaultState)

describe('[Reducers] photos', () => {
    describe('fetchPhotoListRequest', () => {
        it('should set loading to true', () => {
            const action = fetchPhotoListRequest()
            const nextState = reducer(defaultState, action)

            expect(nextState.loading).toBe(true)
        })
    })

    describe('fetchPhotoListSuccess', () => {
        it('should set loading to false', () => {
            const action = fetchPhotoListSuccess()
            const nextState = reducer(defaultState, action)

            expect(nextState.loading).toBe(false)
        })

        it('creates a new photo list', () => {
            const payload = testData.fetchPhotos
            const action = fetchPhotoListSuccess(payload)
            const nextState = reducer(defaultState, action)

            expect(nextState.photoList).toEqual(payload)
        })
    })

    describe('fetchphotoListFailure', () => {
        it('should set loading to false', () => {
            const payload = testData.fetchError
            const action = fetchphotoListFailure(payload)
            const nextState = reducer(defaultState, action)

            expect(nextState.loading).toBe(false)
        })

        it('set error message', () => {
            const payload = testData.fetchError
            const action = fetchphotoListFailure(payload)
            const nextState = reducer(defaultState, action)

            expect(nextState.error).toEqual(payload.message)
        })
    })

    describe('favoritePhotoRequest', () => {
        let initialState

        beforeAll(() => {
            initialState = {
                ...defaultState,
                favoriteList: testData.favorites,
            }
        })

        it('should be added to favorites', () => {
            const payload = 41
            const action = favoritePhotoRequest(payload)
            const nextState = reducer(initialState, action)

            expect(nextState.favoriteList).toEqual([
                ...testData.favorites,
                payload,
            ])
        })

        it('should be removed from favorites', () => {
            const payload = 23
            const action = favoritePhotoRequest(payload)
            const nextState = reducer(initialState, action)

            expect(nextState.favoriteList).toEqual([
                ...testData.favorites.filter(x => x !== payload),
            ])
        })
    })
})
