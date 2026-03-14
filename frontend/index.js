const BASE_URL = 'http://localhost:8000';
let mode = 'CREATE'; // เพิ่มข้อมูลใหม่
let selectedId = '';
window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id);
    if (id) {
        mode = 'EDIT';
        selectedId = id;

        //1. ดึงข้อมูล user เก่ามาแสดง
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            console.log('response', response.data);
            const user = response.data
            //2. จะนำข้อมูล user ที่ได้มาแสดงในฟอร์ม เพื่อให้ผู้ใช้แก้ไขข้อมูล
            let firstNameDOM = document.querySelector('input[name=firstname]');
            let lastNameDOM = document.querySelector('input[name=lastname]');
            let ageDOM = document.querySelector('input[name=age]');
            let descriptionDOM = document.querySelector('textarea[name=description]');

            firstNameDOM.value = user.firstname;
            lastNameDOM.value = user.lastname;
            ageDOM.value = user.age;
            descriptionDOM.value = user.description;

            let genderDOMs = document.querySelectorAll('input[name=gender]');
            let interestDOMs = document.querySelectorAll('input[name=interests]');

            for (let i = 0; i < genderDOMs.length; i++) {
                if (genderDOMs[i].value == user.gender) {
                    genderDOMs[i].checked = true;
                }
            }

            for (let i = 0; i < interestDOMs.length; i++) {
                if (user.interests.includes(interestDOMs[i].value)) {
                    interestDOMs[i].checked = true;
                }
            }

        } catch (error) {
            console.log('error', error);
        }

        }
    };

    const validateData = (userdata) => {
        let error = [];
        if (!userdata.firstname) {
            error.push('กรุณากรอกชื่อ');
        }
        if (!userdata.lastname) {
            error.push('กรุณากรอกนามสกุล');
        }
        if (!userdata.age) {
            error.push('กรุณากรอกอายุ');
        }
        if (!userdata.gender) {
            error.push('กรุณาเลือกเพศ');
        }
        if (!userdata.interests) {
            error.push('กรุณาเลือกความสนใจ');
        }
        if (!userdata.description) {
            error.push('กรุณากรอกคำอธิบาย');
        }
        return error;
    }
    const submitData = async () => {
        let firstNameDOM = document.querySelector('input[name=firstname]');
        let lastNameDOM = document.querySelector('input[name=lastname]');
        let ageDOM = document.querySelector('input[name=age]');
        let genderDOM = document.querySelector('input[name=gender]:checked') || {};
        let interestDOMs = document.querySelectorAll('input[name=interests]:checked') || {};
        let descriptionDOM = document.querySelector('textarea[name=description]');
        let messageDOM = document.getElementById('message');
        try {
            let interest = ''
            for (let i = 0; i < interestDOMs.length; i++) {
                interest += interestDOMs[i].value;
                if (i != interestDOMs.length - 1) {
                    interest += ','
                }
            }

            let userData = {
                firstname: firstNameDOM.value,
                lastname: lastNameDOM.value,
                age: ageDOM.value,
                gender: genderDOM.value,
                description: descriptionDOM.value,
                interests: interest
            }
            console.log('submitData', userData);
            const error = validateData(userData);
            if (error.length > 0) {
                throw {
                    message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                    error: error
                };
            }

            let message = "บันทึกข้อมูลสำเร็จ";

            if (mode == 'CREATE') {
                const response = await axios.post(`${BASE_URL}/users`, userData);
                console.log('response', response.data);
            } else {
                const response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData);
                message = "แก้ไขข้อมูลสำเร็จ";
                console.log('response', response.data);
            }



            messageDOM.innerText = message;
            messageDOM.className = "message success";

        } catch (error) {
            console.log('error message:', error.message);
            console.log('error details:', error.error);

            if (error.response) {
                console.log("Error response:", error.response.data.message);
                error.message = error.response.data.message
                error.errors = error.response.data.errors
            }

            let htmlData = '<div>' + (error.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล') + '</div>';
            if (error.error && error.error.length > 0) {
                htmlData += '<ul>';
                for (let i = 0; i < error.error.length; i++) {
                    htmlData += `<li>${error.error[i]}</li>`;
                }
                htmlData += '</ul>';
            }

            messageDOM.innerHTML = htmlData;
            messageDOM.className = "message danger";

        }

    }
