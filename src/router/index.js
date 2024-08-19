import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios"
import { ipBackend } from "@/ipBackend"

import DashboardView from '@/views/DashboardView.vue'
import ListUserView from '@/views/user/ListUserView.vue'
import LoginUserView from '@/views/user/LoginUserView.vue'
import FormTambahUserView from '@/views/user/FormTambahUserView.vue'
import FormTambahUserMekanik from '@/views/user/FormTambahUserMekanik.vue'
import FormTambahUserFuelman from '@/views/user/FormTambahUserFuelman.vue'
import ListDivisiView from '@/views/divisi/ListDivisiView.vue'
import FormTambahDivisiView from '@/views/divisi/FormTambahDivisiView.vue'
import FormEditDivisiView from '@/views/divisi/FormEditDivisiView.vue'
import ListKomponenView from '@/views/komponen/ListKomponenView.vue'
import FormTambahKomponenView from '@/views/komponen/FormTambahKomponenView.vue'
import FormEditKomponenView from '@/views/komponen/FormEditKomponenView.vue'
import ListPelumasView from '@/views/pelumas/ListPelumasView.vue'
import FormTambahJenisPelumasView from '@/views/pelumas/FormTambahJenisPelumasView.vue'
import FormTambahPelumasView from '@/views/pelumas/FormTambahPelumasView.vue'
import ListJabatanView from '@/views/jabatan/ListJabatanView.vue'
import FormTambahJabatanView from '@/views/jabatan/FormTambahJabatanView.vue'
import FormEditJabatanView from '@/views/jabatan/FormEditJabatanView.vue'
import ListKaryawanView from '@/views/karyawan/ListKaryawanView.vue'
import FormTambahKaryawanView from '@/views/karyawan/FormTambahKaryawanView.vue'
import FormEditKaryawanView from '@/views/karyawan/FormEditKaryawanView.vue'
import ListFuelmanView from '@/views/fuelman/ListFuelmanView.vue'
import FormTambahFuelmanView from '@/views/fuelman/FormTambahFuelmanView.vue'
import FormEditFuelmanView from '@/views/fuelman/FormEditFuelmanView.vue'
import ListJenisAlatView from '@/views/jenisAlat/ListJenisAlatView.vue'
import FormTambahJenisAlatView from '@/views/jenisAlat/FormTambahJenisAlatView.vue'
import FormEditJenisAlatView from '@/views/jenisAlat/FormEditJenisAlatView.vue'
import ListUnitView from '@/views/unit/ListUnitView.vue'
import FormTambahUnitView from '@/views/unit/FormTambahUnitView.vue'
import FormEditUnitView from '@/views/unit/FormEditUnitView.vue'
import DetailUnitView from '@/views/unit/DetailUnitView.vue'
import ListFuelRefillView from '@/views/fuelRefill/ListFuelRefillView.vue'
import ListEquipmentRepairView from '@/views/equipmentRepair/ListEquipmentRepairView.vue'
import DetailKaryawanView from '@/views/karyawan/DetailKaryawanView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'login',
		component: LoginUserView,
		meta: {
			requiresAuth: false
		}
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: DashboardView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/user',
		name: 'user',
		component: ListUserView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/user/tambah',
		name: 'tambah-user',
		component: FormTambahUserView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/user/tambah-user-mekanik',
		name: 'tambah-user-mekanik',
		component: FormTambahUserMekanik,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/user/tambah-user-fuelman',
		name: 'tambah-user-fuelman',
		component: FormTambahUserFuelman,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/divisi',
		name: 'divisi',
		component: ListDivisiView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/divisi/tambah',
		name: 'tambah-divisi',
		component: FormTambahDivisiView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/divisi/edit',
		name: 'edit-divisi',
		component: FormEditDivisiView,
		meta: {
			requiresAuth: true
		}
	},
	// {
	// 	path: '/komponen',
	// 	name: 'komponen',
	// 	component: ListKomponenView,
	// 	meta: {
	// 		requiresAuth: true
	// 	}
	// },
	{
		path: '/komponen/tambah',
		name: 'tambah-komponen',
		component: FormTambahKomponenView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/komponen/edit',
		name: 'edit-komponen',
		component: FormEditKomponenView,
		meta: {
			requiresAuth: true
		}
	},
	// {
	// 	path: '/pelumas',
	// 	name: 'pelumas',
	// 	component: ListPelumasView,
	// 	meta: {
	// 		requiresAuth: true
	// 	}
	// },
	{
		path: '/pelumas/jenis-pelumas/tambah',
		name: 'tambah-jenis-pelumas',
		component: FormTambahJenisPelumasView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/pelumas/tambah',
		name: 'tambah-pelumas',
		component: FormTambahPelumasView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/jabatan',
		name: 'jabatan',
		component: ListJabatanView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/jabatan/tambah',
		name: 'tambah-jabatan',
		component: FormTambahJabatanView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/jabatan/edit',
		name: 'edit-jabatan',
		component: FormEditJabatanView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/manpower',
		name: 'manpower',
		component: ListKaryawanView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/manpower/tambah',
		name: 'tambah-manpower',
		component: FormTambahKaryawanView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/manpower/edit',
		name: 'edit-manpower',
		component: FormEditKaryawanView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/manpower/profil',
		name: 'profil',
		component: DetailKaryawanView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/fuelman',
		name: 'fuelman',
		component: ListFuelmanView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/fuelman/tambah',
		name: 'tambah-fuelman',
		component: FormTambahFuelmanView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/fuelman/edit',
		name: 'edit-fuelman',
		component: FormEditFuelmanView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/jenis-alat',
		name: 'jenis-alat',
		component: ListJenisAlatView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/jenis-alat/tambah',
		name: 'tambah-jenis-alat',
		component: FormTambahJenisAlatView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/jenis-alat/edit',
		name: 'edit-jenis-alat',
		component: FormEditJenisAlatView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/unit',
		name: 'unit',
		component: ListUnitView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/unit/tambah',
		name: 'tambah-unit',
		component: FormTambahUnitView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/unit/edit',
		name: 'edit-unit',
		component: FormEditUnitView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/unit/detail',
		name: 'detail-unit',
		component: DetailUnitView,
		meta: {
			requiresAuth: false
		}
	},
	{
		path: '/fuel-refill',
		name: 'fuel-refill',
		component: ListFuelRefillView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/equipment-repair',
		name: 'equipment-repair',
		component: ListEquipmentRepairView,
		meta: {
			requiresAuth: true
		}
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async function (to, from, next) {
	if (!to.meta.requiresAuth) {
		next()
	} else {
		let cekAuthentification = await axios.get(`${ipBackend}/user/cek-authentification`, {
			headers: {
				token: localStorage.getItem("token"),
			},
		});
		
		if (cekAuthentification.data.message == "anda belum login" && to.path != "/") {
			next({ path: "/" })
		} else if (cekAuthentification.data.message == "sukses" && to.path != "/dashboard") {
			next({})
		} else {
			next({})
		}
	}
})

export default router
