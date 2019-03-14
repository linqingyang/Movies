import request from 'axios'

export function MovieList (data) {
    return request({
        url: 'movies/data',
        method: 'get',
        data
    })
}export function NextPage (data) {
    return request({
        url: `movies/data?p=${this.p}`,
        method: 'get',
        data
    })
}
