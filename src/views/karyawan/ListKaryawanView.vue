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
                            <router-link class="btn btn-info" to="/manpower/tambah">
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
									<table class="table table-head-fixed text-nowrap table-hover table-striped" v-if="!loading">
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
											<tr v-for="(ik, index) in itemKaryawan" :key="ik.karyawanId">
												<td>{{ (page - 1) * limit + index + 1 }}</td>
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
														name: 'edit-manpower',
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

									<div v-else class="row muser">
										<div class="col text-center">
											<img :src="loadingGif" />
										</div>
									</div>

									
								</div>

								<div class="row p-3">
										<label for="agama" class="col-sm-3 col-form-label font-weight-normal">Jumlah item per halaman</label>
										<div class="col-sm-1">
											<select class="form-control select2" @change="handleLimit($event)">
												<option>Pilih</option>
												<option value="5">5</option>
												<option value="10">10</option>
											</select>
										</div>
										<div class="col">
											<ul class="pagination pagination-sm m-0 float-right">
												<li class="page-item"><button @click="changePages(page - 1)" :disabled="page <= 1 || loading" class="page-link">Sebelumnya</button></li>
												<li class="page-item"><button v-for="n in totalPages" :key="n" @click="changePages(n)" :class=" 'page-link' ">{{ n }}</button></li>
												<li class="page-item"><button @click="changePages(page + 1)" :disabled="page >= totalPages || loading" class="page-link">Selanjutnya</button></li>
											</ul>
										</div>
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
			page: 1,
			limit: 10,
			totalPages: 1,
			loading: true,
			loadingGif: require('@/assets/rolling.gif'),
		};
	},

	mounted() {
		// this.getAllKaryawan();
	},

	created() {
		this.getAllKaryawan();
	},

	methods: {
		async getAllKaryawan() {
			this.loading = true;
			let dataToken = localStorage.getItem('token')
			try {
				let timestamp = new Date().getTime()
				const response = await axios.get(
					`${ipBackend}/karyawan`, {
					headers: {
						token: dataToken
					},
					params: {
						page: this.page,
						limit: this.limit,
						_ts: timestamp
					}
				}
				);
				let result = response.data.data;
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
				this.totalPages = response.data.totalPages
				this.loading = false 
			} catch (error) {
				console.log(error);
			} finally {
				this.loading = false;
			}
		},

		changePages(newPage) {
			if (newPage >=1 && newPage <= this.totalPages) {
				this.page = newPage
				this.getAllKaryawan();
			}
		},

		handleLimit(event) {
			this.limit = parseInt(event.target.value)
			
			this.getAllKaryawan();
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