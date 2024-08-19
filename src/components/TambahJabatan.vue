<template>
    <div>
		<form>
			<div class="row mt-2">
				<div class="col">
					<button type="button" class="btn btn-info" @click="toggleComponentTambahJabatan">
						<i class="fas fa-solid fa-plus-circle"></i>
						Tambah Data Jabatan
					</button>
				</div>
			</div>
			<div v-if="showComponentTambahJabatan">
				<div class="row mt-3 mb-3">
					<div class="col">
						<div class="row mb-3">
							<label for="namaJabatan" class="col-sm-3 col-form-label">Nama Jabatan<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="namaJabatan" v-model="itemJabatan.namaJabatan" :class="{'is-invalid': validationStatus($v.itemJabatan.namaJabatan)}" />
								<div v-if="!$v.itemJabatan.namaJabatan.required"
									class="invalid-feedback">
									Nama Jabatan
								</div>
							</div>
						</div>
						<div class="row mb-3">
							<label for="gradeKompetensiId" class="col-sm-3 col-form-label">Nama Grade / Kompetensi<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control" aria-label="Default select example"
									v-model="itemJabatan.gradeKompetensiId" :class="{
										'is-invalid': validationStatus(
											$v.itemJabatan.gradeKompetensiId
										),
									}">
									<option v-for="dg in dataGrade" :key="dg.id" :value="dg.id">
										{{ dg.namaGradeKompetensi }}
									</option>
								</select>
								<div v-if="!$v.itemJabatan.gradeKompetensiId.required" class="invalid-feedback">
									Nama Grade / Kompetensi harus diisi
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<button type="button" class="btn btn-primary mr-2" @click="saveJabatan">
									<i class="fas fa-save"></i>
									Simpan
								</button>
								<button type="button" class="btn btn-secondary" @click="tutupFormJabatan">
									<i class="fas fa-undo"></i>
									Tutup
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="showComponentEditJabatan">
				<div class="row mt-3 mb-3">
					<div class="col">
						<div class="row mb-3">
							<label for="namaJabatan" class="col-sm-3 col-form-label">Nama Jabatan<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="namaJabatan" v-model="itemJabatan.namaJabatan" :class="{'is-invalid': validationStatus($v.itemJabatan.namaJabatan)}" />
								<div v-if="!$v.itemJabatan.namaJabatan.required"
									class="invalid-feedback">
									Nama Jabatan
								</div>
							</div>
						</div>
						<div class="row mb-3">
							<label for="gradeKompetensiId" class="col-sm-3 col-form-label">Nama Grade / Kompetensi<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control select2" aria-label="Default select example"
									v-model="itemJabatan.gradeKompetensiId" :class="{
										'is-invalid': validationStatus(
											$v.itemJabatan.gradeKompetensiId
										),
									}">
									<option v-for="dg in dataGrade" :key="dg.id" :value="dg.id">
										{{ dg.namaGradeKompetensi }}
									</option>
								</select>
								<div v-if="!$v.itemJabatan.gradeKompetensiId.required" class="invalid-feedback">
									Nama Grade / Kompetensi harus diisi
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<button type="button" class="btn btn-primary mr-2" @click="updateJabatan" >
									<i class="fas fa-save"></i>
									Update
								</button>
								<button type="button" class="btn btn-secondary" @click="tutupFormEditJabatan">
									<i class="fas fa-undo"></i>
									Tutup
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
		<div class="table-responsive mt-2">
			<table class="table table-striped table-hover table-bordered">
				<thead>
					<tr>
						<th class="align-middle" scope="col" style="width: 5%;">No</th>
						<th class="align-middle" scope="col" style="width: 40%;">Nama Jabatan</th>
						<th class="align-middle" scope="col" style="width: 40%;">Grade / Kompetensi</th>
						<th class="align-middle" scope="col" style="width: 10%;"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="dj in dataJabatan" :key="dj.jabatanId">
						<td>{{ dj.no }}</td>
						<td>{{ dj.namaJabatan }}</td>
						<td>{{ dj.namaGradeKompetensi }}</td>
						<td>
							<div @click="toggleComponentEditJabatan(dj.jabatanId, dj.namaJabatan, dj.gradeKompetensiId)" class="action-icon mr-2">
								<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
							</div>
							<div @click="deleteJabatan(dj.jabatanId)" class="action-icon">
								<i class="fas fa-trash" style="color: red"></i>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>


