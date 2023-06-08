const canvas = document.querySelector('canvas');
// canvas 크기 지정
canvas.width = 800;
canvas.height = 800;

// context -> 페인트 브러쉬
const ctx = canvas.getContext("2d"); // 그림을 그릴 수 있는 준비

// fillRect() : 직사각형을 만들고 색을 채우기
// ctx.fillStyle = 'red';
// ctx.fillRect(50, 50, 100, 200);

// strokeRect() : 직사각형 그리기
// ctx.strokeRect(150, 150, 100, 200);

// rect() + fill()
// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// ctx.fill();

// ctx.beginPath(); // 위와 아래의 rect() 의 경로를 상이하게 만드는 것.

// ctx.fillStyle = 'blue';
// ctx.rect(250, 250, 100, 100);
// ctx.fill();

// moveTo(x, y), lineTo(x, y)
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.stroke();
// ctx.fill();

// 집 그리기
// ctx.moveTo(150, 50);
// ctx.lineTo(75, 100);
// ctx.lineTo(225, 100);
// ctx.lineTo(150, 50);

// ctx.moveTo(100, 100);
// ctx.lineTo(100, 180);
// ctx.lineTo(200, 180);
// ctx.lineTo(200, 100);

// ctx.stroke();
////
ctx.fillRect(200, 200, 50, 200);
ctx.fillRect(400, 200, 50, 200);
ctx.lineWidth = 5;
ctx.strokeRect(300, 300, 50, 100);
ctx.fillRect(200, 200, 200, 30);

ctx.moveTo(200, 200);
ctx.lineTo(325, 100);
ctx.lineTo(450, 200);
ctx.fill();

ctx.fillRect(100, 400, 450, 5);

ctx.fillRect(200, 200, 15, 100);
ctx.fillRect(200, 200, 15, 100);