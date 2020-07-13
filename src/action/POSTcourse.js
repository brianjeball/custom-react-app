import fetch from 'isomorphic-fetch'

function POSTCourse(data) {
    return fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(err => err);
}

export default POSTCourse;