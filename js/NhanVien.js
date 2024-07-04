let arrNhanVien = getLocalStorage();
renderTable(arrNhanVien);
// getvalueSV
function getValueSV() {
  let arrFeild = document.querySelectorAll("#formQLNV input, #formQLNV select");
  let nhanvien = new NhanVien();
  let isValid = true;
  for (let fiel of arrFeild) {
    let { id, value } = fiel;
    let dataValidation = fiel.getAttribute("data-validation");
    nhanvien[id] = value;
    // Kiểm tra từng trường dựa trên id
    let parentElement = fiel.parentElement;
    let span = parentElement.querySelector("span");
    let isEmpty = checkEmptyValue(value, span);
    isValid &= isEmpty;
    if (!isEmpty) {
      continue;
    }
    if (dataValidation == "name") {
      isValid &= checkLengthValue(value, 4, 10, span);
    }
    if (id == "email") {
      isValid &= checkEmailValue(value, span);
    }
    if (id == "password") {
      isValid &= validatePassword(value, span);
    }
    if (id == "datepicker") {
      isValid &= validateNgayLam(value, span);
    }
    if (id == "luongCB") {
      isValid &= validateLuongCoBan(value, span);
    }
    if (id == "gioLam") {
      isValid &= validateSoGioLam(value, span);
    }
  }
  if (!isValid) {
    return;
  }
  return nhanvien;
}

// them nhan vien
let formQLNV = document.getElementById("formQLNV");
formQLNV.onsubmit = function (e) {
  e.preventDefault();
  let nhanvien = getValueSV();
  console.log(nhanvien);
  if (!nhanvien) {
    return;
  }
  nhanvien.loai = xepLoaiNV(nhanvien);
  console.log(nhanvien);
  arrNhanVien.push(nhanvien);
  saveLocalStorage();
  console.log(arrNhanVien);
  renderTable();
  // hienThiThongBao("Thêm sinh viên thành công", 3000, "bg-success");
  formQLNV.reset();
};

