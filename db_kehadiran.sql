-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2019 at 09:40 AM
-- Server version: 10.1.39-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_kehadiran`
--

-- --------------------------------------------------------

--
-- Table structure for table `absen_user`
--

CREATE TABLE `absen_user` (
  `id_tran_user` int(11) NOT NULL,
  `id_daftar` int(11) NOT NULL,
  `id_tran_matkul` int(11) NOT NULL,
  `waktu` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `absen_user`
--

INSERT INTO `absen_user` (`id_tran_user`, `id_daftar`, `id_tran_matkul`, `waktu`, `status`) VALUES
(1, 5, 3, '2019-05-13 05:28:17', 2),
(2, 3, 3, '2019-05-13 05:31:24', 2),
(3, 3, 3, '2019-05-13 05:36:52', 2),
(4, 3, 3, '2019-05-13 05:37:09', 2),
(5, 3, 5, '2019-05-13 05:41:11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `daftar_peserta`
--

CREATE TABLE `daftar_peserta` (
  `id_daftar` int(11) NOT NULL,
  `id_matkul` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `daftar_peserta`
--

INSERT INTO `daftar_peserta` (`id_daftar`, `id_matkul`, `id_user`) VALUES
(3, 1, 10),
(4, 8, 11),
(5, 1, 9);

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_matkul`
--

CREATE TABLE `jadwal_matkul` (
  `id_tran_matkul` int(11) NOT NULL,
  `id_matkul` int(11) NOT NULL,
  `pertemuan_ke` int(11) NOT NULL,
  `waktu_awal` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `waktu_akhir` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ruangan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jadwal_matkul`
--

INSERT INTO `jadwal_matkul` (`id_tran_matkul`, `id_matkul`, `pertemuan_ke`, `waktu_awal`, `waktu_akhir`, `ruangan`) VALUES
(3, 1, 1, '2019-01-31 17:00:01', '2019-01-31 18:20:00', 'IF-107'),
(4, 6, 1, '2019-02-02 01:00:00', '2019-02-02 03:30:00', 'IF-103'),
(5, 1, 2, '2019-05-13 05:36:32', '2019-05-13 07:36:32', 'IF-107');

-- --------------------------------------------------------

--
-- Table structure for table `matkul`
--

CREATE TABLE `matkul` (
  `id_matkul` int(11) NOT NULL,
  `nama_matkul` varchar(500) NOT NULL,
  `kelas` varchar(500) NOT NULL,
  `semester` varchar(500) DEFAULT '4'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `matkul`
--

INSERT INTO `matkul` (`id_matkul`, `nama_matkul`, `kelas`, `semester`) VALUES
(1, 'PBKK', 'H', '4'),
(2, 'PBA', 'A', '4'),
(3, 'AJK', 'B', '4'),
(4, 'PBAA', 'A', '4'),
(5, 'PBA', 'B', '4'),
(6, 'BAHASA', 'C', '4'),
(8, 'RK', 'A', '5'),
(9, 'Komputasi Awan', 'A', '5');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nrp_nip` varchar(50) NOT NULL,
  `nama_user` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nrp_nip`, `nama_user`, `password`, `role`) VALUES
(9, '5115100154', 'unggul', '123456', 2),
(10, '5115100706', 'Yuga Mitra', '12321', 2),
(11, '5115100108', 'Zahri Roslen', '123212', 2),
(12, '5115100039', 'Ivan Fadhlizon', 'Ipan123456', 2),
(13, '5115100999', 'Habib Smith', '21321', 2),
(14, '5115100789', 'Robin Van Akram', '09876', 2),
(15, '05111540000154', 'Unggul Widodo Wijayanto', '123456', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absen_user`
--
ALTER TABLE `absen_user`
  ADD PRIMARY KEY (`id_tran_user`),
  ADD KEY `id_tran_matkul_fk` (`id_tran_matkul`),
  ADD KEY `id_daftar_fk` (`id_daftar`);

--
-- Indexes for table `daftar_peserta`
--
ALTER TABLE `daftar_peserta`
  ADD PRIMARY KEY (`id_daftar`),
  ADD KEY `id_matkul_fk` (`id_matkul`),
  ADD KEY `id_user_fk` (`id_user`);

--
-- Indexes for table `jadwal_matkul`
--
ALTER TABLE `jadwal_matkul`
  ADD PRIMARY KEY (`id_tran_matkul`),
  ADD KEY `id_matkul_fk2` (`id_matkul`);

--
-- Indexes for table `matkul`
--
ALTER TABLE `matkul`
  ADD PRIMARY KEY (`id_matkul`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absen_user`
--
ALTER TABLE `absen_user`
  MODIFY `id_tran_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `daftar_peserta`
--
ALTER TABLE `daftar_peserta`
  MODIFY `id_daftar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `jadwal_matkul`
--
ALTER TABLE `jadwal_matkul`
  MODIFY `id_tran_matkul` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `matkul`
--
ALTER TABLE `matkul`
  MODIFY `id_matkul` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `absen_user`
--
ALTER TABLE `absen_user`
  ADD CONSTRAINT `id_daftar_fk` FOREIGN KEY (`id_daftar`) REFERENCES `daftar_peserta` (`id_daftar`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_tran_matkul_fk` FOREIGN KEY (`id_tran_matkul`) REFERENCES `jadwal_matkul` (`id_tran_matkul`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `daftar_peserta`
--
ALTER TABLE `daftar_peserta`
  ADD CONSTRAINT `id_matkul_fk` FOREIGN KEY (`id_matkul`) REFERENCES `matkul` (`id_matkul`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_user_fk` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jadwal_matkul`
--
ALTER TABLE `jadwal_matkul`
  ADD CONSTRAINT `id_matkul_fk2` FOREIGN KEY (`id_matkul`) REFERENCES `matkul` (`id_matkul`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
