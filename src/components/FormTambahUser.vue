<template>
	<div class="ml-3">
		<form>
            <div class="row mt-3">
                <div class="col">
                    <div class="row">
						<div class="custom-control custom-radio ml-2">
							<input class="custom-control-input" type="radio" id="customRadio1" name="customRadio1" value="manpower" v-model="selectedRole">
							<label for="customRadio1" class="custom-control-label">Manpower</label>
						</div>
						<div class="custom-control custom-radio ml-4">
							<input class="custom-control-input" type="radio" id="customRadio2" name="customRadio2" value="fuelman" v-model="selectedRole">
							<label for="customRadio2" class="custom-control-label">Fuelman</label>
						</div>
					</div>
                </div>
            </div>
            <div v-if="selectedRole == 'manpower'">
                <tambah-user-manpower />
            </div>
            <div v-if="selectedRole == 'fuelman'">
                <tambah-user-fuelman />
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
import TambahUserManpower from './TambahUserManpower.vue';
import TambahUserFuelman from './TambahUserFuelman.vue';
export default {
  components: { TambahUserManpower, TambahUserFuelman },
	name: "FormTambahUser",
	data() {
		return {
            showComponentTambahUser: false,
            selectedRole: '',
		};
	},

    mounted() {
        this.getAllUser();
	},

    created() {
        this.getAllUser();
	},

	methods: {
		toggleComponentTambahUser() {
			this.showComponentTambahUser = !this.showComponentTambahUser;
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


<style></style>