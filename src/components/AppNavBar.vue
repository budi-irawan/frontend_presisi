<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light shadow-sm">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>

    <!-- Right navbar links -->
    

    <ul class="navbar-nav ml-auto">
			<li class="nav-item">
				<a href="javascript:void(0)" class="nav-link">{{
					item_user.username
				}}</a>
			</li>
			<li class="nav-item">
				<a href="javascript:void(0)" class="nav-link" @click="logout">Logout</a>
			</li>
		</ul>
  </nav>
</template>

<script>
import Swal from 'sweetalert2'
import { ipBackend } from '@/ipBackend';
export default {
  name: "AppNavBar",

  data() {
    return {
      item_user: {},
    };
  },

  mounted() {
		let user = localStorage.getItem("token");
		if (!user) {
			this.$router.push("/");
		}
		this.getUser();
	},

  computed: {},

  methods: {
    async getUser() {
			let data_token = localStorage.getItem("token");
			try {
				const data_user = await this.$axios.get(
					`${ipBackend}/user/profil`,
					{
						headers: {
							token: data_token,
						},
					}
				);
				let dd = data_user.data.data;
				this.item_user = dd[0];
			} catch (error) {
				console.log(error);
			}
		},

		async logout() {
			try {
				Swal.fire({
					title: "Konfirmasi",
					text: "Apakah anda yakin akan keluar dari aplikasi ?",
					icon: "question",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Ya, keluar!",
				}).then(async (hasil) => {
					if (hasil.isConfirmed == true) {
						localStorage.clear();
						this.$router.push("/");
					}
				});
			} catch (error) {
				console.log(error);
			}
		},
  },
};
</script>

<style lang="scss"></style>