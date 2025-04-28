function generateMagicSquare() {
  const container = document.getElementById("gridContainer");
  const errorDiv = document.getElementById("error");
  const sumsDiv = document.getElementById("sums");
  container.innerHTML = "";
  errorDiv.innerText = "";

  let n = parseInt(document.getElementById("sizeInput").value);

  if (isNaN(n) || n < 3 || n > 9 || n % 2 === 0) {
    errorDiv.innerText = "لطفاً یک عدد فرد بین ۳ تا ۹ وارد کنید.";
    return;
  }

  container.style.gridTemplateColumns = `repeat(${n}, 60px)`;

  let magic = Array.from({ length: n }, () => Array(n).fill(0));

  let num = 1;
  let row = 0;
  let col = Math.floor(n / 2);

  let steps = []; // برای ذخیره قدم‌ها برای انیمیشن

  while (num <= n * n) {
    magic[row][col] = num;
    steps.push({ row, col, value: num });
    num++;

    let nextRow = (row - 1 + n) % n;
    let nextCol = (col - 1 + n) % n;

    if (magic[nextRow][nextCol] !== 0) {
      row = (row + 1) % n;
    } else {
      row = nextRow;
      col = nextCol;
    }
  }

  // ایجاد سلول‌های خالی ابتدا
  for (let i = 0; i < n * n; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    container.appendChild(cell);
  }

  // پر کردن سلول‌ها به ترتیب انیمیشن
  steps.forEach((step, index) => {
    setTimeout(() => {
      const pos = step.row * n + step.col;
      const cell = container.children[pos];
      cell.innerText = step.value;
      cell.classList.add("show");
    }, index * 200);
  });
}
