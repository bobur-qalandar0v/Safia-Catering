// // Parametrlar
// const L = 1; // Chiziq uzunligi (m)
// const Nx = 50; // Bo'laklar soni (x yo'nalishida)
// const dx = L / (Nx - 1); // Masofa qadam
// const alpha = 0.01; // Issiqlik o'tkazuvchanlik koeffitsienti (m^2/s)
// const Tmax = 2; // Vaqt davomiyligi (s)
// const dt = 0.001; // Vaqt qadam
// const Nt = Math.floor(Tmax / dt); // Vaqt bo'yicha qadamlar soni

// // Boshlang'ich shartlar
// let T = new Array(Nx).fill(0); // Haroratning boshlang'ich holati
// T[Math.floor(Nx / 2)] = 100; // O'rtadagi nuqtada 100 °C

// // Chegara shartlari
// const T_left = 0; // Chap chekkadagi harorat
// const T_right = 0; // O'ng chekkadagi harorat

// // HTML sahifada grafik uchun canvas yaratamiz
// const canvas = document.createElement("canvas");
// canvas.width = 600;
// canvas.height = 300;
// document.body.appendChild(canvas);
// const ctx = canvas.getContext("2d");

// // Issiqlik o'tkazuvchanlik hisoblash funksiyasi
// function heatConduction() {
//   let T_new = [...T]; // Yangi harorat massivini yaratish

//   // Har bir masofa bo'laklari uchun hisob-kitob
//   for (let i = 1; i < Nx - 1; i++) {
//     T_new[i] =
//       T[i] + ((alpha * dt) / (dx * dx)) * (T[i - 1] - 2 * T[i] + T[i + 1]);
//   }

//   // Chegara shartlarini qo'llash
//   T_new[0] = T_left;
//   T_new[Nx - 1] = T_right;

//   // Haroratni yangilash
//   T = T_new;

//   // Grafikni chizish
//   draw(T);

// }

// // Grafik chizish funksiyasi
// function draw(temperatures) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height); // Ekranni tozalash
//   ctx.beginPath();
//   ctx.moveTo(0, canvas.height);

//   for (let i = 0; i < Nx; i++) {
//     const x = (i / (Nx - 1)) * canvas.width; // Masofa bo'yicha koordinata
//     const y = canvas.height - (temperatures[i] / 100) * canvas.height; // Harorat bo'yicha koordinata
//     ctx.lineTo(x, y);
//   }

//   ctx.strokeStyle = "red";
//   ctx.lineWidth = 2;
//   ctx.stroke();
// }

// // Dinamik animatsiya uchun tsikl
// let currentTime = 0;
// function animate() {
//   if (currentTime < Tmax) {
//     heatConduction();
//     currentTime += dt;
//     requestAnimationFrame(animate);
//   }
// }

// // Animatsiyani boshlash
// animate();
//   console.log(`Vaqt: ${currentTime.toFixed(3)} s, Harorat: `, T);

// function Search(num) {
//   let arr = [12, 20, 19, 81, 25, 26, 15, 30, 35, 14, 11, 19, 99];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] == num) {
//       console.log(`Qidirayotgan soningiz: ${arr[i]} va indeksi: ${i}`);
//       return;
//     }
//   }
//   console.log(`Qidirayotgan soningiz (${num}) topilamdi`);
// }

// Search(19)


