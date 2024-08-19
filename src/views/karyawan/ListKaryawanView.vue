<template>
	<div>
		<app-nav-bar />
		<app-side-bar />
		<div class="content-wrapper">
			<router-view />
			<section class="content">
				<div class="container-fluid pt-3">
					<div class="row">
                        <div class="col">
                            <router-link class="btn btn-info" to="/karyawan/tambah">
                            <i class="fas fa-solid fa-plus-circle"></i>
                            Tambah Data Manpower
                            </router-link>
                        </div>
                    </div>
					<div class="row mt-3 mb-4">
						<div class="col">
							<div class="card shadow-lg">
								<div class="card-header">
									<h3 class="card-title">
									<i class="fas fa-solid fa-user-tie mr-3"></i>
									<b>Data Manpower</b>
									</h3>
								</div>
								<div class="card-body table-responsive p-0">
									<table class="table table-head-fixed text-nowrap table-hover table-striped">
										<thead>
											<tr>
												<th>No</th>
												<th>Nama</th>
												<th>Jabatan</th>
												<th>Grade/Kompetensi</th>
												<th>Team/Proyek</th>
												<th>Tempat/Tanggal Lahir</th>
												<th>Alamat</th>
												<th>NIK KTP</th>
												<th>No.Handphone</th>
												<th>Agama</th>
												<th>No.KK</th>
												<th>Email</th>
												<th>NPWP</th>
												<th>No.Rekening</th>
												<th>Nama Bank</th>
												<th>Rekening Atas Nama</th>
												<th>Golongan Darah</th>
												<th>Status Pernikahan</th>
												<th>Tanggal Menikah</th>
												<th>No.KPJ Ketenagakerjaan</th>
												<th>No.JKN Kesehatan</th>
												<th>Pendidikan Terakhir</th>
												<th>Nama Sekolah/Universitas</th>
												<th>Tgl.Mulai Kerja Di Presisi</th>
												<th>Kimper</th>
												<th>Masa Berlaku</th>
												<th>Jadwal MCU</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="ik in itemKaryawan" :key="ik.karyawanId">
												<td>{{ ik.no }}</td>
												<td>{{ ik.namaManpower }}</td>
												<td>{{ ik.namaJabatan }}</td>
												<td>{{ ik.namaGradeKompetensi }}</td>
												<td>{{ ik.teamProyek }}</td>
												<td>{{ ik.tempatLahir }}, {{ ik.tglLahir }}</td>
												<td>{{ ik.alamat }}</td>
												<td>{{ ik.nikKtp }}</td>
												<td>{{ ik.nomorHandphone }}</td>
												<td>{{ ik.agama }}</td>
												<td>{{ ik.nomorKartuKeluarga }}</td>
												<td>{{ ik.email }}</td>
												<td>{{ ik.npwp }}</td>
												<td>{{ ik.nomorRekening }}</td>
												<td>{{ ik.namaBank }}</td>
												<td>{{ ik.rekeningAtasNama }}</td>
												<td>{{ ik.golonganDarah }}</td>
												<td>{{ ik.statusPernikahan }}</td>
												<td>{{ ik.tanggalMenikah }}</td>
												<td>{{ ik.nomorKpjKetenagakerjaan }}</td>
												<td>{{ ik.nomorJknKesehatan }}</td>
												<td>{{ ik.pendidikanTerakhir }}</td>
												<td>{{ ik.namaSekolahUniversitas }}</td>
												<td>{{ ik.tglMulaiKerjaDiPresisi }}</td>
												<td>{{ ik.kimper }}</td>
												<td>{{ ik.masaBerlaku }}</td>
												<td>{{ ik.jadwalMcu }}</td>
												<td>
													<router-link class="mr-2" :to="{
														name: 'edit-karyawan',
														params: { id: ik.karyawanId },
													}">
														<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
													</router-link>
													<div @click="deleteKaryawan(ik.karyawanId, ik.namaManpower)" class="action-icon">
														<i class="fas fa-trash" style="color: red"></i>
													</div>
													<router-link class="ml-2" :to="{
														name: 'profil',
														params: { id: ik.karyawanId },
													}">
														<i class="fas fa-solid fa-eye" style="color: blue"></i>
													</router-link>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
		<app-footer />
		<control-side-bar />
	</div>
</template>


<script>
import { ipBackend } from '@/ipBackend';
import axios from "axios";
import moment from 'moment';
import 'izitoast/dist/css/iziToast.css';
import iziToast from 'izitoast';
export default {
	name: "ListKaryawanView",
	data() {
		return {
			itemKaryawan: [],
		};
	},

	mounted() {
		this.getAllKaryawan();
	},

	created() {
		this.getAllKaryawan();
	},

	methods: {
		async getAllKaryawan() {
			let dataToken = localStorage.getItem('token')
			try {
				const dataKaryawan = await axios.get(
					`${ipBackend}/karyawan/list`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = dataKaryawan.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
					result[i].tglLahir = moment(result[i].tanggalLahir).format("LL")
					result[i].tglMulaiKerjaDiPresisi = moment(result[i].tanggalMulaiKerjaDiPresisi).format("LL")

					if (result[i].tanggalMenikah == null) {
						result[i].tanggalMenikah = ""
					} else {
						result[i].tanggalMenikah = moment(result[i].tanggalMenikah).format("LL")
					}

					if (result[i].masaBerlaku == null) {
						result[i].masaBerlaku = ""
					} else {
						result[i].masaBerlaku = moment(result[i].masaBerlaku).format("LL")
					}
				}
				this.itemKaryawan = result
			} catch (error) {
				console.log(error);
			}
		},

		async deleteKaryawan(karyawanId, namaManpower) {
			try {
				iziToast.show({
					theme: 'warning',
					icon: 'fas fa-exclamation-triangle',
					overlay: true,
					close: false,
					timeout: false,
					title: 'Konfirmasi',
					message: 'Apakah anda yakin akan menghapus Manpower dengan nama '+namaManpower+' ?',
					position: 'center',
					buttons: [
						['<button><b>Ya</b></button>', async (instance, toast) => {
							let dataToken = localStorage.getItem('token')
							await axios.post(`${ipBackend}/karyawan/delete`, { karyawanId }, {
								headers: {
									token: dataToken
								}
							});
							await this.getAllKaryawan();
							iziToast.success({
								title: 'Sukses',
								message: 'Data manpower berhasil dihapus',
								position: 'topRight', 
								timeout: 2000 
							});
							instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
						}, true],
						['<button>Batal</button>', (instance, toast) => {
							instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
						}]
					]
				});
			
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>


<style></style>