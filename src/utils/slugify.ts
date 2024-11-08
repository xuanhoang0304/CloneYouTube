export function slugify(text: string) {
    return text
      .toLowerCase() // Chuyển thành chữ thường
      .replace(/[^a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ0-9\s-]/g, "") // Chỉ giữ lại chữ cái tiếng Việt, số và khoảng trắng
      .trim() // Xóa khoảng trắng ở đầu và cuối
      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
      .replace(/-+/g, "-"); // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu
}