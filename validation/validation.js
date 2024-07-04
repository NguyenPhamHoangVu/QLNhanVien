// một thẻ chứa thông báo
// value dữ liệu người dùng
// kiểm tra người dùng đã nhập dữ liệu chưa (kiểm tra rỗng)
// kiểm tra dữ liệu người dùng có hợp lệ không (kiểm tra định dạng email, số)

function checkEmptyValue(value, span) {
  if (value) {
    // xử lý khi dữ liệu được người dùng nhập vào
    // tham số span đại diện cho câu lệnh dom tới thẻ span thông báo
    span.innerHTML = "";
    return true;
  } else {
    // xử lý khi dữ liệu rỗng
    span.innerHTML = "Bạn chưa nhập dữ liệu";
    return false;
  }
}
// kiểm tra độ dài ký tự dữ liệu nhập vào
// function xử lý kiểm tra độ dài tối thiểu và độ dài tối đa của dữ liệu nhập vào

function checkLengthValue(value, min, max, span) {
  if (value.length >= min && value.length <= max) {
    // xử lý khi dữ liệu hợp lệ
    span.innerHTML = "";
    return true;
  } else {
    // xử lý khi dữ liệu không hợp lệ
    span.innerHTML = `vui lòng nhập Độ dài từ ${min} đến ${max} ký tự`;
    return false;
  }
}


// function checkemailvalue
function checkEmailValue(value, span) {
  // kiểm tra định dạng email
  var emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (emailRegex.test(value)) {
    // xử lý khi dữ liệu hợp lệ
    span.innerHTML = "";
    return true;
  } else {
    // xử lý khi dữ liệu không hợp lệ
    span.innerHTML = "vui lòng nhập email hợp lệ";
    return false;
  }
}

function validateEmployeeName(value, span) {
  // Kiểm tra xem tên có phải chỉ chứa chữ cái hay không
  var regex = /^[A-Za-z\s]+$/;
  if (regex.test(value)) {
    // Xử lý khi tên hợp lệ
    span.innerHTML = "";
    return true;
  } else {
    // Xử lý khi tên không hợp lệ
    span.innerHTML = "error";
    return false;
  }
}

function validatePassword(password, span) {
  // Kiểm tra xem mật khẩu có chứa ít nhất 1 ký tự số, 1 ký tự in hoa, và 1 ký tự đặc biệt hay không
  var hasNumber = /[0-9]/.test(password);
  var hasUpperCase = /[A-Z]/.test(password);
  var hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (hasNumber && hasUpperCase && hasSpecialChar) {
    // Nếu mật khẩu hợp lệ
    span.innerHTML = "";
    return true;
  } else {
    // Nếu mật khẩu không hợp lệ
    span.innerHTML = "error";
    return false;
  }
}

function validateLuongCoBan(luongCB, spanThongBao) {
  // Kiểm tra không để trống
  if (luongCB.trim() === "") {
    spanThongBao.innerHTML = "Bạn chưa nhập dữ liệu";
    return false;
  }
  // Chuyển đổi sang số và kiểm tra khoảng giá trị
  let luong = parseInt(luongCB.replace(/\D/g, ""));
  if (luong >= 1000000 && luong <= 20000000) {
    spanThongBao.innerHTML = "";
    return true;
  } else {
    spanThongBao.innerHTML = "error";
    return false;
  }
}

function validateNgayLam(ngayLam, spanThongBao) {
  // Kiểm tra không để trống
  if (ngayLam.trim() === "") {
    spanThongBao.innerHTML = "Bạn chưa nhập dữ liệu";
    return false;
  }
  // Kiểm tra định dạng mm/dd/yyyy
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!regex.test(ngayLam)) {
    spanThongBao.innerHTML = "error";
    return false;
  }
  spanThongBao.innerHTML = "";
  return true;
}

function validateSoGioLam(soGioLam, spanThongBao) {
  // Kiểm tra không để trống
  if (soGioLam.trim() === "") {
    spanThongBao.innerHTML = "Bạn chưa nhập dữ liệu";
    return false;
  }

  // Chuyển đổi sang số và kiểm tra khoảng giá trị
  let gioLam = parseInt(soGioLam);
  if (gioLam >= 80 && gioLam <= 200) {
    spanThongBao.innerHTML = "";
    return true;
  } else {
    spanThongBao.innerHTML = "error";
    return false;
  }
}
