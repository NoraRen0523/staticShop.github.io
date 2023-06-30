export function uuid(len, radix) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    let i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        let r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}


export function addItem(key, data) {
    try {
        let all = localStorage.getItem(key)
        if(!all) {
            all = []
        } else {
            all = JSON.parse(all)
        }
        all.push(data)
        localStorage.setItem(key, JSON.stringify(all))
        return {
            status: 200
        }
    } catch(err) {
        return {
            status: 500
        }
    }
}

export function updateItem(key, data) {
    try {
        let all = localStorage.getItem(key)
        if(!all) {
            return
        }
        all = JSON.parse(all)
        const i = all.findIndex(item => item.id === data.id)
        all[i] = data
        localStorage.setItem(key, JSON.stringify(all))
        return {
            status: 200
        }
    } catch(err) {
        return {
            status: 500
        }
    }
}

export function delItem(key, id) {
    try {
        let all = localStorage.getItem(key)
        if(!all) {
            return
        }
        all = JSON.parse(all)
        const i = all.findIndex(item => item.id === id)
        all.splice(i, 1)
        localStorage.setItem(key, JSON.stringify(all))
        return {
            status: 200
        }
    } catch(err) {
        return {
            status: 500
        }
    }
}

export function getAll(key) {
    try {
        let all = localStorage.getItem(key)
        if(!all) {
            return
        }
        all = JSON.parse(all)
        return {
            status: 200,
            data: all
        }
    } catch(err) {
        return {
            status: 500
        }
    }
}

export function getItem(key, id) {
    try {
        let all = localStorage.getItem(key)
        if(!all) {
            return
        }
        all = JSON.parse(all)
        const i = all.findIndex(item => item.id === id)
        return {
            status: 200,
            data: all[i]
        }
    } catch(err) {
        return {
            status: 500
        }
    }
}