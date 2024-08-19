<template>
    <div>
        <form>
			<div class="row mt-2">
				<div class="col">
					<button type="button" class="btn btn-info" @click="toggleComponentTambahGrade">
						<i class="fas fa-solid fa-plus-circle"></i>
						Tambah Data Grade / Kompetensi
					</button>
				</div>
			</div>
		
			<div v-if="showComponentTambahGrade">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaGradeKompetensi" class="col-form-label">Nama Grade / Kompetensi<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaGradeKompetensi" v-model="itemGrade.namaGradeKompetensi" :class="{'is-invalid': validationStatus($v.itemGrade.namaGradeKompetensi)}" />
						<div v-if="!$v.itemGrade.namaGradeKompetensi.required"
							class="invalid-feedback">
							Nama Grade / Kompetensi harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="saveGrade">
							<i class="fas fa-save"></i>
							Simpan
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormGrade">
							<i class="fas fa-undo"></i>
							Tutup
						</button>
					</div>
				</div>
			</div>
			<div v-if="showComponentEditGrade">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaGradeKompetensi" class="col-form-label">Nama Grade / Kompetensi<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaGradeKompetensi" v-model="itemGrade.namaGradeKompetensi" :class="{'is-invalid': validationStatus($v.itemGrade.namaGradeKompetensi)}" />
						<div v-if="!$v.itemGrade.namaGradeKompetensi.required"
							class="invalid-feedback">
							Nama Grade / Kompetensi harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="updateGrade">
							<i class="fas fa-save"></i>
							Update
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormEditGrade">
							<i class="fas fa-undo"></i>
							Batal
						</button>
					</div>
				</div>
			</div>
		</form>
		<div class="table mt-2 table-responsive">
			<table class="table table-striped table-hover table-bordered">
				<thead>
					<tr>
						<th class="align-middle" scope="col" style="width: 5%;">No</th>
						<th class="align-middle" scope="col" style="width: 80%;">Nama Grade / Kompetensi</th>
						<th class="align-middle" scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="dg in dataGrade" :key="dg.id">
						<td>{{ dg.no }}</td>
						<td>{{ dg.namaGradeKompetensi }}</td>
						<td>
							<div @click="toggleComponentEditGrade(dg.id, dg.namaGradeKompetensi)" class="action-icon mr-2">
								<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
							</div>
							<div @click="deleteGrade(dg.id)" class="action-icon">
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
	name: "TambahGrade",
	data() {
		return {
			showComponentTambahGrade: false,
			showComponentEditGrade: false,

			itemGrade: {
				id: '',
				namaGradeKompetensi: ''
			},

			dataGrade: [],
		};
	},

	validations: {
		itemGrade: {
			namaGradeKompetensi: { required },
		}, 
	},

	mounted() {
		this.getAllGrade();
	},

	created() {
		this.getAllGrade();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async saveGrade() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					return;
				}

				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/grade-kompetensi/create`, this.itemGrade, {
					headers: {
						token: dataToken
					}
				});

				if (response.data.message == "sukses") {
					iziToast.success({
						title: 'Success',
						message: 'Data grade / kompetensi berhasil disimpan',
						position: 'topRight', 
						timeout: 2000 
					});
					await this.getAllGrade();
					this.itemGrade.namaGradeKompetensi = null
					this.$nextTick(() => { this.$v.$reset() })
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

		toggleComponentTambahGrade() {
			this.showComponentTambahGrade = !this.showComponentTambahGrade;
		},

		tutupFormGrade() {
			this.showComponentTambahGrade = false
		},

		deleteGrade(id) {
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
					await axios.post(`${ipBackend}/grade-kompetensi/delete`, { id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllGrade();
					iziToast.success({
						title: 'Success',
						message: 'Data grade / kompetensi berhasil dihapus',
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

		toggleComponentEditGrade(id, namaGradeKompetensi) {
			this.showComponentEditGrade = !this.showComponentEditGrade;
			this.itemGrade.id = id
			this.itemGrade.namaGradeKompetensi = namaGradeKompetensi
		},

		tutupFormEditGrade() {
			this.showComponentEditGrade = false
		},

		async updateGrade() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/grade-kompetensi/update`, this.itemGrade, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data grade / kompetensi berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllGrade();
				this.itemGrade.namaGradeKompetensi = null
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditGrade = false
				
			} catch (error) {
				console.log(error);
			}
		},

	},
};
</script>