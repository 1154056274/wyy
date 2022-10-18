import axios from 'axios';

export default function (options: any) {
    options.url = `http://30.239.41.194:3000${options.url}`;

    options.withCredentials = true; //跨域请求是否提供凭据信息 https://blog.csdn.net/chjj0904/article/details/90268813
    const { method, data, } = options;

    if (method === 'get') {
        options.params = { ...data, };
    }

    return new Promise((resolve, reject) => {
        doRequest();
        function doRequest() {
            axios(options)
                .then(async (res) => {
                    if (res.status === 200) {
                        resolve(res.data);
                    } else {
                        reject(res);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    });
}