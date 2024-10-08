import { useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      //tambah event jika waktu habis
      setTimeLeft(0);
      return;
    }

    // Fungsi untuk memperbarui timeLeft dengan mengurangi nilai sebelumnya (prev) sebanyak 1 setiap detik
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // interval akan dihentikan ketika berpindah halaman / waktu sudah habis
    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft]);

  // Format waktu
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // menampilkan format waktu
  // jika detik kurang dari 10, ia menambahkan angka nol di depannya
  const time = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  return (
    <span className="flex items-center gap-1 bg-gray-700 rounded-lg  px-4 py-2 w-full max-w-max">
      <img
        src="../../timer.svg"
        alt=""
        className="w-[30px] sm:w-[35px]"
        width="35px"
      />
      <p className="font-semibold text-[#b488ff] sm:text-lg">
        {time}
      </p>
    </span>
  );
};

export default Timer;
