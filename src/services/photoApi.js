import axios from 'axios'

/**
 * Factory for Axios instance used to interact with App
 *
 * @returns {AxiosInstance}
 */
const createPhotoAxiosInstance = () =>
    axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com',
        validateStatus: status => status >= 200 && status < 500,
        headers: {
            'Content-Type': 'application/json',
        },
    })

// create axios instance
const axiosInstance = createPhotoAxiosInstance()

/**
 * Get the list of photos.
 *
 * @returns {AxiosPromise}
 */
export const getPhotos = () => axiosInstance.get(`/photos`)
