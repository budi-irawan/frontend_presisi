<template>
	<div>
		<app-nav-bar />
		<app-side-bar />
		<div class="content-wrapper">
			<router-view />
			<section class="content">
				<div class="container-fluid pt-3">
					<div class="row mb-4">
						<div class="col">
							<div class="card shadow-lg">
								<div class="card-header">
									<h3 class="card-title">
									<i class="fas fa-solid fa-user-tie mr-3"></i>
									<b>Tambah Data Manpower</b>
									</h3>
								</div>
								<div class="card-body">
									<div class="row">
										<div class="col-12">
											<form>
												<div class="row mb-3">
													<label for="namaManpower" class="col-sm-3 col-form-label nama-kolom">Nama Manpower<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="namaManpower"
															v-model.trim="$v.itemKaryawan.namaManpower.$model" :class="{
																'is-invalid': validationStatus($v.itemKaryawan.namaManpower),
															}" />
														<div v-if="!$v.itemKaryawan.namaManpower.required"
															class="invalid-feedback">
															Nama Manpower harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="teamProyek" class="col-sm-3 col-form-label">Team / Proyek<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="teamProyek"
															v-model.trim="$v.itemKaryawan.teamProyek.$model" :class="{
																'is-invalid': validationStatus($v.itemKaryawan.teamProyek),
															}" />
														<div v-if="!$v.itemKaryawan.teamProyek.required"
															class="invalid-feedback">
															Team / Proyek harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="tempatLahir" class="col-sm-3 col-form-label">Tempat lahir<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="tempatLahir"
															v-model.trim="$v.itemKaryawan.tempatLahir.$model" :class="{
																'is-invalid': validationStatus($v.itemKaryawan.tempatLahir),
															}" />
														<div v-if="!$v.itemKaryawan.tempatLahir.required"
															class="invalid-feedback">
															Tempat lahir harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="tanggalLahir" class="col-sm-3 col-form-label">Tanggal lahir<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<date-picker v-model.trim="$v.itemKaryawan.tanggalLahir.$model" :class="{
																'is-invalid': validationStatus($v.itemKaryawan.tanggalLahir),
															}"
															:config="options"
															@dp-change="handleTanggalLahir">
														</date-picker>
														<div v-if="!$v.itemKaryawan.tanggalLahir.required"
															class="invalid-feedback">
															Tanggal lahir harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="alamat" class="col-sm-3 col-form-label">Alamat<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="alamat"
															v-model.trim="$v.itemKaryawan.alamat.$model" :class="{
																'is-invalid': validationStatus($v.itemKaryawan.alamat),
															}" />
														<div v-if="!$v.itemKaryawan.alamat.required"
															class="invalid-feedback">
															Alamat harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="nikKtp" class="col-sm-3 col-form-label">NIK KTP<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="nikKtp"
															v-model.trim="$v.itemKaryawan.nikKtp.$model" :class="{
																'is-invalid': validationStatus($v.itemKaryawan.nikKtp),
															}" />
														<div v-if="!$v.itemKaryawan.nikKtp.required"
															class="invalid-feedback">
															NIK KTP harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="nomorHandphone" class="col-sm-3 col-form-label">Nomor handphone<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="nomorHandphone"
															v-model.trim="$v.itemKaryawan.nomorHandphone.$model" :class="{
																'is-invalid': validationStatus($v.itemKaryawan.nomorHandphone),
															}" />
														<div v-if="!$v.itemKaryawan.nomorHandphone.required"
															class="invalid-feedback">
															Nomor handphone harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="agama" class="col-sm-3 col-form-label">Agama<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<select class="form-control" style="width: 100%;" v-model.trim="$v.itemKaryawan.agama.$model" :class="{
																'is-invalid': validationStatus($v.itemKaryawan.agama),
															}">
															<option selected="selected">Islam</option>
															<option>Katolik</option>
															<option>Protestan</option>
															<option>Hindu</option>
															<option>Budha</option>
															<option>Konghuchu</option>
														</select>
														<div v-if="!$v.itemKaryawan.agama.required"
															class="invalid-feedback">
															Agama harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="nomorKartuKeluarga" class="col-sm-3 col-form-label">Nomor Kartu Keluarga</label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="nomorKartuKeluarga" v-model="itemKaryawan.nomorKartuKeluarga" />
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="email" class="col-sm-3 col-form-label">Email</label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="email" v-model="itemKaryawan.email"/>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="npwp" class="col-sm-3 col-form-label">Npwp</label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="npwp" v-model="itemKaryawan.npwp" />
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="nomorRekening" class="col-sm-3 col-form-label">Nomor Rekening<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="nomorRekening"
															v-model.trim="$v.itemKaryawan.nomorRekening.$model" :class="{
																'is-invalid': validationStatus($v.itemKaryawan.nomorRekening),
															}" />
														<div v-if="!$v.itemKaryawan.nomorRekening.required"
															class="invalid-feedback">
															Nomor Rekening harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="namaBank" class="col-sm-3 col-form-label">Nama bank<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="namaBank"
															v-model.trim="$v.itemKaryawan.namaBank.$model" :class="{
																'is-invalid': validationStatus($v.itemKaryawan.namaBank),
															}" />
														<div v-if="!$v.itemKaryawan.namaBank.required"
															class="invalid-feedback">
															Nama bank harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="rekeningAtasNama" class="col-sm-3 col-form-label">Rekening atas nama</label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="rekeningAtasNama" v-model="itemKaryawan.rekeningAtasNama" />
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="golonganDarah" class="col-sm-3 col-form-label">Golongan darah</label>
													<div class="col-sm-9">
														<select class="form-control" style="width: 100%;" v-model="itemKaryawan.golonganDarah">
															<option selected="selected">A</option>
															<option>B</option>
															<option>AB</option>
															<option>O</option>
															<option>-</option>
														</select>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="statusPernikahan" class="col-sm-3 col-form-label">Status pernikahan<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<select class="form-control" style="width: 100%;" v-model.trim="$v.itemKaryawan.statusPernikahan.$model" :class="{
																'is-invalid': validationStatus($v.itemKaryawan.statusPernikahan),
															}">
															<option selected="selected">Menikah</option>
															<option>Belum Menikah</option>
														</select>
														<div v-if="!$v.itemKaryawan.statusPernikahan.required"
															class="invalid-feedback">
															Status pernikahan harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="tanggalMenikah" class="col-sm-3 col-form-label">Tanggal menikah</label>
													<div class="col-sm-9">
														<date-picker v-model="itemKaryawan.tanggalMenikah"
															:config="options"
															@dp-change="handleTanggalMenikah">
														</date-picker>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="nomorKpjKetenagakerjaan" class="col-sm-3 col-form-label">Nomor KPJ Ketenagakerjaan</label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="nomorKpjKetenagakerjaan" v-model="itemKaryawan.nomorKpjKetenagakerjaan" />
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="nomorJknKesehatan" class="col-sm-3 col-form-label">Nomor JKN Kesehatan</label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="nomorJknKesehatan" v-model="itemKaryawan.nomorJknKesehatan" />
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="pendidikanTerakhir" class="col-sm-3 col-form-label">Pendidikan Terakhir<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<select class="form-control" v-model.trim="$v.itemKaryawan.pendidikanTerakhir.$model" :class="{
																'is-invalid': validationStatus($v.itemKaryawan.pendidikanTerakhir),
															}">
															<option value="SD" selected="selected">SD</option>
															<option value="MI">MI</option>
															<option value="SMP">SMP</option>
															<option value="MTS">MTS</option>
															<option value="SMA">SMA</option>
															<option value="SMK">SMK</option>
															<option value="MA">MA</option>
															<option value="D3">D3</option>
															<option value="S1">S1</option>
															<option value="S2">S2</option>
															<option value="S3">S3</option>
														</select>
														<div v-if="!$v.itemKaryawan.pendidikanTerakhir.required"
															class="invalid-feedback">
															Pendidikan Terakhir harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="namaSekolahUniversitas" class="col-sm-3 col-form-label">Nama Sekolah / Universitas</label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="namaSekolahUniversitas" v-model="itemKaryawan.namaSekolahUniversitas" />
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="tanggalMulaiKerjaDiPresisi" class="col-sm-3 col-form-label">Tanggal mulai kerja di Presisi<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<date-picker v-model.trim="$v.itemKaryawan.tanggalMulaiKerjaDiPresisi.$model" :class="{
																'is-invalid': validationStatus($v.itemKaryawan.tanggalMulaiKerjaDiPresisi),
															}"
															:config="options"
															@dp-change="handleTanggalMulaiKerjaDiPresisi">
														</date-picker>
														<div v-if="!$v.itemKaryawan.tanggalMulaiKerjaDiPresisi.required"
															class="invalid-feedback">
															Tanggal mulai kerja harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="kimper" class="col-sm-3 col-form-label">Kimper</label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="kimper" v-model="itemKaryawan.kimper" />
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="masaBerlaku" class="col-sm-3 col-form-label">Masa Berlaku</label>
													<div class="col-sm-9">
														<date-picker v-model="itemKaryawan.masaBerlaku"
															:config="options"
															@dp-change="handleTanggalMasaBerlaku">
														</date-picker>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="jadwalMcu" class="col-sm-3 col-form-label">Jadwal MCU</label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="jadwalMcu" v-model="itemKaryawan.jadwalMcu" />
													</div>
												</div>

												<div class="row mb-3">
													<label for="jabatan" class="col-sm-3 col-form-label">Jabatan<span class="text-danger">*</span></label>
													<div class="col-sm-9">
														<select class="form-control" aria-label="Default select example"
															v-model.trim="$v.itemKaryawan.jabatanId.$model" :class="{
																'is-invalid': validationStatus(
																	$v.itemKaryawan.jabatanId
																),
															}">
															<option v-for="rowJabatan in itemJabatan" :key="rowJabatan.jabatanId"
																:value="rowJabatan.jabatanId">
																{{ rowJabatan.namaJabatan }} - {{ rowJabatan.namaGradeKompetensi }}
															</option>
														</select>
														<div v-if="!$v.itemKaryawan.jabatanId.required"
															class="invalid-feedback">
															Jabatan harus diisi
														</div>
													</div>
												</div>

												<button type="button" @click="saveKaryawan" class="btn btn-primary">
													<i class="fas fa-save"></i>
													Simpan
												</button>
											</form>
										</div>
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
import moment from "moment";
import { required } from "vuelidate/lib/validators";
import datePicker from 'vue-bootstrap-datetimepicker';
import 'izitoast/dist/css/iziToast.css';
import iziToast from 'izitoast';

