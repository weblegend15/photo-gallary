import { call, put } from 'redux-saga/effects'
import { getPhotos } from '../../services/photoApi'
import {
    // fetch the list of photos
    fetchPhotoListSuccess,
    fetchphotoListFailure,
} from '../../actions/photo'
import photoApiSaga from '../common/photoApi'

/**
 * Fetches the list of photos
 */
function* fetchPhotoListSaga() {
    yield call(photoApiSaga, fetchPhotoListSuccess, getPhotos, null)
}
export function* fetchPhotoListWorker() {
    try {
        yield call(fetchPhotoListSaga)
    } catch (error) {
        yield put(fetchphotoListFailure(error))
    }
}
