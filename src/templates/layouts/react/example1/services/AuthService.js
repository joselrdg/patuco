import {create} from './BaseService'

const http = create({
    useAccessToken: false
})

export const login = (body) => {
return http.post('/users/auth', body)
}
export const register = (body) => {
return http.post('/users/create', body)
}