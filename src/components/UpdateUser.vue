<template>
    <div>
		<form>
			<div>
				<div class="row mt-3 mb-3">
					<div class="col">
						<div class="row mb-3">
							<div class="col-md-2">
								<label for="username" class="col-form-label">Username<span class="text-danger"> *</span></label>
							</div>
							<div class="col-md-5">
								<input type="text" class="form-control" id="username" v-model="itemUser.username" :class="{'is-invalid': validationStatus($v.itemUser.username)}" />
								<div v-if="!$v.itemUser.username.required"
									class="invalid-feedback">
									Username harus diisi
								</div>
							</div>
						</div>
						<div class="row mb-3">
							<div class="col-md-2">
								<label for="password" class="col-form-label">Password<span class="text-danger"> *</span></label>
							</div>
							<div class="col-md-5">
								<input type="text" class="form-control" id="password" v-model="itemUser.password" :class="{'is-invalid': validationStatus($v.itemUser.password)}" />
								<div v-if="!$v.itemUser.password.required"
									class="invalid-feedback">
									Password harus diisi
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<button type="button" class="btn btn-primary mr-2" @click="updateUser">
									<i class="fas fa-save"></i>
									Update
								</button>
								<button type="button" class="btn btn-secondary" @click="tutupFormTambah">
									<i class="fas fa-undo"></i>
									Tutup
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import { ipBackend } from '@/ipBackend';
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import 'izitoast/dist/css/iziToast.css';
import iziToast from 'izitoast';

export default {
	name: "UpdateUser",
	data() {
        return {
			itemUser: {
				username: '',
				password: '',
				id: ''
			},
		};
	},

	validations: {
		itemUser: {
			username: { required },
			password: { required },
		}, 
	},

	mounted() {
		
	},

	created() {
		
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
        },

        tutupFormTambah() {
			this.showFormTambah = false
		},

		async updateUser() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					return;
				}
				
				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/user/update`, this.itemUser, {
					headers: {
						token: dataToken
					}
				});

				if (response.data.message == "sukses") {
					iziToast.success({
						title: 'Success',
						message: 'Data user berhasil disimpan',
						position: 'topRight', 
						timeout: 2000 
					});
				} else {
					iziToast.info({
						title: 'Informasi',
						message: response.data.message,
						position: 'topCenter', 
						timeout: 3000 
					});
                }

                await this.getAllUser();
                
				this.itemUser.username = ''
				this.itemUser.password = ''
				
				this.$nextTick(() => { this.$v.$reset() })
				
			} catch (error) {
				console.log(error);
			}
        },

        async getAllUser() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/user/list`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataUser = result
			} catch (error) {
				console.log(error);
			}
		},

	},
};
</script>