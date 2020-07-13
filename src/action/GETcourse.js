import fetch from 'isomorphic-fetch'

function GETcourse() {
    return fetch('http://localhost:5000/api/courses', {
        method: 'GET',
        mode: 'CORS',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.clone().json();
    }).then(data => {
        console.log(data);
        let courses = data;
        this.setState({courses: courses});
        // console.log("");
      }).catch(err => err);
}

export default GETcourse;