export default {
	name: "FormTambahKaryawanView",
	data() {
		return {
			itemKaryawan: {
				namaManpower: '',
				teamProyek: '',
				tempatLahir: '',
				tanggalLahir: null,
				alamat: '',
				nikKtp: '',
				nomorHandphone: '',
				agama: '',
				nomorKartuKeluarga: '',
				email: '',
				npwp: '',
				nomorRekening: '',
				namaBank: '',
				rekeningAtasNama: '',
				golonganDarah: '',
				statusPernikahan: null,
				tanggalMenikah: null,
				nomorKpjKetenagakerjaan: '',
				nomorJknKesehatan: '',
				pendidikanTerakhir: '',
				namaSekolahUniversitas: '',
				tanggalMulaiKerjaDiPresisi: null,
				kimper: '',
				masaBerlaku: null,
				jadwalMcu: '',
				jabatanId: '',
			},

			itemJabatan: [],

			options: {
				format: "YYYY-MM-DD",
				useCurrent: false,
			},
		};
	},

	components: {
      datePicker
    },

	validations: {
		itemKaryawan: {
			namaManpower: { required },
			teamProyek: { required },
			tempatLahir: { required },
			tanggalLahir: { required },
			alamat: { required },
			nikKtp: { required },
			nomorHandphone: { required },
			agama: { required },
			// nomorKartuKeluarga: { required },
			// email: { required },
			// npwp: { required },
			nomorRekening: { required },
			namaBank: { required },
			// rekeningAtasNama: { required },
			// golonganDarah: { required },
			statusPernikahan: { required },
			// tanggalMenikah: { required },
			// nomorKpjKetenagakerjaan: { required },
			// nomorJknKesehatan: { required },
			pendidikanTerakhir: { required },
			// namaSekolahUniversitas: { required },
			tanggalMulaiKerjaDiPresisi: { required },
			// kimper: { required },
			// masaBerlaku: { required },
			// jadwalMcu: { required },
			jabatanId: { required },
		}
	},

	created() {
		this.getAllPosisi();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		handleTanggalLahir() {
			this.itemKaryawan.tanggalLahir = moment(this.itemKaryawan.tanggalLahir).format("YYYY-MM-DD");
		},

		handleTanggalMenikah() {
			this.itemKaryawan.tanggalMenikah = moment(this.itemKaryawan.tanggalMenikah).format("YYYY-MM-DD");
		},

		handleTanggalMulaiKerjaDiPresisi() {
			this.itemKaryawan.tanggalMulaiKerjaDiPresisi = moment(this.itemKaryawan.tanggalMulaiKerjaDiPresisi).format("YYYY-MM-DD");
		},

		handleTanggalMasaBerlaku() {
			this.itemKaryawan.masaBerlaku = moment(this.itemKaryawan.masaBerlaku).format("YYYY-MM-DD");
		},

		async getAllPosisi() {
			try {
				let dataToken = localStorage.getItem('token')
				const dataPosisi = await axios.get(`${ipBackend}/jabatan/list`, {
					headers: {
						token: dataToken
					}
				});
				let result = dataPosisi.data.data;
				this.itemJabatan = result
			} catch (error) {
				console.log(error);
			}
		},

		async saveKaryawan() {
			try {
				this.$v.$touch();
				if (this.$v.$pendding || this.$v.$error) return;

				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/karyawan/create`, this.itemKaryawan, {
					headers: {
						token: dataToken
					}
				});

				if (response.data.message == "sukses") {
					iziToast.success({
						title: 'Success',
						message: 'Data manpower berhasil disimpan',
						position: 'topRight', 
						timeout: 2000 
					});
					this.$router.push("/manpower");
				} else {
					iziToast.info({
                        title: 'Informasi',
                        message: response.data.message,
                        position: 'topRight',
                        timeout: 3000,
                    })
				}
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>


<style>
div.nama-kolom {
	font-weight: normal;
}

.card-title {
	color: rgb(136, 136, 138);
}
</style>