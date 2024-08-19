<template>
    <div>
        <form>
			<div class="row mt-2">
				<div class="col">
					<button type="button" class="btn btn-info" @click="toggleComponentTambahLokasi">
						<i class="fas fa-solid fa-plus-circle"></i>
						Tambah Data Lokasi
					</button>
				</div>
			</div>
		
			<div v-if="showComponentTambahLokasi">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaLokasi" class="col-form-label">Nama Lokasi<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaLokasi" v-model="itemLokasi.namaLokasi" :class="{'is-invalid': validationStatus($v.itemLokasi.namaLokasi)}" />
						<div v-if="!$v.itemLokasi.namaLokasi.required"
							class="invalid-feedback">
							Nama Lokasi harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="saveLokasi">
							<i class="fas fa-save"></i>
							Simpan
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormLokasi">
							<i class="fas fa-undo"></i>
							Tutup
						</button>
					</div>
				</div>
			</div>
			<div v-if="showComponentEditLokasi">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaLokasi" class="col-form-label">Nama Lokasi<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaLokasi" v-model="itemLokasi.namaLokasi" :class="{'is-invalid': validationStatus($v.itemLokasi.namaLokasi)}" />
						<div v-if="!$v.itemLokasi.namaLokasi.required"
							class="invalid-feedback">
							Nama Lokasi harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="updateLokasi">
							<i class="fas fa-save"></i>
							Update
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormEditLokasi">
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
						<th class="align-middle" scope="col" style="width: 80%;">Nama Lokasi</th>
						<th class="align-middle" scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="dl in dataLokasi" :key="dl.id">
						<td>{{ dl.no }}</td>
						<td>{{ dl.namaLokasi }}</td>
						<td>
							<div @click="toggleComponentEditLokasi(dl.id, dl.namaLokasi)" class="action-icon mr-2">
								<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
							</div>
							<div @click="deleteLokasi(dl.id)" class="action-icon">
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
	name: "TambahLokasi",
	data() {
		return {
			showComponentTambahLokasi: false,
			showComponentEditLokasi: false,

			itemLokasi: {
                namaLokasi: '',
                id: '',
			},

			dataLokasi: [],
		};
	},

	validations: {
		itemLokasi: {
			namaLokasi: { required },
		}, 
	},

	mounted() {
		this.getAllLokasi();
	},

	created() {
		this.getAllLokasi();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async saveLokasi() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					return;
				}

				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/lokasi`, this.itemLokasi, {
					headers: {
						token: dataToken
					}
				});
                
                if (response.data.message == "sukses") {
                    iziToast.success({
                        title: 'Success',
                        message: 'Data Lokasi berhasil disimpan',
                        position: 'topRight', 
                        timeout: 2000 
                    });
                    await this.getAllLokasi();
                    this.itemLokasi.namaLokasi = null
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

		async getAllLokasi() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/lokasi`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataLokasi = result
			} catch (error) {
				console.log(error);
			}
		},

		toggleComponentTambahLokasi() {
			this.showComponentTambahLokasi = !this.showComponentTambahLokasi;
		},

		tutupFormLokasi() {
			this.showComponentTambahLokasi = false
		},

		deleteLokasi(id) {
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
					await axios.post(`${ipBackend}/lokasi/delete`, { id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllLokasi();
					iziToast.success({
						title: 'Success',
						message: 'Data Lokasi berhasil dihapus',
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

		toggleComponentEditLokasi(id, namaLokasi) {
			this.showComponentEditLokasi = !this.showComponentEditLokasi;
			this.itemLokasi.id = id
			this.itemLokasi.namaLokasi = namaLokasi
		},

		tutupFormEditLokasi() {
			this.showComponentEditLokasi = false
		},

		async updateLokasi() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/lokasi/update`, this.itemLokasi, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data Lokasi berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllLokasi();
				this.itemLokasi.namaLokasi = null
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditLokasi = false
				
			} catch (error) {
				console.log(error);
			}
		},

	},
};
</script>