<script>
import { ipBackend } from '@/ipBackend';
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import 'izitoast/dist/css/iziToast.css';
import iziToast from 'izitoast';

export default {
	name: "TambahJabatan",
	data() {
		return {
			showComponentTambahJabatan: false,
			showComponentEditJabatan: false,

			itemJabatan: {
				jabatanId: '',
				namaJabatan: '',
				gradeKompetensiId: '',
			},

            dataGrade: [],
            dataJabatan: [],
		};
	},

	validations: {
		itemJabatan: {
			namaJabatan: { required },
			gradeKompetensiId: { required },
		}, 
	},

	mounted() {
		this.getAllGrade();
		this.getAllJabatan();
	},

	created() {
		this.getAllGrade();
		this.getAllJabatan();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async getAllGrade() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/grade-kompetensi/list`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataGrade = result
			} catch (error) {
				console.log(error);
			}
		},

		toggleComponentTambahJabatan() {
			this.showComponentTambahJabatan = !this.showComponentTambahJabatan;
			this.getAllGrade();
		},

		tutupFormJabatan() {
			this.showComponentTambahJabatan = false
		},

		async saveJabatan() {
			try {
				this.$v.$touch();
				if (this.$v.$pendding || this.$v.$error) return;
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/jabatan/create`, this.itemJabatan, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data jabatan berhasil disimpan',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllJabatan();
				this.itemJabatan.namaJabatan = null
				this.itemJabatan.gradeKompetensiId = null
				this.$nextTick(() => { this.$v.$reset() })
				
			} catch (error) {
				console.log(error);
			}
		},

		async getAllJabatan() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
                        `${ipBackend}/jabatan/list`, {
                        headers: {
                            token: dataToken
                        }
                    }
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataJabatan = result
			} catch (error) {
				console.log(error);
			}
		},

		deleteJabatan(id) {
			iziToast.show({
				theme: 'warning',
				icon: 'fas fa-exclamation-triangle',
				overlay: true,
				close: false,
				timeout: false,
				title: 'Konfirmasi',
				message: 'Apakah anda yakin akan menghapus data ?',
				position: 'center',
				buttons: [
					['<button><b>Ya</b></button>', async (instance, toast) => {
					let dataToken = localStorage.getItem('token')
					await axios.post(`${ipBackend}/jabatan/delete`, { jabatanId: id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllJabatan();
					iziToast.success({
						title: 'Success',
						message: 'Data jabatan berhasil dihapus',
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
		},

		toggleComponentEditJabatan(jabatanId, namaJabatan, gradeKompetensiId) {
			this.getAllGrade();
			this.showComponentEditJabatan = !this.showComponentEditJabatan;
			this.itemJabatan.namaJabatan = namaJabatan
			this.itemJabatan.gradeKompetensiId = gradeKompetensiId
			this.itemJabatan.jabatanId = jabatanId
		},

		tutupFormEditJabatan() {
			this.showComponentEditJabatan = false
		},

		async updateJabatan() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/jabatan/update`, {
					namaJabatan: this.itemJabatan.namaJabatan,
					gradeKompetensiId: this.itemJabatan.gradeKompetensiId,
					jabatanId: this.itemJabatan.jabatanId,
				}, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data jabatan berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllJabatan();
				this.itemJabatan.namaJabatan = null
				this.itemJabatan.gradeKompetensiId = null
				this.itemJabatan.jabatanId = null
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditJabatan = false
				
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>