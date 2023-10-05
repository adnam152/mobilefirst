const submitBtn = document.querySelector('form button');
const address = ['Ba Đình', 'Hoàn Kiếm', 'Tây Hồ', 'Long Biên', 'Cầu Giấy', 'Đống Đa', 'Hai Bà Trưng', 'Hoàng Mai', 'Thanh Xuân', 'Bắc Từ Liêm', 'Nam Từ Liêm', 'Hà Đông', 'Đông Anh', 'Gia Lâm', 'Thanh Trì', 'Mê Linh', 'Đan Phượng', 'Hoài Đức', 'Quốc Oai', 'Chương Mỹ', 'Thanh Oai', 'Thường Tín'];
const otherAddress = document.querySelector('.form .form-group.other-address');
const form = document.querySelector('.form');
const contentBox = document.querySelector('.part2 .list-content');
const contentItems = document.querySelectorAll('.part2 .content-item');
const feedbackBox = document.querySelector('#feedback');
const feedbackGroups = document.querySelectorAll('.feedback-group');

// Form
(()=>{
    form.classList.add('form-in');
    form.addEventListener('animationend',()=>{
        form.classList.remove('form-in');
    })
})();

// Add option address and Handle
(() => {
    const selectAddress = document.querySelector('select[name="address"]');
    var htmls = `<option value="">Khu vực gia đình đang sinh sống</option>`;
    htmls += address.map(add => `<option value="${add}">${add}</option>`).join('');
    htmls += `<option value="other">Huyện Ngoại Thành Khác</option>`
    htmls += `<option value="other">Ngoài Hà Nội</option>`
    selectAddress.innerHTML = htmls;

    // handle
    selectAddress.onchange = function () {
        const addressValue = selectAddress.value;
        if (addressValue == 'other') {
            const newInput = `<input type="text" class="form-control fs-small" name="other-address" data-name="other-address" placeholder="Nhập địa chỉ">`
            const newError = `<div class="error text-warning fs-small ms-2 mb-2"></div>`
            otherAddress.innerHTML = newInput + newError;
            otherAddress.querySelector('input').focus();
            selectAddress.closest('.form-group').querySelector('.error').innerText = '';
        } else {
            otherAddress.innerHTML = '';
        }
    }
})();

// Handle Submit
submitBtn.onclick = function () {
    const inputElement = document.querySelectorAll('form input');
    const selectElement = document.querySelectorAll('form select');
    var isValid = true;
    inputElement.forEach(input => {
        const error = input.closest('.form-group').querySelector('.error');
        if (input.value.trim() == '') {
            switch(input.getAttribute('data-name')){
                case 'name':
                    error.innerText = 'Vui lòng nhập họ tên con !';
                    isValid = false;
                    break;
                case 'phone':
                    error.innerText = 'Vui lòng để lại số điện thoại !';
                    isValid = false;
                    break;
                case 'other-address':
                    error.innerText = 'Vui lòng nhập địa chỉ !';
                    isValid = false;
                    break;
            }
        } else {
            error.innerText = '';
        }
        // Validate Phone Number
        if (input.getAttribute('data-name') == 'phone' && isValid) {
            const phoneNumber = input.value.trim();
            if (isNaN(phoneNumber) || phoneNumber.length != 10) {
                error.innerText = 'Số điện thoại không đúng định dạng !';
                isValid = false;
            }
            else error.innerText = '';
        }
    })
    selectElement.forEach(select => {
        const error = select.closest('.form-group').querySelector('.error');
        if (!select.value) {
            error.innerText = select.getAttribute('data-name') == 'class' ? 'Vui lòng chọn lớp con đang học !' : 'Vui lòng chọn địa chỉ !';
            isValid = false;
        } else {
            error.innerText = '';
        }
    })

    if (isValid) submitBtn.type = 'submit';
    else{
        form.classList.add('form-error');
        setTimeout(()=>{
            form.classList.remove('form-error')
        },300)
    }
}

// Scroll
window.addEventListener('scroll',()=>{
    const clientHeight = window.innerHeight;
    const feedbackTop = feedbackBox.getBoundingClientRect().top;
    const contentTop = contentBox.getBoundingClientRect().top;
    if(feedbackTop/clientHeight <= 0.8){
        feedbackGroups.forEach((feedback, index) =>{
            setTimeout(()=>{
                feedback.classList.add('active');
            },index*500);
        })
    }
    if(contentTop/clientHeight <= 0.8){
        contentItems.forEach((item, index) =>{
            setTimeout(()=>{
                item.classList.add('active');
            },index*400);
        })
    }
});

(()=>{
    const rootWidth = 1536;
    const rootHeight = 747;
    const currentWidth = window.innerWidth;
    const container = document.querySelector('#container');
    container.style.maxWidth = rootWidth + 'px';
    function updateSize(){
        if(currentWidth > rootWidth){
            container.style.scale = currentWidth/rootWidth;
        }
    }
    updateSize();
    window.addEventListener('resize',updateSize())
})();