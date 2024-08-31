<template>
    <div>
        <form>
			<div class="row mt-2">
				<div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 d-sm-block mb-1">
					<button type="button" class="btn btn-info btn-block" @click="toggleComponentTambahType">
						<i class="fas fa-solid fa-plus-circle"></i>
						Tambah Data Type
					</button>
				</div>
			</div>
		
			<div v-if="showComponentTambahType">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaType" class="col-form-label">Nama Type<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaType" v-model="itemType.namaType" :class="{'is-invalid': validationStatus($v.itemType.namaType)}" />
						<div v-if="!$v.itemType.namaType.required"
							class="invalid-feedback">
							Nama Type harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="saveType">
							<i class="fas fa-save"></i>
							Simpan
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormType">
							<i class="fas fa-undo"></i>
							Tutup
						</button>
					</div>
				</div>
			</div>
			<div v-if="showComponentEditType">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaType" class="col-form-label">Nama Type<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaType" v-model="itemType.namaType" :class="{'is-invalid': validationStatus($v.itemType.namaType)}" />
						<div v-if="!$v.itemType.namaType.required"
							class="invalid-feedback">
							Nama Type harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="updateType">
							<i class="fas fa-save"></i>
							Update
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormEditType">
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
						<th class="align-middle" scope="col" style="width: 80%;">Nama Type</th>
						<th class="align-middle" scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="dt in dataType" :key="dt.id">
						<td>{{ dt.no }}</td>
						<td>{{ dt.namaType }}</td>
						<td>
							<div @click="toggleComponentEditType(dt.id, dt.namaType)" class="action-icon mr-2">
								<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
							</div>
							<div @click="deleteType(dt.id)" class="action-icon">
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
	name: "TambahType",
	data() {
		return {
			showComponentTambahType: false,
			showComponentEditType: false,

			itemType: {
                namaType: '',
                id: '',
			},

			dataType: [],
		};
	},

	validations: {
		itemType: {
			namaType: { required },
		}, 
	},

	mounted() {
		this.getAllType();
	},

	created() {
		this.getAllType();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async saveType() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					return;
				}

				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/type`, this.itemType, {
					headers: {
						token: dataToken
					}
				});
                
                if (response.data.message == "sukses") {
                    iziToast.success({
                        title: 'Success',
                        message: 'Data Type berhasil disimpan',
                        position: 'topRight', 
                        timeout: 2000 
                    });
                    await this.getAllType();
                    this.itemType.namaType = null
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

		async getAllType() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/type`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataType = result
			} catch (error) {
				console.log(error);
			}
		},

		toggleComponentTambahType() {
			this.showComponentTambahType = !this.showComponentTambahType;
		},

		tutupFormType() {
			this.showComponentTambahType = false
		},

		deleteType(id) {
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
					await axios.post(`${ipBackend}/type/delete`, { id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllType();
					iziToast.success({
						title: 'Success',
						message: 'Data Type berhasil dihapus',
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

		toggleComponentEditType(id, namaType) {
			this.showComponentEditType = !this.showComponentEditType;
			this.itemType.id = id
			this.itemType.namaType = namaType
		},

		tutupFormEditType() {
			this.showComponentEditType = false
		},

		async updateType() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/type/update`, this.itemType, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data Type berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllType();
				this.itemType.namaType = null
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditType = false
				
			} catch (error) {
				console.log(error);
			}
		},

	},
};
</script>