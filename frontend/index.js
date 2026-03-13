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
        const response = await axios.post('http://localhost:8000/users', userData);
        console.log('response', response.data);
        messageDOM.innerText = "บันทึกข้อมูลสำเร็จ";
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