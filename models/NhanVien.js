class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";
}

function TinhTongLuong(chucvu, luongcb) {
  if (chucvu.toLowerCase() === "giám đốc") {
    return luongcb * 3;
  } else if (chucvu.toLowerCase() === "trưởng phòng") {
    return luongcb * 2;
  } else if (chucvu.toLowerCase() === "nhân viên") {
    return luongcb;
  } else {
    return 0;
  }
}
