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
							<div class="card shadow-lg">
								<div class="card-header">
									<h3 class="card-title">
									<i class="fas fa-solid fa-user-tie mr-3"></i>
									<b>Profil Manpower</b>
									</h3>
								</div>
								<div class="card-body">
									<div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Nama Manpower</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.namaManpower" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Jabatan</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.namaJabatan" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Grade / Kompetensi</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.namaGradeKompetensi" disabled>
                                            </div>
                                        </div>
                                    </div>
									<div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Team / Proyek</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.teamProyek" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Tempat Lahir</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.tempatLahir" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Tanggal Lahir</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.tanggalLahir" disabled>
                                            </div>
                                        </div>
                                    </div>
									<div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Alamat</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.alamat" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">NIK KTP</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.nikKtp" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">No.Handphone</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.nomorHandphone" disabled>
                                            </div>
                                        </div>
                                    </div>
									<div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Agama</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.agama" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">No.Kartu Keluarga</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.nomorKartuKeluarga" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Email</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.email" disabled>
                                            </div>
                                        </div>
                                    </div>
									<div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">NPWP</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.npwp" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">No.Rekening</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.nomorRekening" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Nama Bank</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.namaBank" disabled>
                                            </div>
                                        </div>
                                    </div>
									<div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Rekening Atas Nama</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.rekeningAtasNama" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Golongan Darah</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.golonganDarah" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Status Pernikahan</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.statusPernikahan" disabled>
                                            </div>
                                        </div>
                                    </div>
									<div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Tanggal Menikah</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.tanggalMenikah" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">No.KPJ Ketenagakerjaan</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.nomorKpjKetenagakerjaan" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">No.JKN Kesehatan</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.nomorJknKesehatan" disabled>
                                            </div>
                                        </div>
                                    </div>
									<div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Pendidikan Terakhir</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.pendidikanTerakhir" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Nama Sekolah/Universitas</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.namaSekolahUniversitas" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Tgl.Mulai Kerja Di Presisi</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.tanggalMulaiKerjaDiPresisi" disabled>
                                            </div>
                                        </div>
                                    </div>
									<div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Kimper</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.kimper" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Masa Berlaku</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.masaBerlaku" disabled>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Jadwal MCU</label>
                                                <input type="text" class="form-control" v-model="itemKaryawan.jadwalMcu" disabled>
                                            </div>
                                        </div>
                                    </div>
								</div>
							</div>
						</div>
					</div>

                    <div class="row">
						<div class="col">
							<riwayat-pengerjaan-unit />
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
import RiwayatPengerjaanUnit from '@/components/RiwayatPengerjaanUnit.vue';
export default {
  components: { RiwayatPengerjaanUnit },
	name: "DetailKaryawanView",
	data() {
		return {
			itemKaryawan: {},
		};
	},

	mounted() {
		this.getById();
	},

	created() {
		this.getById();
	},

	methods: {
		async getById() {
			let dataToken = localStorage.getItem('token')
			try {
				const dataKaryawan = await axios.get(
					`${ipBackend}/karyawan/${this.$route.params.id}`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = dataKaryawan.data.data[0];
				result.tanggalLahir = moment(result.tanggalLahir).format("LL")
				result.tanggalMulaiKerjaDiPresisi = moment(result.tanggalMulaiKerjaDiPresisi).format("LL")
				if (result.tanggalMenikah == null) {
					result.tanggalMenikah = ""
				} else {
					result.tanggalMenikah = moment(result.tanggalMenikah).format("LL")
				}
				if (result.masaBerlaku == null) {
					result.masaBerlaku = ""
				} else {
					result.masaBerlaku = moment(result.masaBerlaku).format("LL")
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
							await this.getById();
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


<style>

</style>