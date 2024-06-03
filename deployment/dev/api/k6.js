import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 15,  // Number of virtual users
    duration: '10s',  // Duration of the test
};

export default function () {
    let url = 'https://api.yanyicivic.com/v1/login';
    let payload = {
        username: 'giang.truong200493@gmail.com',
        password: 'Juve@12345',
    };

    let params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    let response = http.post(url, payload, params);

    check(response, {
        'is status 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);  // Sleep for 1 second between iterations
}
