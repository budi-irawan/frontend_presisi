<template>
    <div>
        <app-nav-bar />
        <app-side-bar />
        <div class="content-wrapper">
            <router-view />
            <section class="content">
                <div class="container-fluid pt-3">
                    <div class="row mt-3 mb-4">
                        <div class="col">
                            <div class="card card-outline card-primary">
                                <div class="row">
                                    <div class="col"></div>
                                    <div class="col tab-judul">
                                        <h5>Tambah Data Jenis Alat</h5>
                                    </div>
                                    <div class="col"></div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <form @submit.prevent="saveJenisAlat">
                                                <div class="row mb-3">
                                                    <label for="namaJenisAlat" class="col-sm-3 col-form-label">Nama
                                                        Jenis Alat<span class="text-danger"> *</span></label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="namaJenisAlat"
                                                            v-model.trim="$v.namaJenisAlat.$model" :class="{
                                                                'is-invalid': validationStatus($v.namaJenisAlat),
                                                            }" />
                                                        <div v-if="!$v.namaJenisAlat.required" class="invalid-feedback">
                                                            Nama jenis alat harus diisi
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" class="btn btn-primary">
                                                    <i class="fas fa-save"></i>
                                                    Simpan
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <app-footer />
        <control-side-bar />
    </div>
</template>


<script>
import axios from "axios";
import { ipBackend } from '@/ipBackend';
import { required } from "vuelidate/lib/validators";

export default {
    name: "FormTambahJenisAlatView",
    data() {
        return {
            namaJenisAlat: "",
        };
    },

    validations: {
        namaJenisAlat: { required },
    },

    methods: {
        validationStatus: function (validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },

        async saveJenisAlat() {
            try {
                this.$v.$touch();
                if (this.$v.$pendding || this.$v.$error) return;

                let dataToken = localStorage.getItem('token')
                await axios.post(`${ipBackend}/jenis-alat/create`, {
                    namaJenisAlat: this.namaJenisAlat, 
                }, {
                    headers : {
                        token: dataToken
                    }
                });
                this.namaJenisAlat = "";

                this.$swal({
                    icon: "success",
                    title: "Sukses",
                    text: "Data jenis alat berhasil disimpan",
                    showConfirmButton: false,
                    timer: 3000,
                });
                this.$router.push("/jenis-alat");
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>


<style>
div.tab-judul {
    text-align: center;
    color: white;
    background-color: #0d6efd;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
</style>