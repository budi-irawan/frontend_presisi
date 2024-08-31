<template>
    <div>
        <form>
			<div class="row mt-2">
				<div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 d-sm-block mb-1">
					<button type="button" class="btn btn-info btn-block" @click="toggleComponentTambahProyek">
						<i class="fas fa-solid fa-plus-circle"></i>
						Tambah Data Proyek
					</button>
				</div>
			</div>
		
			<div v-if="showComponentTambahProyek">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaProyek" class="col-form-label">Nama Proyek<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaProyek" v-model="itemProyek.namaProyek" :class="{'is-invalid': validationStatus($v.itemProyek.namaProyek)}" />
						<div v-if="!$v.itemProyek.namaProyek.required"
							class="invalid-feedback">
							Nama Proyek harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="saveProyek">
							<i class="fas fa-save"></i>
							Simpan
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormProyek">
							<i class="fas fa-undo"></i>
							Tutup
						</button>
					</div>
				</div>
			</div>
			<div v-if="showComponentEditProyek">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaProyek" class="col-form-label">Nama Proyek<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaProyek" v-model="itemProyek.namaProyek" :class="{'is-invalid': validationStatus($v.itemProyek.namaProyek)}" />
						<div v-if="!$v.itemProyek.namaProyek.required"
							class="invalid-feedback">
							Nama Proyek harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="updateProyek">
							<i class="fas fa-save"></i>
							Update
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormEditProyek">
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
						<th class="align-middle" scope="col" style="width: 80%;">Nama Proyek</th>
						<th class="align-middle" scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="dl in dataProyek" :key="dl.id">
						<td>{{ dl.no }}</td>
						<td>{{ dl.namaProyek }}</td>
						<td>
							<div @click="toggleComponentEditProyek(dl.id, dl.namaProyek)" class="action-icon mr-2">
								<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
							</div>
							<div @click="deleteProyek(dl.id)" class="action-icon">
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
	name: "TambahProyek",
	data() {
		return {
			showComponentTambahProyek: false,
			showComponentEditProyek: false,

			itemProyek: {
                namaProyek: '',
                id: '',
			},

			dataProyek: [],
		};
	},

	validations: {
		itemProyek: {
			namaProyek: { required },
		}, 
	},

	mounted() {
		this.getAllProyek();
	},

	created() {
		this.getAllProyek();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async saveProyek() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					return;
				}

				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/proyek`, this.itemProyek, {
					headers: {
						token: dataToken
					}
				});
                
                if (response.data.message == "sukses") {
                    iziToast.success({
                        title: 'Success',
                        message: 'Data Proyek berhasil disimpan',
                        position: 'topRight', 
                        timeout: 2000 
                    });
                    await this.getAllProyek();
                    this.itemProyek.namaProyek = null
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

		async getAllProyek() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/proyek`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataProyek = result
			} catch (error) {
				console.log(error);
			}
		},

		toggleComponentTambahProyek() {
			this.showComponentTambahProyek = !this.showComponentTambahProyek;
		},

		tutupFormProyek() {
			this.showComponentTambahProyek = false
		},

		deleteProyek(id) {
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
					await axios.post(`${ipBackend}/proyek/delete`, { id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllProyek();
					iziToast.success({
						title: 'Success',
						message: 'Data Proyek berhasil dihapus',
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

		toggleComponentEditProyek(id, namaProyek) {
			this.showComponentEditProyek = !this.showComponentEditProyek;
			this.itemProyek.id = id
			this.itemProyek.namaProyek = namaProyek
		},

		tutupFormEditProyek() {
			this.showComponentEditProyek = false
		},

		async updateProyek() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/proyek/update`, this.itemProyek, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data Proyek berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllProyek();
				this.itemProyek.namaProyek = null
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditProyek = false
				
			} catch (error) {
				console.log(error);
			}
		},

	},
};
</script>