import request from './index'

export async function sentVcodeRequest(data: any) {
    const result = await request({ method: 'get', url: '/captcha/sent', data })
    return result
}

export async function vcodeVerify(data: any) {
    const result = await request({ method: 'get', url: '/captcha/verify', data })
    return result
}


export async function getAccount() {
    const result = await request({ method: 'get', url: '/user/account', })
    return result
}

export async function getLoginStatus() {
    const result = await request({ method: 'get', url: '/login/status', })
    return result
}

export async function recommend() {
    const result = await request({ method: 'get', url: '/personalized/newsong', })
    return result
}

export async function getSongUrl(data: any) {
    const result = await request({ method: 'get', url: '/song/url', data })
    return result
}


export async function getHighquality(data: any) {
    const result = await request({ method: 'get', url: '/top/playlist/highquality', data })
    return result
}


export async function getDetail(data: any) {
    const result = await request({ method: 'get', url: '/playlist/detail', data })
    return result
}