function renderTable(arr = arrNhanVien) {
  let contents = "";
  for (let nhanvien of arr) {
    // Thêm xếp loại vào thông tin nhân viên
    nhanvien.xepLoai = xepLoaiNV(nhanvien);
    let tongLuong = TinhTongLuong(nhanvien.chucvu, nhanvien.luongCB);
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanvien);
    let { tknv, name, email, password, luongCB, chucvu, datepicker, xepLoai } =
      newNhanVien;

    contents += `
    <tr>
      <td>${tknv}</td>
      <td>${name}</td>
      <td>${email}</td>
      <td>${datepicker}</td>
      <td>${chucvu}</td>
      <td>${tongLuong.toLocaleString("en-US")}</td>
      <td>${xepLoai}</td> <!-- Thay đổi cột hiển thị từ 'giờ làm' thành 'xếp loại' -->
      <td>
        <button onclick="delSV('${tknv}')" class='btn btnDelete btn-danger'>Xóa</button>
        <button  data-toggle="modal" data-target="#myModal" onclick="getInfoSinhVien('${tknv}')" class='btn btn-warning'>Sửa</button>
      </td>
    </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = contents;
}

function kiemtrahopleModal(){
  let formQLNV = document.getElementById("formQLNV");
  let nhanvien = getValueSV();
  if (!nhanvien) {
    return;
  }
  nhanvien.loai = xepLoaiNV(nhanvien);
}

// xóa nhân viên trên bảng
function delSV(masv) {
  let index = arrNhanVien.findIndex((nhanvien) => nhanvien.tknv === masv);
  arrNhanVien.splice(index, 1);
  saveLocalStorage();
  renderTable();
  // hienThiThongBao("Xoá sinh viên thành công", 3000, "bg-danger");
  console.log(masv);
}

// Lưu dữ liệu được lưu trữ ở localStorage
// sử dụng phương thức item
function saveLocalStorage(key = "arrNhanVien", value = arrNhanVien) {
  let json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

// lấy dữ liệu được lưu trữ ở localStorage
function getLocalStorage(key = "arrNhanVien") {
  let json = localStorage.getItem(key);
  let arr = JSON.parse(json);
  return arr ? arr : [];
}
getLocalStorage();

// lấy thông tin sinh viên
function getInfoSinhVien(tknv) {
  console.log(tknv);
  // let sinhVien ==> find
  // đưa dữ liệu lên các input của form
  let nhanVien = arrNhanVien.find((item, index) => {
    return item.tknv == tknv;
  });
  if (nhanVien) {
    // thao tác đưa dữ liệu lên giao diện
    let arrField = document.querySelectorAll(
      "#formQLNV input, #formQLNV select"
    );
    for (let item of arrField) {
      let { id } = item;
      item.value = nhanVien[id];
      if (id == "tknv") {
        item.readOnly = true;
      }
    }
  }
}
// cập nhật thông tin sinh viên
// thực hiện tạo một lệnh dom tới button cập nhật và gắn hàm upadteSV
function updateNhanVien() {
  let nhanvien = getValueSV();
  if (!NhanVien) {
    return;
  }
  let index = arrNhanVien.findIndex((item, index) => {
    return item.tknv == nhanvien.tknv;
  });
  if (index != -1) {
    arrNhanVien[index] = nhanvien;
  }
  renderTable();
  saveLocalStorage();
  // hienThiThongBao("Cập nhật sinh viên thành công", 3000, "bg-danger");
  formQLNV.reset();
  document.getElementById("tknv").readOnly = false;
}

// xử lý khi hàm cần chuyền tham số
document.querySelector(".btn-dark").onclick = updateNhanVien;

// tìm kiếm Nhan Vien
document.getElementById("txtSearch").oninput = function (e) {
  let newKeyWord = removeVietnameseTones(e.target.value).trim().toLowerCase();
  console.log(newKeyWord);
  let arrfiller = arrNhanVien.filter((item, index) => {
    let newTenNV = removeVietnameseTones(item.name).trim().toLowerCase();
    return newTenNV.includes(newKeyWord);
  });
  console.log(arrfiller);
  renderTable(arrfiller);
};

function xepLoaiNV(nhanVien) {
  if (nhanVien.gioLam >= 192) {
    return "Xuất sắc";
  }
  if (nhanVien.gioLam >= 176) {
    return "Giỏi";
  }
  if (nhanVien.gioLam >= 160) {
    return "Khá";
  }
  return "Trung bình";
}

function resetForm() {
  var form = document.getElementById("formQLNV");
  if (form) {
    form.reset(); // Reset the form
  } else {
    console.error("Form with id 'formQLNV' not found.");
  }
}

function getInfoNV(tknv) {
  // Reset the form before populating it with the new information
  resetForm();
  const nhanvien = arrNhanVien.find((nv) => nv.tknv === tknv);
  if (nhanvien) {
    // Điền thông tin của nhân viên vào form
    document.getElementById("tknv").value = nhanvien.tknv;
    document.getElementById("name").value = nhanvien.name;
    document.getElementById("email").value = nhanvien.email;
    document.getElementById("password").value = nhanvien.password;
    document.getElementById("datepicker").value = nhanvien.datepicker;
    document.getElementById("luongCB").value = nhanvien.luongCB;
    document.getElementById("chucvu").value = nhanvien.chucvu;
  } else {
    console.error(`Nhan vien with tknv ${tknv} not found.`);
  }
}

// xử lý khi hàm cần chuyền tham số
// document.querySelector(".btn-dark").onclick = updateSinhVien;
function hienThiThongBao(text, duration, className) {
  Toastify({
    text,
    className,
    duration,
    close: true,
    gravity: "top",
    position: "left",
    stopOnFocus: true,
    backgroundColor: "orange",
  }).showToast();
}
