function formatCurrencyVND(amount) {
    // Chuyển số thành chuỗi và thêm ".000đ" vào cuối
    var currency = amount + ".000đ";
  
    // Nếu số đó có phần thập phân, thêm phần thập phân vào chuỗi
    if (amount % 1 !== 0) {
      currency = amount.replace(".", ",") + "đ";
    }
  
    // Thêm dấu "," vào chuỗi để ngăn cách hàng nghìn
    var parts = currency.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    currency = parts.join(".");
  
    return currency;
  }
  export default formatCurrencyVND;