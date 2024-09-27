<template>
    <div>
        <form>
			<!-- <div class="row mt-2">
				<div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 d-sm-block mb-1">
					<button type="button" class="btn btn-info btn-block" @click="toggleComponentTambahPart">
						<i class="fas fa-solid fa-plus-circle"></i>
						Tambah Data Part
					</button>
				</div>
			</div> -->
		
			<div v-if="showComponentTambahPart">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaPart" class="col-form-label">Nama Part<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaPart" v-model="itemPart.namaPart" :class="{'is-invalid': validationStatus($v.itemPart.namaPart)}" />
						<div v-if="!$v.itemPart.namaPart.required"
							class="invalid-feedback">
							Nama Part harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="savePart">
							<i class="fas fa-save"></i>
							Simpan
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormPart">
							<i class="fas fa-undo"></i>
							Tutup
						</button>
					</div>
				</div>
			</div>
			<div v-if="showComponentEditPart">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaPart" class="col-form-label">Nama Part<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaPart" v-model="itemPart.namaPart" :class="{'is-invalid': validationStatus($v.itemPart.namaPart)}" />
						<div v-if="!$v.itemPart.namaPart.required"
							class="invalid-feedback">
							Nama Part harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="updatePart">
							<i class="fas fa-save"></i>
							Update
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormEditPart">
							<i class="fas fa-undo"></i>
							Batal
						</button>
					</div>
				</div>
			</div>
		</form>
		<div class="table table-responsive" v-if="!isloading">
			<table class="table table-striped table-hover table-bordered">
				<thead>
					<tr>
						<th class="align-middle" scope="col">No</th>
						<th class="align-middle" scope="col">Unit</th>
						<th class="align-middle" scope="col">Manufacturer</th>
						<th class="align-middle" scope="col">Nama Part</th>
						<th class="align-middle" scope="col">Part Number</th>
						<th class="align-middle" scope="col">Kode Material Baru</th>
						<th class="align-middle" scope="col">Nama Kode Material</th>
						<!-- <th class="align-middle" scope="col"></th> -->
					</tr>
				</thead>
				<tbody>
					<tr v-for="(dl, index) in dataPart" :key="dl.partNumberId">
						<td>{{ (page - 1) * limit + index + 1}}</td>
						<td>{{ dl.namaJenisAlat }}</td>
						<td>{{ dl.namaMerk }}</td>
						<td>{{ dl.namaPartName }}</td>
						<td>{{ dl.nomorPartNumber }}</td>
						<td>{{ dl.kodeMaterialBaru }}</td>
						<td>{{ dl.namaKodeMaterial }}</td>
						<!-- <td>
							<div @click="toggleComponentEditPart(dl.id, dl.namaPart)" class="action-icon mr-2">
								<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
							</div>
							<div @click="deletePart(dl.id)" class="action-icon">
								<i class="fas fa-trash" style="color: red"></i>
							</div>
						</td> -->
					</tr>
				</tbody>
			</table>
		</div>

		<div v-else class="row muser">
			<div class="col text-center">
				<img :src="loadingGif" />
			</div>
		</div>

		<div class="row p-2 ml-2">
			<label for="agama" class="col-sm-3 col-form-label font-weight-normal">Jumlah item per halaman</label>
			<div class="col-sm-1">
				<select class="form-control select2" @change="handleLimit($event)">
					<option>Pilih</option>
					<option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
				</select>
			</div>
		</div>
        <div class="row p-2">
            <div class="col">
				<ul class="pagination pagination-sm m-0 float-right">
					<li class="page-item"><button @click="changePages(page - 1)" :disabled="page <= 1" class="page-link btn-primary">Sebelumnya</button></li>
					<li class="page-item"><button v-for="n in totalPages" :key="n" @click="changePages(n)" :class=" 'page-link btn-primary' ">{{ n }}</button></li>
					<li class="page-item"><button @click="changePages(page + 1)" :disabled="page >= totalPages" class="page-link btn-primary">Selanjutnya</button></li>
				</ul>
			</div>
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
	name: "TambahPartName",
	data() {
		return {
			showComponentTambahPart: false,
			showComponentEditPart: false,

			itemPart: {
                namaPart: '',
                id: '',
			},

			dataPart: [],
			path: ipBackend,
            page: 1,
			limit: 50,
			totalPages: 1,
			isloading: true,
			loadingGif: require('@/assets/rolling.gif'),
		};
	},

	validations: {
		itemPart: {
			namaPart: { required },
		}, 
	},

	mounted() {
		// this.getAllPart();
	},

	created() {
		this.getAllPart();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async savePart() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					return;
				}

				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/part-name`, this.itemPart, {
					headers: {
						token: dataToken
					}
				});
                
                if (response.data.message == "sukses") {
                    iziToast.success({
                        title: 'Success',
                        message: 'Data Part berhasil disimpan',
                        position: 'topRight', 
                        timeout: 2000 
                    });
                    await this.getAllPart();
                    this.itemPart.namaPart = null
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

		async getAllPart() {
            this.isloading = true;
			let dataToken = localStorage.getItem('token')
			try {
                let timestamp = new Date().getTime()
				const response = await axios.get(
					`${ipBackend}/part-name`, {
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
				this.dataPart = result
				this.totalPages = response.data.totalPages;
				this.isloading = false;
			} catch (error) {
				console.log(error);
			} finally {
				this.isloading = false;
			}
		},

		changePages(newPage) {
			if (newPage >=1 && newPage <= this.totalPages) {
				this.page = newPage
				this.getAllPart();
			}
		},

		handleLimit(event) {
			this.limit = parseInt(event.target.value)
			
			this.getAllPart();
		},

		toggleComponentTambahPart() {
			this.showComponentTambahPart = !this.showComponentTambahPart;
		},

		tutupFormPart() {
			this.showComponentTambahPart = false
		},

		deletePart(id) {
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
					await axios.post(`${ipBackend}/part-name/delete`, { id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllPart();
					iziToast.success({
						title: 'Success',
						message: 'Data Part berhasil dihapus',
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

		toggleComponentEditPart(id, namaPart) {
			this.showComponentEditPart = !this.showComponentEditPart;
			this.itemPart.id = id
			this.itemPart.namaPart = namaPart
		},

		tutupFormEditPart() {
			this.showComponentEditPart = false
		},

		async updatePart() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/part-name/update`, this.itemPart, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data Part berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllPart();
				this.itemPart.namaPart = null
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditPart = false
				
			} catch (error) {
				console.log(error);
			}
		},

	},
};
</script>