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
                                        <h5>Tambah Data Divisi</h5>
                                    </div>
                                    <div class="col"></div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <form @submit.prevent="saveDivisi">
                                                <div class="row mb-3">
                                                    <label for="nama_divisi" class="col-sm-3 col-form-label">Nama
                                                        Divisi<span class="text-danger"> *</span></label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="namaDivisi"
                                                            v-model.trim="$v.namaDivisi.$model" :class="{
                                                                'is-invalid': validationStatus($v.namaDivisi),
                                                            }" />
                                                        <div v-if="!$v.namaDivisi.required" class="invalid-feedback">
                                                            Nama divisi harus diisi
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
    name: "FormTambahDivisiView",
    data() {
        return {
            namaDivisi: "",
        };
    },

    validations: {
        namaDivisi: { required },
    },

    methods: {
        validationStatus: function (validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },

        async saveDivisi() {
            try {
                this.$v.$touch();
                if (this.$v.$pendding || this.$v.$error) return;

                let dataToken = localStorage.getItem('token')
                await axios.post(`${ipBackend}/divisi/create`, {
                    namaDivisi: this.namaDivisi, 
                }, {
                    headers : {
                        token: dataToken
                    }
                });
                this.namaDivisi = "";

                this.$swal({
                    icon: "success",
                    title: "Sukses",
                    text: "Data divisi berhasil disimpan",
                    showConfirmButton: false,
                    timer: 3000,
                });
                this.$router.push("/divisi");
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