<template>
    <div>
        <form>
			<div class="row mt-2">
				<div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 d-sm-block mb-1">
					<button type="button" class="btn btn-info btn-block" @click="toggleComponentTambahJenisAlat">
						<i class="fas fa-solid fa-plus-circle"></i>
						Tambah Data Jenis Alat
					</button>
				</div>
			</div>
		
			<div v-if="showComponentTambahJenisAlat">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaJenisAlat" class="col-form-label">Nama Jenis Alat<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaJenisAlat" v-model="itemJenisAlat.namaJenisAlat" :class="{'is-invalid': validationStatus($v.itemJenisAlat.namaJenisAlat)}" />
						<div v-if="!$v.itemJenisAlat.namaJenisAlat.required"
							class="invalid-feedback">
							Nama Jenis Alat harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="saveJenisAlat">
							<i class="fas fa-save"></i>
							Simpan
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormJenisAlat">
							<i class="fas fa-undo"></i>
							Tutup
						</button>
					</div>
				</div>
			</div>
			<div v-if="showComponentEditJenisAlat">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaJenisAlat" class="col-form-label">Nama Jenis Alat<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaJenisAlat" v-model="itemJenisAlat.namaJenisAlat" :class="{'is-invalid': validationStatus($v.itemJenisAlat.namaJenisAlat)}" />
						<div v-if="!$v.itemJenisAlat.namaJenisAlat.required"
							class="invalid-feedback">
							Nama Jenis Alat harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="updateJenisAlat">
							<i class="fas fa-save"></i>
							Update
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormEditJenisAlat">
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
						<th class="align-middle" scope="col" style="width: 80%;">Nama Jenis Alat</th>
						<th class="align-middle" scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="dja in dataJenisAlat" :key="dja.id">
						<td>{{ dja.no }}</td>
						<td>{{ dja.namaJenisAlat }}</td>
						<td>
							<div @click="toggleComponentEditJenisAlat(dja.id, dja.namaJenisAlat)" class="action-icon mr-2">
								<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
							</div>
							<div @click="deleteJenisAlat(dja.id)" class="action-icon">
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
	name: "TambahJenisAlat",
	data() {
		return {
			showComponentTambahJenisAlat: false,
			showComponentEditJenisAlat: false,

			itemJenisAlat: {
                namaJenisAlat: '',
                id: '',
			},

			dataJenisAlat: [],
		};
	},

	validations: {
		itemJenisAlat: {
			namaJenisAlat: { required },
		}, 
	},

	mounted() {
		this.getAllJenisAlat();
	},

	created() {
		this.getAllJenisAlat();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async saveJenisAlat() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					return;
				}

				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/jenis-alat/create`, this.itemJenisAlat, {
					headers: {
						token: dataToken
					}
				});

				if (response.data.message == "sukses") {
					iziToast.success({
						title: 'Success',
						message: 'Data Jenis Alat berhasil disimpan',
						position: 'topRight', 
						timeout: 2000 
					});
					await this.getAllJenisAlat();
					this.itemJenisAlat.namaJenisAlat = null
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

		async getAllJenisAlat() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/jenis-alat/list`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataJenisAlat = result
			} catch (error) {
				console.log(error);
			}
		},

		toggleComponentTambahJenisAlat() {
			this.showComponentTambahJenisAlat = !this.showComponentTambahJenisAlat;
		},

		tutupFormJenisAlat() {
			this.showComponentTambahJenisAlat = false
		},

		deleteJenisAlat(id) {
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
					await axios.post(`${ipBackend}/jenis-alat/delete`, { id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllJenisAlat();
					iziToast.success({
						title: 'Success',
						message: 'Data Jenis Alat berhasil dihapus',
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

		toggleComponentEditJenisAlat(id, namaJenisAlat) {
			this.showComponentEditJenisAlat = !this.showComponentEditJenisAlat;
			this.itemJenisAlat.id = id
			this.itemJenisAlat.namaJenisAlat = namaJenisAlat
		},

		tutupFormEditJenisAlat() {
			this.showComponentEditJenisAlat = false
		},

		async updateJenisAlat() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/jenis-alat/update`, this.itemJenisAlat, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data Jenis Alat berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllJenisAlat();
				this.itemJenisAlat.namaJenisAlat = null
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditJenisAlat = false
				
			} catch (error) {
				console.log(error);
			}
		},

	},
};
</script>